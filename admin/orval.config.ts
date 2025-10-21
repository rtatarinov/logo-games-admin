import { ESLint } from "eslint";
import { promises as fs } from "fs";
import { defineConfig } from "orval";
import * as path from "path";
import * as prettier from "prettier";
import * as ts from "typescript";
import { removeDescriptions } from "./orval.transformer";

export const transform = (
    ast: ts.SourceFile,
    transformers: ts.TransformerFactory<ts.SourceFile>[],
) => ts.transform(ast, transformers).transformed[0];
export const mapStringToAst = (str: string): ts.SourceFile =>
    ts.createSourceFile("x.ts", str, ts.ScriptTarget.Latest);
export const mapAstToString = (ast: ts.SourceFile): string => ts.createPrinter().printFile(ast);

// removes redundant type aliases from the result file, which led to duplicated code
const removeDuplicatedAliases: ts.TransformerFactory<ts.SourceFile> = (
    context: ts.TransformationContext,
): ts.Transformer<ts.SourceFile> => {
    return (ast: ts.SourceFile): ts.SourceFile => {
        const blacklist = /^(N[0-9]+|Default|Schema)$/;

        return ts.visitEachChild(
            ast,
            (node: ts.Node): ts.Node => {
                if (!ts.isTypeAliasDeclaration(node) || !blacklist.test(node.name.text)) {
                    return node;
                }

                return undefined;
            },
            context,
        );
    };
};

const targetDir = path.join(__dirname, "./src/shared/api/generated");

const writeAndFormatFile = async (
    path: string,
    content: string,
    prettierConfig: prettier.Options,
): Promise<void> => {
    const formatted = await prettier.format(content, prettierConfig);
    await fs.writeFile(path, formatted);

    const eslint = new ESLint({ fix: true });
    await ESLint.outputFixes(await eslint.lintFiles(path));
};

const resolvePrettierConfig = async (path: string): Promise<prettier.Options> => {
    let conf: prettier.Options | null = null;
    try {
        conf = await prettier.resolveConfig(path);
    } catch (e: unknown) {
        // eslint-disable-next-line no-console
        console.error("Failed to load prettier config", e);
    }

    if (conf === null) {
        conf = {};
    }

    conf.parser = "typescript";

    return conf;
};

function singleArg(context) {
    return function visitor(node) {
        return ts.visitEachChild(
            node,
            (child) => {
                if (!ts.isVariableStatement(child)) {
                    return child;
                }

                const [declaration] = child.declarationList.declarations;
                const initializer = declaration.initializer;

                if (!ts.isArrowFunction(initializer) || initializer.parameters.length <= 1) {
                    return child;
                }

                const parameters = initializer.parameters;
                const bindingElements = parameters.map((param) =>
                    ts.factory.createBindingElement(undefined, undefined, param.name),
                );

                const parameterDeclarations = parameters.map((param) =>
                    ts.factory.createParameterDeclaration(
                        param.modifiers,
                        undefined,
                        param.name,
                        param.questionToken,
                        param.type,
                        undefined,
                    ),
                );

                const hasOptionalParameters = parameters.every((param) => !!param.questionToken);

                return ts.factory.createVariableStatement(
                    child.modifiers,
                    ts.factory.createVariableDeclarationList(
                        [
                            ts.factory.createVariableDeclaration(
                                declaration.name,
                                undefined,
                                undefined,
                                ts.factory.createArrowFunction(
                                    ts.canHaveModifiers(initializer)
                                        ? ts.getModifiers(initializer)
                                        : undefined,
                                    undefined,
                                    [
                                        ts.factory.createParameterDeclaration(
                                            undefined,
                                            undefined,
                                            ts.factory.createObjectBindingPattern(bindingElements),
                                            undefined,
                                            ts.factory.createTypeLiteralNode(parameterDeclarations),
                                            hasOptionalParameters
                                                ? ts.factory.createObjectLiteralExpression()
                                                : undefined,
                                        ),
                                    ],
                                    undefined,
                                    undefined,
                                    initializer.body,
                                ),
                            ),
                        ],
                        ts.NodeFlags.Const,
                    ),
                );
            },
            context,
        );
    };
}

function processFiles(state: State): (paths: string[]) => Promise<void> {
    return async (paths: string[]): Promise<void> => {
        const prettierConfig = await resolvePrettierConfig(".prettierrc");

        await Promise.all(
            paths.map(
                (path: string): Promise<void> =>
                    fs
                        .readFile(path)
                        .then(String)
                        .then((content: string): string =>
                            mapAstToString(
                                transform(mapStringToAst(content), [
                                    removeDuplicatedAliases,
                                    singleArg,
                                ]),
                            ),
                        )
                        .then(async (content: string): Promise<void> => {
                            await writeAndFormatFile(path, content, prettierConfig);
                        })
                        .then((): void => {
                            state.paths.push(path);
                        })
                        .catch((err: unknown): Promise<void> => {
                            if (err !== undefined && err.code === "ENOENT") {
                                return Promise.resolve();
                            }

                            return Promise.reject(err);
                        }),
            ),
        );
    };
}

const indexHeader = `/**
 * Generated by orval hook. DO NOT EDIT.
*/
`;

function emitIndex(state: State): (paths: string[]) => Promise<void> {
    return async (): Promise<void> => {
        const prettierConfig = await resolvePrettierConfig(".prettierrc");

        const exports = state.paths
            .filter((p: string, i: number, paths: string[]): boolean => paths.indexOf(p, i + 1) < 0)
            .map((p: string): string => path.relative(targetDir, p))
            .map((p: string): string => (p.startsWith(`..${path.sep}`) ? p : `.${path.sep}${p}`))
            .filter((p: string): boolean => path.extname(p) === ".ts")
            .map((p: string): string => p.substring(0, p.length - 3))
            .map((p: string): string => `export * from ${JSON.stringify(p)}`)
            .sort();

        if (exports.length === 0) {
            return;
        }

        await writeAndFormatFile(
            path.join(targetDir, "index.ts"),
            indexHeader + exports.join("\n"),
            prettierConfig,
        );
    };
}

type State = {
    paths: string[];
};

const state: State = { paths: [] };


export default defineConfig({
    client: {
        hooks: { afterAllFilesWrite: [processFiles(state), emitIndex(state)] },
        input: { target: "./docs/openapi.json" },
        output: {
            mode: "tags",
            override: {
                mutator: {
                    name: "httpClient",
                    path: "./src/shared/api/http-client/http-client.ts",
                },
            },
            target: `${targetDir}/api/`,
        },
    },
    schemas: {
        hooks: { afterAllFilesWrite: [processFiles(state), emitIndex(state)] },
        input: {
            target: "./docs/openapi.json",
            override: {
                transformer: removeDescriptions
            }
        },
        output: {
            client: "zod",
            mode: "tags",
            target: `${targetDir}/schemas/`,
            override: {
                zod: {
                    generate: {
                        param: false,
                        query: false,
                        header: false,
                        body: false,
                        response: true,
                    },
                },
            }
        },
    },
});
