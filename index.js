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
   * 将输入的任意对象转换成 Date，如果装换失败将返回当前时间
   * @param  {any} datetime 需要被格式化的时间
   * @return {Date}         转换好的 Date
   */
  function getDateObject(datetime) {
    var t = datetime instanceof Date ? datetime : new Date(datetime);
    if (!t.getDate()) {
      t = new Date();
    }
    return t;
  }

  /**
   * 格式化时间
   * @param  {Date}   datetime 需要被格式化的时间
   * @param  {string} format   格式化字符串，默认为 'YYYY-MM-DD HH:mm:ss'
   * @return {string}          格式化后的时间字符串
   */
  out.format = function (datetime, format) {
    var t = getDateObject(datetime);
    var hours, o, i = 0;
    format = format || 'YYYY-MM-DD HH:mm:ss';
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


  /**
   * const for .fromNow
   */
  var LOCALE_EN = {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      mm: '%s minutes',
      hh: '%s hours',
      dd: '%s days',
      MM: '%s months',
      yy: '%s years'
    }
  };
  var locate = LOCALE_EN;

  /**
   * 计算给出时间和当前时间的时间距离
   * @param  {Date}   datetime 需要计算的时间
   * @return {string}          时间距离
   */
  out.fromNow = function (datetime) {
    var t = getDateObject(datetime);
    var now = new Date();
    var methods = [
      [ 'yy', 'getFullYear'],
      [ 'MM', 'getMonth' ],
      [ 'dd', 'getDate' ],
      [ 'hh', 'getHours' ],
      [ 'mm', 'getMinutes' ],
      [ 's',  'getSeconds' ]
    ];
    var i = 0 , m, diff, fullStr, timeStr;
    for (; i < methods.length; i++) {
      m = methods[i][1];
      diff = t[m]() - now[m]();
      if (diff !== 0) {
        timeStr = locate.relativeTime[methods[i][0]];
        break;
      }
    }
    if (diff > 0) {
      fullStr = locate.relativeTime.future;
    } else {
      fullStr = locate.relativeTime.past;
      diff = -diff;
    }
    timeStr = timeStr.replace('%s', diff);
    return fullStr.replace('%s', timeStr);
  };

  return out;
});
