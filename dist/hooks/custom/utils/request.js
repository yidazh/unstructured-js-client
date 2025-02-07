"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareRequestBody = exports.prepareRequestHeaders = exports.prepareResponseBody = exports.prepareResponseHeaders = void 0;
const common_js_1 = require("../common.js");
/**
 * Removes the "content-length" header from the passed response headers.
 *
 * @param response - The response object.
 * @returns The modified headers object.
 */
function prepareResponseHeaders(response) {
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    return headers;
}
exports.prepareResponseHeaders = prepareResponseHeaders;
/**
 * Prepares the response body by extracting and flattening the JSON elements from
 * an array of responses.
 *
 * @param responses - An array of Response objects.
 * @returns A Promise that resolves to a string representation of the flattened
 * JSON elements.
 */
async function prepareResponseBody(responses) {
    const allElements = [];
    let index = 1;
    for (const res of responses) {
        if (res.status != 200) {
            console.warn("Failed to partition set #%d, its elements will be omitted in the final result.", index);
        }
        const resElements = await res.json();
        allElements.push(resElements);
        index++;
    }
    return JSON.stringify(allElements.flat());
}
exports.prepareResponseBody = prepareResponseBody;
/**
 * Removes the "content-type" header from the given request headers.
 *
 * @param request - The request object containing the headers.
 * @returns The modified headers object.
 */
function prepareRequestHeaders(request) {
    const headers = new Headers(request.headers);
    headers.delete("content-type");
    return headers;
}
exports.prepareRequestHeaders = prepareRequestHeaders;
/**
 * Prepares the request body for splitting a PDF.
 *
 * @param formData - The original form data.
 * @param fileContent - The content of the pages to be split.
 * @param fileName - The name of the file.
 * @param startingPageNumber - Real first page number of the split.
 * @returns A Promise that resolves to a FormData object representing
 * the prepared request body.
 */
async function prepareRequestBody(formData, fileContent, fileName, startingPageNumber) {
    const newFormData = new FormData();
    for (const [key, value] of formData.entries()) {
        if (![
            common_js_1.PARTITION_FORM_STARTING_PAGE_NUMBER_KEY,
            common_js_1.PARTITION_FORM_SPLIT_PDF_PAGE_KEY,
            common_js_1.PARTITION_FORM_FILES_KEY,
        ].includes(key)) {
            newFormData.append(key, value);
        }
    }
    newFormData.append(common_js_1.PARTITION_FORM_SPLIT_PDF_PAGE_KEY, "false");
    newFormData.append(common_js_1.PARTITION_FORM_FILES_KEY, fileContent, fileName);
    newFormData.append(common_js_1.PARTITION_FORM_STARTING_PAGE_NUMBER_KEY, startingPageNumber.toString());
    if (formData.has(common_js_1.EXTRACT_IMAGE_BLOCK_TYPES)) {
        newFormData.delete(common_js_1.EXTRACT_IMAGE_BLOCK_TYPES);
        const extractImageBlockTypes = (formData.get(common_js_1.EXTRACT_IMAGE_BLOCK_TYPES)?.toString() || "").split(",");
        for (const blockType of extractImageBlockTypes) {
            newFormData.append(common_js_1.EXTRACT_IMAGE_BLOCK_TYPES, blockType);
        }
    }
    return newFormData;
}
exports.prepareRequestBody = prepareRequestBody;
//# sourceMappingURL=request.js.map