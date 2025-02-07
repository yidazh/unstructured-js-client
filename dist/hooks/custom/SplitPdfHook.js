"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitPdfHook = void 0;
const async_1 = __importDefault(require("async"));
const index_js_1 = require("./utils/index.js");
const common_js_1 = require("./common.js");
const retries_1 = require("../../lib/retries");
/**
 * Represents a hook for splitting and sending PDF files as per page requests.
 */
class SplitPdfHook {
    constructor() {
        /**
         * Maps lists responses to client operation.
         */
        this.partitionSuccessfulResponses = {};
        /**
         * Maps lists failed responses to client operation.
         */
        this.partitionFailedResponses = {};
        /**
         * Maps parallel requests to client operation.
         */
        this.partitionRequests = {};
    }
    /**
     * Initializes Split PDF Hook.
     * @param opts - The options for SDK initialization.
     * @returns The initialized SDK options.
     */
    sdkInit(opts) {
        const { baseURL } = opts;
        this.client = new common_js_1.HTTPClientExtension();
        this.client.addHook("response", (res) => {
            if (res.status != 200) {
                console.error("Request failed with status code", `${res.status}`);
            }
        });
        return { baseURL: baseURL, client: this.client };
    }
    /**
     * If `splitPdfPage` is set to `true` in the request, the PDF file is split into
     * separate batches. Each batch is sent as a separate request in parallel. The last
     * batch request is returned by this method. It will return the original request
     * when: `splitPdfPage` is set to `false`, the file is not a PDF, or the HTTP
     * has not been initialized.
     *
     * @param hookCtx - The hook context containing information about the operation.
     * @param request - The request object.
     * @returns If `splitPdfPage` is set to `true`, the last batch request; otherwise,
     * the original request.
     */
    async beforeRequest(hookCtx, request) {
        // setting the current operationID to be unique
        const operationID = "partition-" + (0, common_js_1.generateGuid)();
        hookCtx.operationID = operationID;
        const requestClone = request.clone();
        const formData = await requestClone.formData();
        const splitPdfPage = (0, index_js_1.stringToBoolean)(formData.get(common_js_1.PARTITION_FORM_SPLIT_PDF_PAGE_KEY) ?? "false");
        const file = formData.get(common_js_1.PARTITION_FORM_FILES_KEY);
        if (!splitPdfPage) {
            return request;
        }
        if (!this.client) {
            console.warn("HTTP client not accessible! Partitioning without split.");
            return request;
        }
        const [error, pdf, totalPages] = await (0, index_js_1.loadPdf)(file);
        if (file === null || pdf === null || error) {
            return request;
        }
        const [pageRangeStart, pageRangeEnd] = (0, index_js_1.getSplitPdfPageRange)(formData, totalPages);
        const pagesCount = pageRangeEnd - pageRangeStart + 1;
        const startingPageNumber = (0, index_js_1.getStartingPageNumber)(formData);
        const concurrencyLevel = (0, index_js_1.getSplitPdfConcurrencyLevel)(formData);
        this.allowFailed = (0, index_js_1.getSplitPdfAllowFailed)(formData);
        const splitSize = await (0, index_js_1.getOptimalSplitSize)(pagesCount, concurrencyLevel);
        // If user wants a specific page range, we need to call splitPdf,
        // even if this page count is too small to be split normally
        const isPageRangeRequested = pagesCount < totalPages;
        // Otherwise, if there are not enough pages, return the original request without splitting
        if (!isPageRangeRequested) {
            if (splitSize >= pagesCount || pagesCount < common_js_1.MIN_PAGES_PER_THREAD) {
                return request;
            }
        }
        const splits = await (0, index_js_1.splitPdf)(pdf, splitSize, pageRangeStart, pageRangeEnd);
        const oneSecond = 1000;
        const oneMinute = 1000 * 60;
        const sixtyMinutes = oneMinute * 60;
        const headers = (0, index_js_1.prepareRequestHeaders)(request);
        const requests = [];
        let setIndex = 1;
        for (const { content, startPage } of splits) {
            // Both startPage and startingPageNumber are 1-based, so we need to subtract 1
            const firstPageNumber = startPage + startingPageNumber - 1;
            const body = await (0, index_js_1.prepareRequestBody)(formData, content, file.name, firstPageNumber);
            const req = new Request(requestClone, {
                headers,
                body,
                signal: AbortSignal.timeout(sixtyMinutes)
            });
            requests.push(req);
            setIndex += 1;
        }
        this.partitionSuccessfulResponses[operationID] = new Array(requests.length);
        this.partitionFailedResponses[operationID] = new Array(requests.length);
        const allowFailed = this.allowFailed;
        // These are the retry values from our api spec
        // We need to hardcode them here until we're able to reuse the SDK
        // from within this hook
        const allowedRetries = 3;
        const retryConfig = {
            strategy: "backoff",
            backoff: {
                initialInterval: oneSecond * 3,
                maxInterval: oneMinute * 12,
                exponent: 1.88,
                maxElapsedTime: sixtyMinutes,
            },
        };
        const retryCodes = ["502", "503", "504"];
        this.partitionRequests[operationID] = async_1.default.parallelLimit(requests.map((req, pageIndex) => async () => {
            const pageNumber = pageIndex + startingPageNumber;
            let retryCount = 0;
            try {
                const response = await (0, retries_1.retry)(async () => {
                    retryCount++;
                    if (retryCount > allowedRetries) {
                        throw new Error(`Number of retries exceeded for page ${pageNumber}`);
                    }
                    return await this.client.request(req.clone());
                }, { config: retryConfig, statusCodes: retryCodes });
                if (response.status === 200) {
                    this.partitionSuccessfulResponses[operationID][pageIndex] =
                        response.clone();
                }
                else {
                    this.partitionFailedResponses[operationID][pageIndex] =
                        response.clone();
                    if (!allowFailed) {
                        throw new Error(`Failed to send request for page ${pageNumber}.`);
                    }
                }
            }
            catch (e) {
                console.error(`Failed to send request for page ${pageNumber}.`, e);
                if (!allowFailed) {
                    throw e;
                }
            }
        }), concurrencyLevel);
        return new Request("https://no-op/");
    }
    /**
     * Forms the final response object based on the successful and failed responses.
     * @param response - The response object returned from the API request.
     *   Expected to be a successful response.
     * @param successfulResponses - The list of successful responses.
     * @param failedResponses - The list of failed responses.
     * @returns The final response object.
     */
    async formFinalResponse(response, successfulResponses, failedResponses) {
        let realResponse = response.clone();
        const firstSuccessfulResponse = successfulResponses.at(0);
        const isFakeResponse = response.headers.has("fake-response");
        if (firstSuccessfulResponse !== undefined && isFakeResponse) {
            realResponse = firstSuccessfulResponse.clone();
        }
        let responseBody, responseStatus, responseStatusText;
        const numFailedResponses = failedResponses?.length ?? 0;
        const headers = (0, index_js_1.prepareResponseHeaders)(realResponse);
        if (!this.allowFailed && failedResponses && failedResponses.length > 0) {
            const failedResponse = failedResponses[0]?.clone();
            if (failedResponse) {
                responseBody = await failedResponse.text();
                responseStatusText = failedResponse.statusText;
            }
            else {
                responseBody = JSON.stringify({ "details:": "Unknown error" });
                responseStatusText = "Unknown error";
            }
            // if the response status is unknown or was 502, 503, 504, set back to 500 to ensure we don't cause more retries
            responseStatus = 500;
            console.warn(`${numFailedResponses} requests failed. The partition operation is cancelled.`);
        }
        else {
            if (isFakeResponse) {
                responseBody = await (0, index_js_1.prepareResponseBody)([...successfulResponses]);
            }
            else {
                responseBody = await (0, index_js_1.prepareResponseBody)([...successfulResponses, response]);
            }
            responseStatus = realResponse.status;
            responseStatusText = realResponse.statusText;
            if (numFailedResponses > 0) {
                console.warn(`${numFailedResponses} requests failed. The results might miss some pages.`);
            }
        }
        return new Response(responseBody, {
            headers: headers,
            status: responseStatus,
            statusText: responseStatusText,
        });
    }
    /**
     * Executes after a successful API request. Awaits all parallel requests and combines
     * the responses into a single response object.
     * @param hookCtx - The context object containing information about the hook execution.
     * @param response - The response object returned from the API request.
     * @returns If requests were run in parallel, a combined response object; otherwise,
     * the original response.
     */
    async afterSuccess(hookCtx, response) {
        const { operationID } = hookCtx;
        const responses = await this.awaitAllRequests(operationID);
        const successfulResponses = responses?.get("success") ?? [];
        const failedResponses = responses?.get("failed") ?? [];
        if (!successfulResponses) {
            return response;
        }
        const finalResponse = await this.formFinalResponse(response, successfulResponses, failedResponses);
        this.clearOperation(operationID);
        return finalResponse;
    }
    /**
     * Executes after an unsuccessful API request. Awaits all parallel requests, if at least one
     * request was successful, combines the responses into a single response object and doesn't
     * throw an error. It will return an error only if all requests failed, or there was no PDF split.
     * @param hookCtx - The AfterErrorContext object containing information about the hook context.
     * @param response - The Response object representing the response received before the error occurred.
     * @param error - The error object that was thrown.
     * @returns If requests were run in parallel, and at least one was successful, a combined response
     * object; otherwise, the original response and error.
     */
    async afterError(hookCtx, response, error) {
        const { operationID } = hookCtx;
        const responses = await this.awaitAllRequests(operationID);
        const successfulResponses = responses?.get("success") ?? [];
        const failedResponses = responses?.get("failed") ?? [];
        if (!successfulResponses?.length) {
            this.clearOperation(operationID);
            return { response, error };
        }
        const okResponse = successfulResponses[0];
        const finalResponse = await this.formFinalResponse(okResponse, successfulResponses.slice(1), failedResponses);
        this.clearOperation(operationID);
        return { response: finalResponse, error: null };
    }
    /**
     * Clears the parallel requests and response data associated with the given
     * operation ID.
     *
     * @param operationID - The ID of the operation to clear.
     */
    clearOperation(operationID) {
        delete this.partitionSuccessfulResponses[operationID];
        delete this.partitionFailedResponses[operationID];
        delete this.partitionRequests[operationID];
    }
    /**
     * Awaits all parallel requests for a given operation ID and returns the
     * responses.
     * @param operationID - The ID of the operation.
     * @returns A promise that resolves to an array of responses, or undefined
     * if there are no requests for the given operation ID.
     */
    async awaitAllRequests(operationID) {
        const requests = this.partitionRequests[operationID];
        const responseMap = new Map();
        if (!requests) {
            return responseMap;
        }
        await requests;
        responseMap.set("success", this.partitionSuccessfulResponses[operationID]?.filter((e) => e) ?? []);
        responseMap.set("failed", this.partitionFailedResponses[operationID]?.filter((e) => e) ?? []);
        return responseMap;
    }
}
exports.SplitPdfHook = SplitPdfHook;
//# sourceMappingURL=SplitPdfHook.js.map