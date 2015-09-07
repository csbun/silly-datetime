'use strict';

var assert = require('assert');
var sd = require('../index');


describe('silly-datetime', function () {

  describe('#format', function () {
    var FORMAT_A = 'YYYY-MM-DD HH:mm:ss';
    var FORMAT_B = 'M/D/YYYY H:m a';
    var datetime = new Date(2015, 7, 6, 15, 10, 3);
    it('should return as `' + FORMAT_A + '`', function () {
      assert.equal('2015-08-06 15:10:03', sd.format(datetime, FORMAT_A));
    });
    it('should return as `' + FORMAT_B + '`', function () {
      assert.equal('8/6/2015 15:10 pm', sd.format(datetime, FORMAT_B));
    });
  });

  describe('#fromNow', function () {
    var SECOND_IN = 'in a few seconds';
    it('test `' + SECOND_IN + '`', function () {
      var datetime = +new Date() + 3 * 1000;
      assert.equal(SECOND_IN, sd.fromNow(datetime));
    });

    var SECOND_AGO = 'a few seconds ago';
    it('test `' + SECOND_AGO + '`', function () {
      var datetime = +new Date() - 3 * 1000;
      assert.equal(SECOND_AGO, sd.fromNow(datetime));
    });

    var MINUTE = 3;
    var MINUTE_AGO = MINUTE + ' minutes ago';
    it('test `' + MINUTE_AGO + '`', function () {
      var datetime = +new Date() - MINUTE * 60 * 1000;
      assert.equal(MINUTE_AGO, sd.fromNow(datetime));
    });

    var HOUR = 3;
    var HOUR_AGO = HOUR + ' hours ago';
    it('test `' + HOUR_AGO + '`', function () {
      var datetime = +new Date() - HOUR * 60 * 60 * 1000;
      assert.equal(HOUR_AGO, sd.fromNow(datetime));
    });


    var DAY = 3;
    var DAY_AGO = DAY + ' days ago';
    it('test `' + DAY_AGO + '`', function () {
      var datetime = +new Date() - DAY * 24 * 60 * 60 * 1000;
      assert.equal(DAY_AGO, sd.fromNow(datetime));
    });


    var MONTH = 3;
    var MONTH_AGO = MONTH + ' months ago';
    it('test `' + MONTH_AGO + '`', function () {
      var datetime = new Date();
      datetime.setMonth(datetime.getMonth() - MONTH);
      assert.equal(MONTH_AGO, sd.fromNow(datetime));
    });

    var YEAR = 3;
    var YEAR_AGO = YEAR + ' years ago';
    it('test `' + YEAR_AGO + '`', function () {
      var datetime = new Date();
      datetime.setFullYear(datetime.getFullYear() - YEAR);
      assert.equal(YEAR_AGO, sd.fromNow(datetime));
    });
  });
});
