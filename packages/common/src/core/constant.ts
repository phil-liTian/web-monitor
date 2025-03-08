/*
 * @author: phil.li
 */
// 事件类型
export enum EVENTTYPES {
  XHR = 'xhr',
  FETCH = 'fetch',
  CLICK = 'click',
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  RESOURCE = 'resource',
  UNHANDLEDREJECTION = 'unhandledrejection',
  DOM = 'dom',
  VUE = 'vue',
  CUSTOM = 'custom',
  PERFORMANCE = 'performance',
  RECORDSCREEN = 'recordScreen',
  WHITESCREEN = 'whiteScreen',
}

// 请求类型
export enum HTTPTYPE {
  XHR = 'xhr',
  FETCH = 'fetch',
}

// 请求状态
export enum STATUSCODE {
  ERROR = 'error',
  OK = 'ok',
}

// 接口错误状态
export enum SpanStatus {
  Ok = 'ok',
  DeadlineExceeded = 'deadline_exceeded',
  Unauthenticated = 'unauthenticated',
  PermissionDenied = 'permission_denied',
  NotFound = 'not_found',
  ResourceExhausted = 'resource_exhausted',
  InvalidArgument = 'invalid_argument',
  Unimplemented = 'unimplemented',
  Unavailable = 'unavailable',
  InternalError = 'internal_error',
  UnknownError = 'unknown_error',
  Cancelled = 'cancelled',
  AlreadyExists = 'already_exists',
  FailedPrecondition = 'failed_precondition',
  Aborted = 'aborted',
  OutOfRange = 'out_of_range',
  DataLoss = 'data_loss',
}

export enum HTTPCODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export enum BREADCRUMBTYPES {
  HTTP = 'Http',
  CLICK = 'Click',
  RESOURCE = 'Resource_Error',
  CODEERROR = 'Code_Error',
  ROUTE = 'Route',
  CUSTOM = 'Custom',
}
