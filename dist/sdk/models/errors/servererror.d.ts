import * as z from "zod";
export type ServerErrorData = {
    detail?: string | undefined;
};
export declare class ServerError extends Error {
    detail?: string | undefined;
    /** The original data that was passed to this error instance. */
    data$: ServerErrorData;
    constructor(err: ServerErrorData);
}
/** @internal */
export declare const ServerError$inboundSchema: z.ZodType<ServerError, z.ZodTypeDef, unknown>;
/** @internal */
export type ServerError$Outbound = {
    detail?: string | undefined;
};
/** @internal */
export declare const ServerError$outboundSchema: z.ZodType<ServerError$Outbound, z.ZodTypeDef, ServerError>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ServerError$ {
    /** @deprecated use `ServerError$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ServerError, z.ZodTypeDef, unknown>;
    /** @deprecated use `ServerError$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ServerError$Outbound, z.ZodTypeDef, ServerError>;
    /** @deprecated use `ServerError$Outbound` instead. */
    type Outbound = ServerError$Outbound;
}
//# sourceMappingURL=servererror.d.ts.map