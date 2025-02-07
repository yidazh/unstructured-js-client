"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGuid = exports.HTTPClientExtension = exports.MAX_PAGES_PER_THREAD = exports.MIN_PAGES_PER_THREAD = exports.MAX_NUMBER_OF_PARALLEL_REQUESTS = exports.DEFAULT_SPLIT_PDF_ALLOW_FAILED_KEY = exports.DEFAULT_NUMBER_OF_PARALLEL_REQUESTS = exports.DEFAULT_STARTING_PAGE_NUMBER = exports.EXTRACT_IMAGE_BLOCK_TYPES = exports.PARTITION_FORM_SPLIT_PDF_CONCURRENCY_LEVEL = exports.PARTITION_FORM_SPLIT_PDF_PAGE_RANGE_KEY = exports.PARTITION_FORM_STARTING_PAGE_NUMBER_KEY = exports.PARTITION_FORM_SPLIT_PDF_ALLOW_FAILED_KEY = exports.PARTITION_FORM_SPLIT_PDF_PAGE_KEY = exports.PARTITION_FORM_FILES_KEY = exports.BASE_PROTOCOL = exports.BASE_HOSTNAME_REGEX = void 0;
const http_1 = require("../../lib/http");
/**
 * Regular expression pattern for matching base hostnames in the form of "*.unstructuredapp.io".
 */
exports.BASE_HOSTNAME_REGEX = /^.*\.unstructuredapp\.io$/;
/**
 * The base protocol used for HTTPS requests.
 */
exports.BASE_PROTOCOL = "https:";
exports.PARTITION_FORM_FILES_KEY = "files";
exports.PARTITION_FORM_SPLIT_PDF_PAGE_KEY = "split_pdf_page";
exports.PARTITION_FORM_SPLIT_PDF_ALLOW_FAILED_KEY = "split_pdf_allow_failed";
exports.PARTITION_FORM_STARTING_PAGE_NUMBER_KEY = "starting_page_number";
exports.PARTITION_FORM_SPLIT_PDF_PAGE_RANGE_KEY = "split_pdf_page_range";
exports.PARTITION_FORM_SPLIT_PDF_CONCURRENCY_LEVEL = "split_pdf_concurrency_level";
exports.EXTRACT_IMAGE_BLOCK_TYPES = "extract_image_block_types";
exports.DEFAULT_STARTING_PAGE_NUMBER = 1;
exports.DEFAULT_NUMBER_OF_PARALLEL_REQUESTS = 10;
exports.DEFAULT_SPLIT_PDF_ALLOW_FAILED_KEY = false;
exports.MAX_NUMBER_OF_PARALLEL_REQUESTS = 50;
exports.MIN_PAGES_PER_THREAD = 2;
exports.MAX_PAGES_PER_THREAD = 20;
class HTTPClientExtension extends http_1.HTTPClient {
    constructor() {
        super();
    }
    async request(request) {
        if (request.url === "https://no-op/") {
            return new Response('{}', {
                headers: [
                    ["fake-response", "fake-response"]
                ],
                status: 200,
                statusText: 'OK_NO_OP'
            });
        }
        return super.request(request);
    }
}
exports.HTTPClientExtension = HTTPClientExtension;
function generateGuid() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
exports.generateGuid = generateGuid;
//# sourceMappingURL=common.js.map