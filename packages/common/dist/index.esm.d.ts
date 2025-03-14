declare enum EVENTTYPES {
    XHR = "xhr",
    FETCH = "fetch",
    CLICK = "click",
    HISTORY = "history",
    ERROR = "error",
    HASHCHANGE = "hashchange",
    RESOURCE = "resource",
    UNHANDLEDREJECTION = "unhandledrejection",
    DOM = "dom",
    VUE = "vue",
    CUSTOM = "custom",
    PERFORMANCE = "performance",
    RECORDSCREEN = "recordScreen",
    WHITESCREEN = "whiteScreen"
}
declare enum HTTPTYPE {
    XHR = "xhr",
    FETCH = "fetch"
}
declare enum STATUSCODE {
    ERROR = "error",
    OK = "ok"
}
declare enum SpanStatus {
    Ok = "ok",
    DeadlineExceeded = "deadline_exceeded",
    Unauthenticated = "unauthenticated",
    PermissionDenied = "permission_denied",
    NotFound = "not_found",
    ResourceExhausted = "resource_exhausted",
    InvalidArgument = "invalid_argument",
    Unimplemented = "unimplemented",
    Unavailable = "unavailable",
    InternalError = "internal_error",
    UnknownError = "unknown_error",
    Cancelled = "cancelled",
    AlreadyExists = "already_exists",
    FailedPrecondition = "failed_precondition",
    Aborted = "aborted",
    OutOfRange = "out_of_range",
    DataLoss = "data_loss"
}
declare enum HTTPCODE {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401
}
declare enum BREADCRUMBTYPES {
    HTTP = "Http",
    CLICK = "Click",
    RESOURCE = "Resource_Error",
    CODEERROR = "Code_Error",
    ROUTE = "Route",
    CUSTOM = "Custom"
}
declare enum EMethods {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}

declare const SDK_NAME = "webmonitor";
declare const SDK_VERSION: string;

export { BREADCRUMBTYPES, EMethods, EVENTTYPES, HTTPCODE, HTTPTYPE, SDK_NAME, SDK_VERSION, STATUSCODE, SpanStatus };
