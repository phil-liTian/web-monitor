(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["web-see"] = {}));
})(this, (function (exports) { 'use strict';

  /*
   * @author: phil.li
   */
  /*
   * @author: phil.li
   */
  // 事件类型
  exports.EVENTTYPES = void 0;
  (function (EVENTTYPES) {
      EVENTTYPES["XHR"] = "xhr";
      EVENTTYPES["FETCH"] = "fetch";
      EVENTTYPES["CLICK"] = "click";
      EVENTTYPES["HISTORY"] = "history";
      EVENTTYPES["ERROR"] = "error";
      EVENTTYPES["HASHCHANGE"] = "hashchange";
      EVENTTYPES["RESOURCE"] = "resource";
      EVENTTYPES["UNHANDLEDREJECTION"] = "unhandledrejection";
      EVENTTYPES["DOM"] = "dom";
      EVENTTYPES["VUE"] = "vue";
      EVENTTYPES["CUSTOM"] = "custom";
      EVENTTYPES["PERFORMANCE"] = "performance";
      EVENTTYPES["RECORDSCREEN"] = "recordScreen";
      EVENTTYPES["WHITESCREEN"] = "whiteScreen";
  })(exports.EVENTTYPES || (exports.EVENTTYPES = {}));
  // 请求类型
  exports.HTTPTYPE = void 0;
  (function (HTTPTYPE) {
      HTTPTYPE["XHR"] = "xhr";
      HTTPTYPE["FETCH"] = "fetch";
  })(exports.HTTPTYPE || (exports.HTTPTYPE = {}));
  // 请求状态
  exports.STATUSCODE = void 0;
  (function (STATUSCODE) {
      STATUSCODE["ERROR"] = "error";
      STATUSCODE["OK"] = "ok";
  })(exports.STATUSCODE || (exports.STATUSCODE = {}));
  // 接口错误状态
  exports.SpanStatus = void 0;
  (function (SpanStatus) {
      SpanStatus["Ok"] = "ok";
      SpanStatus["DeadlineExceeded"] = "deadline_exceeded";
      SpanStatus["Unauthenticated"] = "unauthenticated";
      SpanStatus["PermissionDenied"] = "permission_denied";
      SpanStatus["NotFound"] = "not_found";
      SpanStatus["ResourceExhausted"] = "resource_exhausted";
      SpanStatus["InvalidArgument"] = "invalid_argument";
      SpanStatus["Unimplemented"] = "unimplemented";
      SpanStatus["Unavailable"] = "unavailable";
      SpanStatus["InternalError"] = "internal_error";
      SpanStatus["UnknownError"] = "unknown_error";
      SpanStatus["Cancelled"] = "cancelled";
      SpanStatus["AlreadyExists"] = "already_exists";
      SpanStatus["FailedPrecondition"] = "failed_precondition";
      SpanStatus["Aborted"] = "aborted";
      SpanStatus["OutOfRange"] = "out_of_range";
      SpanStatus["DataLoss"] = "data_loss";
  })(exports.SpanStatus || (exports.SpanStatus = {}));
  exports.HTTPCODE = void 0;
  (function (HTTPCODE) {
      HTTPCODE[HTTPCODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
      HTTPCODE[HTTPCODE["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  })(exports.HTTPCODE || (exports.HTTPCODE = {}));
  exports.BREADCRUMBTYPES = void 0;
  (function (BREADCRUMBTYPES) {
      BREADCRUMBTYPES["HTTP"] = "Http";
      BREADCRUMBTYPES["CLICK"] = "Click";
      BREADCRUMBTYPES["RESOURCE"] = "Resource_Error";
      BREADCRUMBTYPES["CODEERROR"] = "Code_Error";
      BREADCRUMBTYPES["ROUTE"] = "Route";
      BREADCRUMBTYPES["CUSTOM"] = "Custom";
  })(exports.BREADCRUMBTYPES || (exports.BREADCRUMBTYPES = {}));
  exports.EMethods = void 0;
  (function (EMethods) {
      EMethods["Get"] = "GET";
      EMethods["Post"] = "POST";
      EMethods["Put"] = "PUT";
      EMethods["Delete"] = "DELETE";
  })(exports.EMethods || (exports.EMethods = {}));

  var version = "1.0.2";
  var version$1 = {
  	version: version};

  /*
   * @author: phil.li
   */
  const SDK_NAME = 'webmonitor';
  const SDK_VERSION = version$1.version;

  exports.SDK_NAME = SDK_NAME;
  exports.SDK_VERSION = SDK_VERSION;

}));
//# sourceMappingURL=index.js.map
