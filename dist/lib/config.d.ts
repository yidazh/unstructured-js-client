import * as shared from "../sdk/models/shared/index.js";
import { HTTPClient } from "./http.js";
import { Logger } from "./logger.js";
import { RetryConfig } from "./retries.js";
/**
 * Serverless SaaS API
 */
export declare const ServerSaasApi = "saas-api";
/**
 * Hosted API Free
 */
export declare const ServerFreeApi = "free-api";
/**
 * Development server
 */
export declare const ServerDevelopment = "development";
/**
 * Contains the list of servers available to the SDK
 */
export declare const ServerList: {
    readonly "saas-api": "https://api.unstructuredapp.io";
    readonly "free-api": "https://api.unstructured.io";
    readonly development: "http://localhost:8000";
};
export type SDKOptions = {
    /**
     * The security details required to authenticate the SDK
     */
    security?: shared.Security | (() => Promise<shared.Security>);
    httpClient?: HTTPClient;
    /**
     * Allows overriding the default server used by the SDK
     */
    server?: keyof typeof ServerList;
    /**
     * Allows overriding the default server URL used by the SDK
     */
    serverURL?: string;
    /**
     * Allows overriding the default retry config used by the SDK
     */
    retryConfig?: RetryConfig;
    timeoutMs?: number;
    debugLogger?: Logger;
};
export declare function serverURLFromOptions(options: SDKOptions): URL | null;
export declare const SDK_METADATA: {
    readonly language: "typescript";
    readonly openapiDocVersion: "1.0.58";
    readonly sdkVersion: "0.19.0";
    readonly genVersion: "2.493.13";
    readonly userAgent: "speakeasy-sdk/typescript 0.19.0 2.493.13 1.0.58 unstructured-client";
};
//# sourceMappingURL=config.d.ts.map