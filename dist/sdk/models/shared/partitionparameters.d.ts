import * as z from "zod";
import { OpenEnum } from "../../types/enums.js";
import { Result as SafeParseResult } from "../../types/fp.js";
import { SDKValidationError } from "../errors/sdkvalidationerror.js";
export declare enum ChunkingStrategy {
    Basic = "basic",
    ByPage = "by_page",
    BySimilarity = "by_similarity",
    ByTitle = "by_title"
}
export type ChunkingStrategyOpen = OpenEnum<typeof ChunkingStrategy>;
export type Files = {
    content: ReadableStream<Uint8Array> | Blob | ArrayBuffer | Uint8Array;
    fileName: string;
};
/**
 * The format of the response. Supported formats are application/json and text/csv. Default: application/json.
 */
export declare enum OutputFormat {
    ApplicationJson = "application/json",
    TextCsv = "text/csv"
}
/**
 * The format of the response. Supported formats are application/json and text/csv. Default: application/json.
 */
export type OutputFormatOpen = OpenEnum<typeof OutputFormat>;
/**
 * The strategy to use for partitioning PDF/image. Options are fast, hi_res, auto. Default: hi_res
 */
export declare enum Strategy {
    Fast = "fast",
    HiRes = "hi_res",
    Auto = "auto",
    OcrOnly = "ocr_only",
    OdOnly = "od_only"
}
/**
 * The strategy to use for partitioning PDF/image. Options are fast, hi_res, auto. Default: hi_res
 */
export type StrategyOpen = OpenEnum<typeof Strategy>;
export type PartitionParameters = {
    /**
     * The file to extract
     */
    files: Files | Blob;
    /**
     * Use one of the supported strategies to chunk the returned elements after partitioning. When 'chunking_strategy' is not specified, no chunking is performed and any other chunking parameters provided are ignored. Supported strategies: 'basic', 'by_page', 'by_similarity', or 'by_title'
     */
    chunkingStrategy?: ChunkingStrategyOpen | null | undefined;
    /**
     * If chunking strategy is set, combine elements until a section reaches a length of n chars. Default: 500
     */
    combineUnderNChars?: number | null | undefined;
    /**
     * A hint about the content type to use (such as text/markdown), when there are problems processing a specific file. This value is a MIME type in the format type/subtype.
     */
    contentType?: string | null | undefined;
    /**
     * If `True`, return coordinates for each element extracted via OCR. Default: `False`
     */
    coordinates?: boolean | undefined;
    /**
     * The encoding method used to decode the text input. Default: utf-8
     */
    encoding?: string | null | undefined;
    /**
     * The types of elements to extract, for use in extracting image blocks as base64 encoded data stored in metadata fields.
     */
    extractImageBlockTypes?: Array<string> | undefined;
    /**
     * If file is gzipped, use this content type after unzipping.
     */
    gzUncompressedContentType?: string | null | undefined;
    /**
     * The name of the inference model used when strategy is hi_res
     */
    hiResModelName?: string | null | undefined;
    /**
     * When a chunking strategy is specified, each returned chunk will include the elements consolidated to form that chunk as `.metadata.orig_elements`. Default: true.
     */
    includeOrigElements?: boolean | null | undefined;
    /**
     * If true, the output will include page breaks if the filetype supports it. Default: false
     */
    includePageBreaks?: boolean | undefined;
    /**
     * When `True`, slide notes from .ppt and .pptx files will be included in the response. Default: `True`
     */
    includeSlideNotes?: boolean | undefined;
    /**
     * The languages present in the document, for use in partitioning and/or OCR. See the Tesseract documentation for a full list of languages.
     */
    languages?: Array<string> | undefined;
    /**
     * If chunking strategy is set, cut off new sections after reaching a length of n chars (hard max). Default: 500
     */
    maxCharacters?: number | null | undefined;
    /**
     * If chunking strategy is set, determines if sections can span multiple sections. Default: true
     */
    multipageSections?: boolean | undefined;
    /**
     * If chunking strategy is set, cut off new sections after reaching a length of n chars (soft max). Default: 1500
     */
    newAfterNChars?: number | null | undefined;
    /**
     * Deprecated! The languages present in the document, for use in partitioning and/or OCR
     */
    ocrLanguages?: Array<string> | undefined;
    /**
     * The format of the response. Supported formats are application/json and text/csv. Default: application/json.
     */
    outputFormat?: OutputFormatOpen | undefined;
    /**
     * Specifies the length of a string ('tail') to be drawn from each chunk and prefixed to the next chunk as a context-preserving mechanism. By default, this only applies to split-chunks where an oversized element is divided into multiple chunks by text-splitting. Default: 0
     */
    overlap?: number | undefined;
    /**
     * When `True`, apply overlap between 'normal' chunks formed from whole elements and not subject to text-splitting. Use this with caution as it entails a certain level of 'pollution' of otherwise clean semantic chunk boundaries. Default: False
     */
    overlapAll?: boolean | undefined;
    /**
     * Deprecated! Use skip_infer_table_types to opt out of table extraction for any file type. If False and strategy=hi_res, no Table Elements will be extracted from pdf files regardless of skip_infer_table_types contents.
     */
    pdfInferTableStructure?: boolean | undefined;
    /**
     * A value between 0.0 and 1.0 describing the minimum similarity two elements must have to be included in the same chunk. Note that similar elements may be separated to meet chunk-size criteria; this value can only guarantees that two elements with similarity below the threshold will appear in separate chunks.
     */
    similarityThreshold?: number | null | undefined;
    /**
     * The document types that you want to skip table extraction with. Default: []
     */
    skipInferTableTypes?: Array<string> | undefined;
    /**
     * When `split_pdf_page` is set to `True`, this parameter defines the behavior when some of the parallel requests fail. By default `split_pdf_allow_failed` is set to `False` and any failed request send to the API will make the whole process break and raise an Exception. If `split_pdf_allow_failed` is set to `True`, the errors encountered while sending parallel requests will not break the processing - the resuling list of Elements will miss the data from errored pages.
     */
    splitPdfAllowFailed?: boolean | undefined;
    /**
     * Number of maximum concurrent requests made when splitting PDF. Ignored on backend.
     */
    splitPdfConcurrencyLevel?: number | undefined;
    /**
     * Should the pdf file be split at client. Ignored on backend.
     */
    splitPdfPage?: boolean | undefined;
    /**
     * When `split_pdf_page is set to `True`, this parameter selects a subset of the pdf to send to the API. The parameter is a list of 2 integers within the range [1, length_of_pdf]. An Error is thrown if the given range is invalid. Ignored on backend.
     */
    splitPdfPageRange?: Array<number> | undefined;
    /**
     * When PDF is split into pages before sending it into the API, providing this information will allow the page number to be assigned correctly. Introduced in 1.0.27.
     */
    startingPageNumber?: number | null | undefined;
    /**
     * The strategy to use for partitioning PDF/image. Options are fast, hi_res, auto. Default: hi_res
     */
    strategy?: StrategyOpen | undefined;
    /**
     * The OCR agent to use for table ocr inference.
     */
    tableOcrAgent?: string | null | undefined;
    /**
     * When `True`, assign UUIDs to element IDs, which guarantees their uniqueness (useful when using them as primary keys in database). Otherwise a SHA-256 of element text is used. Default: `False`
     */
    uniqueElementIds?: boolean | undefined;
    /**
     * If `True`, will retain the XML tags in the output. Otherwise it will simply extract the text from within the tags. Only applies to XML documents.
     */
    xmlKeepTags?: boolean | undefined;
    /**
     * sort mode
     */
    sortMode?: string | null | undefined;
};
/** @internal */
export declare const ChunkingStrategy$inboundSchema: z.ZodType<ChunkingStrategyOpen, z.ZodTypeDef, unknown>;
/** @internal */
export declare const ChunkingStrategy$outboundSchema: z.ZodType<ChunkingStrategyOpen, z.ZodTypeDef, ChunkingStrategyOpen>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace ChunkingStrategy$ {
    /** @deprecated use `ChunkingStrategy$inboundSchema` instead. */
    const inboundSchema: z.ZodType<ChunkingStrategyOpen, z.ZodTypeDef, unknown>;
    /** @deprecated use `ChunkingStrategy$outboundSchema` instead. */
    const outboundSchema: z.ZodType<ChunkingStrategyOpen, z.ZodTypeDef, ChunkingStrategyOpen>;
}
/** @internal */
export declare const Files$inboundSchema: z.ZodType<Files, z.ZodTypeDef, unknown>;
/** @internal */
export type Files$Outbound = {
    content: ReadableStream<Uint8Array> | Blob | ArrayBuffer | Uint8Array;
    fileName: string;
};
/** @internal */
export declare const Files$outboundSchema: z.ZodType<Files$Outbound, z.ZodTypeDef, Files>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace Files$ {
    /** @deprecated use `Files$inboundSchema` instead. */
    const inboundSchema: z.ZodType<Files, z.ZodTypeDef, unknown>;
    /** @deprecated use `Files$outboundSchema` instead. */
    const outboundSchema: z.ZodType<Files$Outbound, z.ZodTypeDef, Files>;
    /** @deprecated use `Files$Outbound` instead. */
    type Outbound = Files$Outbound;
}
export declare function filesToJSON(files: Files): string;
export declare function filesFromJSON(jsonString: string): SafeParseResult<Files, SDKValidationError>;
/** @internal */
export declare const OutputFormat$inboundSchema: z.ZodType<OutputFormatOpen, z.ZodTypeDef, unknown>;
/** @internal */
export declare const OutputFormat$outboundSchema: z.ZodType<OutputFormatOpen, z.ZodTypeDef, OutputFormatOpen>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace OutputFormat$ {
    /** @deprecated use `OutputFormat$inboundSchema` instead. */
    const inboundSchema: z.ZodType<OutputFormatOpen, z.ZodTypeDef, unknown>;
    /** @deprecated use `OutputFormat$outboundSchema` instead. */
    const outboundSchema: z.ZodType<OutputFormatOpen, z.ZodTypeDef, OutputFormatOpen>;
}
/** @internal */
export declare const Strategy$inboundSchema: z.ZodType<StrategyOpen, z.ZodTypeDef, unknown>;
/** @internal */
export declare const Strategy$outboundSchema: z.ZodType<StrategyOpen, z.ZodTypeDef, StrategyOpen>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace Strategy$ {
    /** @deprecated use `Strategy$inboundSchema` instead. */
    const inboundSchema: z.ZodType<StrategyOpen, z.ZodTypeDef, unknown>;
    /** @deprecated use `Strategy$outboundSchema` instead. */
    const outboundSchema: z.ZodType<StrategyOpen, z.ZodTypeDef, StrategyOpen>;
}
/** @internal */
export declare const PartitionParameters$inboundSchema: z.ZodType<PartitionParameters, z.ZodTypeDef, unknown>;
/** @internal */
export type PartitionParameters$Outbound = {
    files: Files$Outbound | Blob;
    chunking_strategy?: string | null | undefined;
    combine_under_n_chars?: number | null | undefined;
    content_type?: string | null | undefined;
    coordinates: boolean;
    encoding?: string | null | undefined;
    extract_image_block_types?: Array<string> | undefined;
    gz_uncompressed_content_type?: string | null | undefined;
    hi_res_model_name?: string | null | undefined;
    include_orig_elements?: boolean | null | undefined;
    include_page_breaks: boolean;
    include_slide_notes: boolean;
    languages?: Array<string> | undefined;
    max_characters?: number | null | undefined;
    multipage_sections: boolean;
    new_after_n_chars?: number | null | undefined;
    ocr_languages?: Array<string> | undefined;
    output_format: string;
    overlap: number;
    overlap_all: boolean;
    pdf_infer_table_structure: boolean;
    similarity_threshold?: number | null | undefined;
    skip_infer_table_types?: Array<string> | undefined;
    split_pdf_allow_failed: boolean;
    split_pdf_concurrency_level: number;
    split_pdf_page: boolean;
    split_pdf_page_range?: Array<number> | undefined;
    starting_page_number?: number | null | undefined;
    strategy: string;
    table_ocr_agent?: string | null | undefined;
    unique_element_ids: boolean;
    xml_keep_tags: boolean;
    sort_mode?: string | null | undefined;
};
/** @internal */
export declare const PartitionParameters$outboundSchema: z.ZodType<PartitionParameters$Outbound, z.ZodTypeDef, PartitionParameters>;
/**
 * @internal
 * @deprecated This namespace will be removed in future versions. Use schemas and types that are exported directly from this module.
 */
export declare namespace PartitionParameters$ {
    /** @deprecated use `PartitionParameters$inboundSchema` instead. */
    const inboundSchema: z.ZodType<PartitionParameters, z.ZodTypeDef, unknown>;
    /** @deprecated use `PartitionParameters$outboundSchema` instead. */
    const outboundSchema: z.ZodType<PartitionParameters$Outbound, z.ZodTypeDef, PartitionParameters>;
    /** @deprecated use `PartitionParameters$Outbound` instead. */
    type Outbound = PartitionParameters$Outbound;
}
export declare function partitionParametersToJSON(partitionParameters: PartitionParameters): string;
export declare function partitionParametersFromJSON(jsonString: string): SafeParseResult<PartitionParameters, SDKValidationError>;
//# sourceMappingURL=partitionparameters.d.ts.map