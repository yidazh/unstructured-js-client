"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartingPageNumber = exports.getSplitPdfAllowFailed = exports.getSplitPdfConcurrencyLevel = exports.getSplitPdfPageRange = void 0;
const common_js_1 = require("../common.js");
/**
 * Retrieves an integer parameter from the given form data.
 * If the parameter is not found or is not a valid integer, the default value is returned.
 *
 * @param formData - The form data object.
 * @param parameterName - The name of the parameter to retrieve.
 * @param defaultValue - The default value to use if the parameter is not found or is not
 * a valid integer.
 * @returns The integer value of the parameter.
 */
function getIntegerParameter(formData, parameterName, defaultValue) {
    let numberParameter = defaultValue;
    const formDataParameter = formData.get(parameterName);
    if (formDataParameter === null) {
        return numberParameter;
    }
    const formDataNumberParameter = parseInt(formDataParameter);
    if (isNaN(formDataNumberParameter)) {
        console.warn(`'${parameterName}' is not a valid integer. Using default value '${defaultValue}'.`);
    }
    else {
        numberParameter = formDataNumberParameter;
    }
    return numberParameter;
}
/**
 * Retrieves a boolean parameter from the given form data.
 * If the parameter is not found or does not have true/false value, the default value is returned.
 *
 * @param formData - The form data object.
 * @param parameterName - The name of the parameter to retrieve.
 * @param defaultValue - The default value to use if the parameter is not found or is not
 * a true/false string.
 * @returns The boolean value of the parameter.
 */
function getBooleanParameter(formData, parameterName, defaultValue) {
    let booleanParameter = defaultValue;
    const formDataParameter = formData.get(parameterName);
    if (formDataParameter === null) {
        return booleanParameter;
    }
    const formDataBooleanParameterString = formDataParameter;
    if (formDataBooleanParameterString.toLowerCase() === "true") {
        booleanParameter = true;
    }
    else if (formDataBooleanParameterString.toLowerCase() === "false") {
        booleanParameter = false;
    }
    else {
        console.warn(`'${parameterName}' is not a valid boolean. Using default value '${defaultValue}'.`);
    }
    return booleanParameter;
}
/**
 * Retrieves and validates a page range from FormData, ensuring that the start and end values are defined and within bounds.
 *
 * @param formData - The FormData object containing the page range parameter.
 * @param maxPages - The maximum number of pages in the document.
 * @returns {[number, number]} - A tuple containing the validated start and end page numbers.
 *
 * @throws Will throw an error if the page range is invalid or out of bounds.
 */
function getSplitPdfPageRange(formData, maxPages) {
    const formDataParameter = formData.get(common_js_1.PARTITION_FORM_SPLIT_PDF_PAGE_RANGE_KEY);
    const pageRange = String(formDataParameter).split(",").map(Number);
    const start = pageRange[0] || 1;
    const end = pageRange[1] || maxPages;
    if (!(start > 0 && start <= maxPages) || !(end > 0 && end <= maxPages) || !(start <= end)) {
        const msg = `Page range (${start} to ${end}) is out of bounds. Values should be between 1 and ${maxPages}.`;
        console.error(msg);
        throw new Error(msg);
    }
    return [start, end];
}
exports.getSplitPdfPageRange = getSplitPdfPageRange;
/**
 * Gets the number of maximum requests that can be made when splitting PDF.
 * - The number of maximum requests is determined by the value of the request parameter
 * `split_pdf_thread`.
 * - If the parameter is not set or has an invalid value, the default number of
 * parallel requests (5) is used.
 * - If the number of maximum requests is greater than the maximum allowed (15), it is
 * clipped to the maximum value.
 * - If the number of maximum requests is less than 1, the default number of parallel
 * requests (5) is used.
 *
 * @returns The number of maximum requests to use when calling the API to split a PDF.
 */
function getSplitPdfConcurrencyLevel(formData) {
    let splitPdfConcurrencyLevel = getIntegerParameter(formData, common_js_1.PARTITION_FORM_SPLIT_PDF_CONCURRENCY_LEVEL, common_js_1.DEFAULT_NUMBER_OF_PARALLEL_REQUESTS);
    if (splitPdfConcurrencyLevel > common_js_1.MAX_NUMBER_OF_PARALLEL_REQUESTS) {
        console.warn(`Clipping '${common_js_1.PARTITION_FORM_SPLIT_PDF_CONCURRENCY_LEVEL}' to ${common_js_1.MAX_NUMBER_OF_PARALLEL_REQUESTS}.`);
        splitPdfConcurrencyLevel = common_js_1.MAX_NUMBER_OF_PARALLEL_REQUESTS;
    }
    else if (splitPdfConcurrencyLevel < 1) {
        console.warn(`'${common_js_1.PARTITION_FORM_SPLIT_PDF_CONCURRENCY_LEVEL}' is less than 1.`);
        splitPdfConcurrencyLevel = common_js_1.DEFAULT_NUMBER_OF_PARALLEL_REQUESTS;
    }
    return splitPdfConcurrencyLevel;
}
exports.getSplitPdfConcurrencyLevel = getSplitPdfConcurrencyLevel;
/**
 * Gets the allowFailed parameter which decides whether the partial requests can fail or not
 * when using splitPdfPage parameter.
 * - The number of maximum requests is determined by the value of the request parameter
 * `split_pdf_thread`.
 * - If the parameter is not set or has an invalid value, the default number of
 * parallel requests (5) is used.
 * - If the number of maximum requests is greater than the maximum allowed (15), it is
 * clipped to the maximum value.
 * - If the number of maximum requests is less than 1, the default number of parallel
 * requests (5) is used.
 *
 * @returns The number of maximum requests to use when calling the API to split a PDF.
 */
function getSplitPdfAllowFailed(formData) {
    const splitPdfAllowFailed = getBooleanParameter(formData, common_js_1.PARTITION_FORM_SPLIT_PDF_ALLOW_FAILED_KEY, common_js_1.DEFAULT_SPLIT_PDF_ALLOW_FAILED_KEY);
    return splitPdfAllowFailed;
}
exports.getSplitPdfAllowFailed = getSplitPdfAllowFailed;
/**
 * Retrieves the starting page number from the provided form data.
 * If the starting page number is not a valid integer or less than 1,
 * it will use the default value `1`.
 *
 * @param formData - Request form data.
 * @returns The starting page number.
 */
function getStartingPageNumber(formData) {
    let startingPageNumber = getIntegerParameter(formData, common_js_1.PARTITION_FORM_STARTING_PAGE_NUMBER_KEY, common_js_1.DEFAULT_STARTING_PAGE_NUMBER);
    if (startingPageNumber < 1) {
        console.warn(`'${common_js_1.PARTITION_FORM_STARTING_PAGE_NUMBER_KEY}' is less than 1. Using default value '${common_js_1.DEFAULT_STARTING_PAGE_NUMBER}'.`);
        startingPageNumber = common_js_1.DEFAULT_STARTING_PAGE_NUMBER;
    }
    return startingPageNumber;
}
exports.getStartingPageNumber = getStartingPageNumber;
//# sourceMappingURL=form.js.map