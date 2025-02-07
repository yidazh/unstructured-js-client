import { UnstructuredClientCore } from "../core.js";
import { RequestOptions } from "../lib/sdks.js";
import { ConnectionError, InvalidRequestError, RequestAbortedError, RequestTimeoutError, UnexpectedClientError } from "../sdk/models/errors/httpclienterrors.js";
import * as errors from "../sdk/models/errors/index.js";
import { SDKError } from "../sdk/models/errors/sdkerror.js";
import { SDKValidationError } from "../sdk/models/errors/sdkvalidationerror.js";
import * as operations from "../sdk/models/operations/index.js";
import { Result } from "../sdk/types/fp.js";
export declare enum PartitionAcceptEnum {
    applicationJson = "application/json",
    textCsv = "text/csv"
}
/**
 * Summary
 *
 * @remarks
 * Description
 */
export declare function generalPartition(client: UnstructuredClientCore, request: operations.PartitionRequest, options?: RequestOptions & {
    acceptHeaderOverride?: PartitionAcceptEnum;
}): Promise<Result<operations.PartitionResponse, errors.HTTPValidationError | errors.ServerError | SDKError | SDKValidationError | UnexpectedClientError | InvalidRequestError | RequestAbortedError | RequestTimeoutError | ConnectionError>>;
//# sourceMappingURL=generalPartition.d.ts.map