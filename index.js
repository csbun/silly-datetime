(function(root, factory) {
  'use strict';
  /* istanbul ignore else  */
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function() {
      return factory();
    });
  } else if (typeof define === 'function' && define.cmd) {
    // CMD
    define(function(require, exports, module) {
      module.exports = factory();
    });
  } else {
    // Global Variables
    root.ResizeImage = factory();
  }
})(this, function () {
  'use strict';

  var out = {};

  /**
   * 格式化时间
   * @param  {Date}   datetime 需要被格式化的时间
   * @param  {string} format   格式化字符串，默认为 'YYYY-MM-DD HH:mm:ss'
   * @return {string}          格式化后的时间字符串
   */
  out.format = function (datetime, format) {
    var t = datetime instanceof Date ? datetime : new Date(datetime);
    var hours, o, i = 0;
    format = format || 'YYYY-MM-DD HH:mm:ss';
    if (!t.getDate()) {
      t = new Date();
    }
    hours = t.getHours();
    o = [
      ['M+', t.getMonth() + 1],
      ['D+', t.getDate()],
      // H 24小时制
      ['H+', hours],
      // h 12小时制
      ['h+', hours > 12 ? hours - 12 : hours],
      ['m+', t.getMinutes()],
      ['s+', t.getSeconds()],
    ];
    // 替换 Y
    if (/(Y+)/.test(format)) {
      format = format.replace(RegExp.$1, (t.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    // 替换 M, D, H, h, m, s
    for (; i < o.length; i++) {
      if (new RegExp('(' + o[i][0] + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[i][1] : ('00' + o[i][1]).substr(('' + o[i][1]).length));
      }
    }
    // 替换 a/A 为 am, pm
    return format.replace(/a/ig, hours > 11 ? 'pm' : 'am');
  };
  return out;
});
