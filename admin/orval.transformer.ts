import type {
    MediaTypeObject,
    OpenAPIObject,
    OperationObject,
    ParameterObject,
    ReferenceObject,
    RequestBodyObject,
    ResponseObject,
    SchemaObject,
} from "openapi3-ts/oas30";
import { isReferenceObject } from "openapi3-ts/oas30";

const operations = ["get", "put", "post", "delete", "options", "head", "patch", "trace"] as const;

export const removeDescriptions = (spec: OpenAPIObject): OpenAPIObject => {
    for (const path in spec.paths) {
        const pathItem = spec.paths[path];

        delete pathItem.description;
        delete pathItem.summary;

        for (const opName of operations) {
            removeDescriptionsFromOperation(spec, pathItem[opName]);
        }
    }

    return spec;
};

const removeDescriptionsFromOperation = (
    spec: OpenAPIObject,
    op: OperationObject | undefined,
): void => {
    if (op === undefined) {
        return;
    }

    delete op.description;
    delete op.summary;

    removeDescriptionFromRequestBody(spec, op.requestBody);
    for (const code in op.responses) {
        removeDescriptionFromResponse(spec, op.responses[code]);
    }

    if (op.parameters !== undefined) {
        for (const param of op.parameters) {
            removeDescriptionFromParameter(spec, param);
        }
    }
};

const removeDescriptionFromRequestBody = (
    spec: OpenAPIObject,
    body: RequestBodyObject | ReferenceObject | undefined,
): void => {
    if (body === undefined) {
        return;
    }

    if (isReferenceObject(body)) {
        removeDescriptionFromRequestBody(
            spec,
            spec.components?.requestBodies?.[refName(body.$ref)],
        );
        return;
    }

    delete body.description;

    for (const media in body.content) {
        removeDescriptionFromMediaType(spec, body.content[media]);
    }
};

const removeDescriptionFromResponse = (
    spec: OpenAPIObject,
    resp: ResponseObject | ReferenceObject | undefined,
): void => {
    if (resp === undefined) {
        return;
    }

    if (isReferenceObject(resp)) {
        removeDescriptionFromResponse(spec, spec.components?.responses?.[refName(resp.$ref)]);
        return;
    }

    for (const media in resp.content) {
        removeDescriptionFromMediaType(spec, resp.content[media]);
    }
};

const removeDescriptionFromParameter = (
    spec: OpenAPIObject,
    param: ParameterObject | ReferenceObject | undefined,
): void => {
    if (param === undefined) {
        return;
    }

    if (isReferenceObject(param)) {
        removeDescriptionFromParameter(spec, spec.components?.parameters?.[refName(param.$ref)]);
        return;
    }

    delete param.description;
    delete param.example;
    delete param.examples;

    removeDescriptionFromSchema(spec, param.schema);
};

const removeDescriptionFromMediaType = (spec: OpenAPIObject, content: MediaTypeObject): void => {
    delete content.example;
    delete content.examples;

    removeDescriptionFromSchema(spec, content.schema);
};

const removeDescriptionFromSchema = (
    spec: OpenAPIObject,
    schema: SchemaObject | ReferenceObject | undefined,
): void => {
    if (schema === undefined) {
        return;
    }

    if (isReferenceObject(schema)) {
        removeDescriptionFromSchema(spec, spec.components?.schemas?.[refName(schema.$ref)]);
        return;
    }

    delete schema.description;
    delete schema.example;
    delete schema.examples;
    delete schema.externalDocs;

    if (schema.properties !== undefined) {
        for (const prop in schema.properties) {
            removeDescriptionFromSchema(spec, schema.properties[prop]);
        }
    }
    if (
        schema.additionalProperties !== undefined &&
        typeof schema.additionalProperties !== "boolean"
    ) {
        removeDescriptionFromSchema(spec, schema.additionalProperties);
    }
    if (schema.allOf !== undefined) {
        for (const s of schema.allOf) {
            removeDescriptionFromSchema(spec, s);
        }
    }
    if (schema.anyOf !== undefined) {
        for (const s of schema.anyOf) {
            removeDescriptionFromSchema(spec, s);
        }
    }
    if (schema.oneOf !== undefined) {
        for (const s of schema.oneOf) {
            removeDescriptionFromSchema(spec, s);
        }
    }
    if (schema.not !== undefined) {
        removeDescriptionFromSchema(spec, schema.not);
    }
    if (schema.items !== undefined) {
        removeDescriptionFromSchema(spec, schema.items);
    }
};

export const refName = (ref: string): string => ref.split("/").pop()!;