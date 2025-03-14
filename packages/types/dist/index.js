(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["web-see"] = {}));
})(this, (function (exports) { 'use strict';

  class BasePlugin {
      constructor(type) {
          this.type = type;
      }
  }

  exports.BasePlugin = BasePlugin;

}));
//# sourceMappingURL=index.js.map
