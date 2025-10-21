import fs from "fs";
import { type ServerOptions as HttpsServerOptions } from "node:https";
import { constants as zconst } from "node:zlib";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "tailwindcss";
import type { IndexHtmlTransformResult, PluginOption } from "vite";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import compression from "vite-plugin-compression";
// import circularDependencyPlugin from "vite-plugin-circular-dependency";
import { createHtmlPlugin } from "vite-plugin-html";
import svgr from "vite-plugin-svgr";

import type { PluginItem } from "@babel/core";
import { faviconsPlugin } from "@darkobits/vite-plugin-favicons";
import react from "@vitejs/plugin-react";

interface Env {
    DEV_PORT?: number;
    USE_HTTPS: boolean;
    API_BASE_URI: string;
    LOG_BASE_URI: string;
}

const resolveEnv = (mode: string): Env => {
    const env = loadEnv(mode, process.cwd(), "");

    const parseDevPort = (): number | undefined => {
        const v = env.DEV_PORT;

        if (v === undefined || v === "") {
            return undefined;
        }

        const p = parseInt(v);

        if (isNaN(p)) {
            throw new Error(`Invalid DEV_PORT ${v}`);
        }

        return p;
    };

    const parseUseHttps = () =>
        ["y", "yes", "t", "true", "1"].includes(env.USE_HTTPS?.toLowerCase() ?? "");

    const parseApiBaseUri = () => env.API_BASE_URI ?? "";
    const parseLogBaseUri = () => env.LOG_BASE_URI ?? "";

    return {
        DEV_PORT: parseDevPort(),
        USE_HTTPS: parseUseHttps(),
        API_BASE_URI: parseApiBaseUri(),
        LOG_BASE_URI: parseLogBaseUri(),
    } satisfies Env;
};

const https = (https: boolean): HttpsServerOptions | undefined => {
    if (!https) {
        return undefined;
    }

    return {
        cert: fs.readFileSync(path.resolve(__dirname, "./.cert/cert.pem")),
        key: fs.readFileSync(path.resolve(__dirname, "./.cert/key.pem")),
    };
};

const compressionFilter =
    /^(?!(.*(\/|^)index\.html$)).+\.(m?js|json|css|html|webmanifest|xml|txt|svg)$/i;
const compressionThreshold = 1024; // 1kb

export default defineConfig(({ mode }) => {
    const env = resolveEnv(mode);
    const isProd = mode === "production";

    const babelPlugins: PluginItem[] = [
        ["effector/babel-plugin", { addLoc: !isProd, addNames: !isProd }],
        ["typewind/babel"],
    ];

    if (isProd) {
        babelPlugins.push([
            "babel-plugin-transform-barrels",
            {
                executorName: "vite",
                alias: {
                    "@app": path.resolve(process.cwd(), "src"),
                },
            },
        ]);
    }

    const vitePlugins: PluginOption[] = [
        svgr({ include: "**/*.svg" }),
        react({ babel: { plugins: babelPlugins } }),
        checker({ overlay: false, terminal: true, typescript: true }),
        {
            name: "build-html",
            apply: "build",
            transformIndexHtml: (html: string): IndexHtmlTransformResult => {
                const config: string[] = [];
                config.push(`<script>(()=>{window.___={`);

                const ENVS = [
                    { name: "API_URI", default: JSON.stringify("") },
                    {
                        name: "LOG_URI",
                        default: JSON.stringify(""),
                    },
                ];

                for (let i = 0; i < ENVS.length; i++) {
                    if (i > 0) {
                        config.push(",");
                    }
                    config.push(ENVS[i].name, ":");
                    config.push("/** __", ENVS[i].name, "__ */");
                    config.push(ENVS[i].default);
                    config.push("/** __END__", ENVS[i].name, "__ */");
                }

                config.push(`};})();</script>`);

                return {
                    html: html.replace("<!-- {config.js} -->", config.join("")),
                    tags: [],
                };
            },
        },
        createHtmlPlugin({ minify: isProd }),
        faviconsPlugin({
            inject: true,
            cache: true,
            appName: "Logo-games Admin",
            appShortName: "Админка",
            appDescription: "Cистема управления крупнорогатым скотом",
            start_url: "/",
            background: "#ffffff",
            theme_color: "#5c940d",
            orientation: "portrait",
            icons: {
                favicons: { source: path.resolve(__dirname, "./src/assets/favicon/favicon.svg") },
                android: { source: path.resolve(__dirname, "./src/assets/favicon/favicon.svg") },
                appleIcon: {
                    source: path.resolve(__dirname, "./src/assets/favicon/favicon.svg"),
                    offset: 8,
                    background: "#ffffff",
                },
                appleStartup: {
                    source: path.resolve(__dirname, "./src/assets/favicon/favicon.svg"),
                    offset: 10,
                },
            },
        }),
        // circularDependencyPlugin({}),
    ];

    if (isProd) {
        vitePlugins.push(
            compression({
                algorithm: "gzip",
                threshold: compressionThreshold,
                ext: ".gz",
                filter: compressionFilter,
                compressionOptions: {
                    level: zconst.Z_MAX_LEVEL,
                },
            }),
            compression({
                algorithm: "brotliCompress",
                threshold: compressionThreshold,
                ext: ".br",
                filter: compressionFilter,
                compressionOptions: {
                    params: {
                        [zconst.BROTLI_PARAM_QUALITY]: zconst.BROTLI_MAX_QUALITY,
                    },
                },
            }),
        );
    }

    vitePlugins.push(visualizer({ template: "flamegraph", sourcemap: true }) as PluginOption);

    return {
        build: {
            sourcemap: "hidden",
        },
        esbuild: {
            // in case we need to write it to external file
            // see this discussion https://github.com/vitejs/vite/discussions/5329
            legalComments: "none",
        },
        server: {
            https: https(env.USE_HTTPS),
            host: "0.0.0.0",
            port: env.DEV_PORT,
            hmr: false,
        },
        plugins: vitePlugins,
        css: {
            postcss: {
                plugins: [tailwindcss()],
            },
        },
        define: {
            __API_BASE_URI__: isProd ? "window.___.API_URI" : JSON.stringify(env.API_BASE_URI),
            __LOG_BASE_URI__: isProd ? "window.___.LOG_URI" : JSON.stringify(env.LOG_BASE_URI),
        },
        resolve: {
            alias: {
                "@app": path.resolve(__dirname, "./src"),
            },
        },
    };
});
