/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import * as z from "zod";
import { remap as remap$ } from "../../../lib/primitives.ts";
import { safeParse } from "../../../lib/schemas.ts";
import { Result as SafeParseResult } from "../../types/fp.ts";
import { SDKValidationError } from "../errors/sdkvalidationerror.ts";
import * as shared from "../shared/index.ts";

export type PartitionRequest = {
  partitionParameters: shared.PartitionParameters;
  unstructuredApiKey?: string | null | undefined;
};

export type PartitionResponse = {
  /**
   * HTTP response content type for this operation
   */
  contentType: string;
  /**
   * HTTP response status code for this operation
   */
  statusCode: number;
  /**
   * Raw HTTP response; suitable for custom response parsing
   */
  rawResponse: Response;
  /**
   * Successful Response
   */
  csvElements?: string | undefined;
  /**
   * Successful Response
   */
  elements?: Array<{ [k: string]: any }> | undefined;
};

/** @internal */
export const PartitionRequest$inboundSchema: z.ZodType<
  PartitionRequest,
  z.ZodTypeDef,
  unknown
> = z.object({
  partition_parameters: shared.PartitionParameters$inboundSchema,
  "unstructured-api-key": z.nullable(z.string()).optional(),
}).transform((v) => {
  return remap$(v, {
    "partition_parameters": "partitionParameters",
    "unstructured-api-key": "unstructuredApiKey",
  });
});

/** @internal */
export type PartitionRequest$Outbound = {
  partition_parameters: shared.PartitionParameters$Outbound;
  "unstructured-api-key"?: string | null | undefined;
};

/** @internal */
export const PartitionRequest$outboundSchema: z.ZodType<
  PartitionRequest$Outbound,
  z.ZodTypeDef,
  PartitionRequest
> = z.object({
  partitionParameters: shared.PartitionParameters$outboundSchema,
  unstructuredApiKey: z.nullable(z.string()).optional(),
}).transform((v) => {
  return remap$(v, {
    partitionParameters: "partition_parameters",
    unstructuredApiKey: "unstructured-api-key",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PartitionRequest$ {
  /** @deprecated use `PartitionRequest$inboundSchema` instead. */
  export const inboundSchema = PartitionRequest$inboundSchema;
  /** @deprecated use `PartitionRequest$outboundSchema` instead. */
  export const outboundSchema = PartitionRequest$outboundSchema;
  /** @deprecated use `PartitionRequest$Outbound` instead. */
  export type Outbound = PartitionRequest$Outbound;
}

export function partitionRequestToJSON(
  partitionRequest: PartitionRequest,
): string {
  return JSON.stringify(
    PartitionRequest$outboundSchema.parse(partitionRequest),
  );
}

export function partitionRequestFromJSON(
  jsonString: string,
): SafeParseResult<PartitionRequest, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PartitionRequest$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PartitionRequest' from JSON`,
  );
}

/** @internal */
export const PartitionResponse$inboundSchema: z.ZodType<
  PartitionResponse,
  z.ZodTypeDef,
  unknown
> = z.object({
  ContentType: z.string(),
  StatusCode: z.number().int(),
  RawResponse: z.instanceof(Response),
  csv_elements: z.string().optional(),
  elements: z.array(z.record(z.any())).optional(),
}).transform((v) => {
  return remap$(v, {
    "ContentType": "contentType",
    "StatusCode": "statusCode",
    "RawResponse": "rawResponse",
    "csv_elements": "csvElements",
  });
});

/** @internal */
export type PartitionResponse$Outbound = {
  ContentType: string;
  StatusCode: number;
  RawResponse: never;
  csv_elements?: string | undefined;
  elements?: Array<{ [k: string]: any }> | undefined;
};

/** @internal */
export const PartitionResponse$outboundSchema: z.ZodType<
  PartitionResponse$Outbound,
  z.ZodTypeDef,
  PartitionResponse
> = z.object({
  contentType: z.string(),
  statusCode: z.number().int(),
  rawResponse: z.instanceof(Response).transform(() => {
    throw new Error("Response cannot be serialized");
  }),
  csvElements: z.string().optional(),
  elements: z.array(z.record(z.any())).optional(),
}).transform((v) => {
  return remap$(v, {
    contentType: "ContentType",
    statusCode: "StatusCode",
    rawResponse: "RawResponse",
    csvElements: "csv_elements",
  });
});

/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export namespace PartitionResponse$ {
  /** @deprecated use `PartitionResponse$inboundSchema` instead. */
  export const inboundSchema = PartitionResponse$inboundSchema;
  /** @deprecated use `PartitionResponse$outboundSchema` instead. */
  export const outboundSchema = PartitionResponse$outboundSchema;
  /** @deprecated use `PartitionResponse$Outbound` instead. */
  export type Outbound = PartitionResponse$Outbound;
}

export function partitionResponseToJSON(
  partitionResponse: PartitionResponse,
): string {
  return JSON.stringify(
    PartitionResponse$outboundSchema.parse(partitionResponse),
  );
}

export function partitionResponseFromJSON(
  jsonString: string,
): SafeParseResult<PartitionResponse, SDKValidationError> {
  return safeParse(
    jsonString,
    (x) => PartitionResponse$inboundSchema.parse(JSON.parse(x)),
    `Failed to parse 'PartitionResponse' from JSON`,
  );
}
