import { HTTPClient } from "../../lib/http";
/**
 * Regular expression pattern for matching base hostnames in the form of "*.unstructuredapp.io".
 */
export declare const BASE_HOSTNAME_REGEX: RegExp;
/**
 * The base protocol used for HTTPS requests.
 */
export declare const BASE_PROTOCOL = "https:";
export declare const PARTITION_FORM_FILES_KEY = "files";
export declare const PARTITION_FORM_SPLIT_PDF_PAGE_KEY = "split_pdf_page";
export declare const PARTITION_FORM_SPLIT_PDF_ALLOW_FAILED_KEY = "split_pdf_allow_failed";
export declare const PARTITION_FORM_STARTING_PAGE_NUMBER_KEY = "starting_page_number";
export declare const PARTITION_FORM_SPLIT_PDF_PAGE_RANGE_KEY = "split_pdf_page_range";
export declare const PARTITION_FORM_SPLIT_PDF_CONCURRENCY_LEVEL = "split_pdf_concurrency_level";
export declare const EXTRACT_IMAGE_BLOCK_TYPES = "extract_image_block_types";
export declare const DEFAULT_STARTING_PAGE_NUMBER = 1;
export declare const DEFAULT_NUMBER_OF_PARALLEL_REQUESTS = 10;
export declare const DEFAULT_SPLIT_PDF_ALLOW_FAILED_KEY = false;
export declare const MAX_NUMBER_OF_PARALLEL_REQUESTS = 50;
export declare const MIN_PAGES_PER_THREAD = 2;
export declare const MAX_PAGES_PER_THREAD = 20;
export declare class HTTPClientExtension extends HTTPClient {
    constructor();
    request(request: Request): Promise<Response>;
}
export declare function generateGuid(): string;
//# sourceMappingURL=common.d.ts.map