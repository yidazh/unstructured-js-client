/*
 * Code generated by Speakeasy (https://speakeasyapi.dev). DO NOT EDIT.
 */

import * as utils from "../internal/utils";
import { General } from "./general";
import * as shared from "./models/shared";
import axios from "axios";
import { AxiosInstance } from "axios";

/**
 * Hosted API
 */
export const ServerProd = "prod";
/**
 * Development server
 */
export const ServerLocal = "local";
/**
 * Contains the list of servers available to the SDK
 */
export const ServerList: Record<string, string> = {
    [ServerProd]: "https://api.unstructured.io",
    [ServerLocal]: "http://localhost:8000",
} as const;

/**
 * The available configuration options for the SDK
 */
export type SDKProps = {
    /**
     * The security details required to authenticate the SDK
     */
    security?: shared.Security | (() => Promise<shared.Security>);

    /**
     * Allows overriding the default axios client used by the SDK
     */
    defaultClient?: AxiosInstance;

    /**
     * Allows overriding the default server used by the SDK
     */
    server?: string;

    /**
     * Allows overriding the default server URL used by the SDK
     */
    serverURL?: string;
    /**
     * Allows overriding the default retry config used by the SDK
     */
    retryConfig?: utils.RetryConfig;
};

export class SDKConfiguration {
    defaultClient: AxiosInstance;
    security?: shared.Security | (() => Promise<shared.Security>);
    serverURL: string;
    serverDefaults: any;
    language = "typescript";
    openapiDocVersion = "0.0.1";
    sdkVersion = "0.6.0";
    genVersion = "2.166.0";
    userAgent = "speakeasy-sdk/typescript 0.6.0 2.166.0 0.0.1 unstructured-client";
    retryConfig?: utils.RetryConfig;
    public constructor(init?: Partial<SDKConfiguration>) {
        Object.assign(this, init);
    }
}

/**
 * Unstructured Pipeline API: Partition documents with the Unstructured library
 */
export class UnstructuredClient {
    public general: General;

    private sdkConfiguration: SDKConfiguration;

    constructor(props?: SDKProps) {
        let serverURL = props?.serverURL;
        const server = props?.server ?? ServerProd;

        if (!serverURL) {
            serverURL = ServerList[server];
        }

        const defaultClient = props?.defaultClient ?? axios.create({ baseURL: serverURL });
        this.sdkConfiguration = new SDKConfiguration({
            defaultClient: defaultClient,
            security: props?.security,
            serverURL: serverURL,
            retryConfig: props?.retryConfig,
        });

        this.general = new General(this.sdkConfiguration);
    }
}
