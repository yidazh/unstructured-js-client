import * as z from "zod";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
import * as shared from "../shared/index.js";
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
    elements?: Array<{
        [k: string]: any;
    }> | undefined;
};
/** @internal */
export declare const PartitionRequest$inboundSchema: z.ZodType<PartitionRequest, z.ZodTypeDef, unknown>;
/** @internal */
export type PartitionRequest$Outbound = {
    partition_parameters: shared.PartitionParameters$Outbound;
    "unstructured-api-key"?: string | null | undefined;
};
/** @internal */
export declare const PartitionRequest$outboundSchema: z.ZodType<PartitionRequest$Outbound, z.ZodTypeDef, PartitionRequest>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace PartitionRequest$ {
    /** @deprecated use `PartitionRequest$inboundSchema` instead. */
    const inboundSchema: z.ZodType<PartitionRequest, z.ZodTypeDef, unknown>;
    /** @deprecated use `PartitionRequest$outboundSchema` instead. */
    const outboundSchema: z.ZodType<PartitionRequest$Outbound, z.ZodTypeDef, PartitionRequest>;
    /** @deprecated use `PartitionRequest$Outbound` instead. */
    type Outbound = PartitionRequest$Outbound;
}
export declare function partitionRequestToJSON(partitionRequest: PartitionRequest): string;
export declare function partitionRequestFromJSON(jsonString: string): SafeParseResult<PartitionRequest, SDKValidationError>;
/** @internal */
export declare const PartitionResponse$inboundSchema: z.ZodType<PartitionResponse, z.ZodTypeDef, unknown>;
/** @internal */
export type PartitionResponse$Outbound = {
    ContentType: string;
    StatusCode: number;
    RawResponse: never;
    csv_elements?: string | undefined;
    elements?: Array<{
        [k: string]: any;
    }> | undefined;
};
/** @internal */
export declare const PartitionResponse$outboundSchema: z.ZodType<PartitionResponse$Outbound, z.ZodTypeDef, PartitionResponse>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace PartitionResponse$ {
    /** @deprecated use `PartitionResponse$inboundSchema` instead. */
    const inboundSchema: z.ZodType<PartitionResponse, z.ZodTypeDef, unknown>;
    /** @deprecated use `PartitionResponse$outboundSchema` instead. */
    const outboundSchema: z.ZodType<PartitionResponse$Outbound, z.ZodTypeDef, PartitionResponse>;
    /** @deprecated use `PartitionResponse$Outbound` instead. */
    type Outbound = PartitionResponse$Outbound;
}
export declare function partitionResponseToJSON(partitionResponse: PartitionResponse): string;
export declare function partitionResponseFromJSON(jsonString: string): SafeParseResult<PartitionResponse, SDKValidationError>;
//# sourceMappingURL=partition.d.ts.map