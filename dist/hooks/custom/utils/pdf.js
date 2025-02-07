"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPdf = exports.splitPdf = exports.getOptimalSplitSize = exports.pdfPagesToBlob = void 0;
const pdf_lib_1 = require("pdf-lib");
const common_js_1 = require("../common.js");
/**
 * Converts range of pages (including start and end page values) of a PDF document
 * to a Blob object.
 * @param pdf - The PDF document.
 * @param startPage - Number of the first page of split.
 * @param endPage - Number of the last page of split.
 * @returns A Promise that resolves to a Blob object representing the converted pages.
 */
async function pdfPagesToBlob(pdf, startPage, endPage) {
    const subPdf = await pdf_lib_1.PDFDocument.create();
    // Create an array with page indices to copy
    // Converts 1-based page numbers to 0-based page indices
    const pageIndices = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index - 1);
    const pages = await subPdf.copyPages(pdf, pageIndices);
    for (const page of pages) {
        subPdf.addPage(page);
    }
    const subPdfBytes = await subPdf.save();
    return new Blob([subPdfBytes], {
        type: "application/pdf",
    });
}
exports.pdfPagesToBlob = pdfPagesToBlob;
/**
 * Calculates the optimal split size for processing pages with a specified concurrency level.
 *
 * @param pagesCount - The total number of pages to process.
 * @param concurrencyLevel - The level of concurrency to be used.
 * @returns A promise that resolves to the optimal number of pages per split,
 * ensuring it does not exceed the maximum or fall below the minimum threshold.
 */
async function getOptimalSplitSize(pagesCount, concurrencyLevel) {
    let splitSize = common_js_1.MAX_PAGES_PER_THREAD;
    if (pagesCount < common_js_1.MAX_PAGES_PER_THREAD * concurrencyLevel) {
        splitSize = Math.ceil(pagesCount / concurrencyLevel);
    }
    splitSize = Math.max(splitSize, common_js_1.MIN_PAGES_PER_THREAD);
    return splitSize;
}
exports.getOptimalSplitSize = getOptimalSplitSize;
/**
 * Retrieves an array of splits, with the start and end page numbers, from a PDF file.
 * Distribution of pages per split is made in as much uniform manner as possible.
 *
 * @param pdf - The PDF file to extract pages from.
 * @param splitSize - The number of pages per split.
 * @param [pageRangeStart=1] - The starting page of the range to be split (1-based index). Defaults to the first page of the document.
 * @param [pageRangeEnd=pdf.getPageCount()] - The ending page of the range to be split (1-based index). Defaults to the last page of the document.
 * @returns A promise that resolves to an array of objects containing Blob files and
 * start and end page numbers from the original document.
 */
async function splitPdf(pdf, splitSize, pageRangeStart, pageRangeEnd) {
    const pdfSplits = [];
    const startPage = pageRangeStart || 1;
    const endPage = pageRangeEnd || pdf.getPageCount();
    const pagesCount = endPage - startPage + 1;
    const numberOfSplits = Math.ceil(pagesCount / splitSize);
    for (let i = 0; i < numberOfSplits; ++i) {
        const offset = i * splitSize;
        const splitStartPage = offset + startPage;
        const splitEndPage = Math.min(endPage, splitStartPage + splitSize - 1);
        const pdfSplit = await pdfPagesToBlob(pdf, splitStartPage, splitEndPage);
        pdfSplits.push({ content: pdfSplit, startPage: splitStartPage, endPage: splitEndPage });
    }
    return pdfSplits;
}
exports.splitPdf = splitPdf;
/**
 * Checks if the given file is a PDF by loading the file as a PDF using the `PDFDocument.load` method.
 * @param file - The file to check.
 * @returns A promise that resolves to three values, first is a boolean representing
 * whether there was an error during PDF load, second is a PDFDocument object or null
 * (depending if there was an error), and the third is the number of pages in the PDF.
 * The number of pages is 0 if there was an error while loading the file.
 */
async function loadPdf(file) {
    if (!file) {
        return [true, null, 0];
    }
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdf_lib_1.PDFDocument.load(arrayBuffer);
        const pagesCount = pdf.getPages().length;
        return [false, pdf, pagesCount];
    }
    catch (e) {
        return [true, null, 0];
    }
}
exports.loadPdf = loadPdf;
//# sourceMappingURL=pdf.js.map