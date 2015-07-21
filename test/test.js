'use strict';

var assert = require('assert');
var sd = require('../index');

var FORMAT_A = 'YYYY-MM-DD HH:mm:ss';
var FORMAT_B = 'M/D/YYYY H:m a';

describe('silly-datetime', function () {
    describe('#format', function () {
        var datetime = new Date(2015, 7, 6, 15, 10, 3);
        console.log(datetime);
        it('should return as `' + FORMAT_A + '`', function () {
            assert.equal('2015-08-06 15:10:03', sd.format(datetime, FORMAT_A));
        });
        it('should return as `' + FORMAT_B + '`', function () {
            assert.equal('8/6/2015 15:10 pm', sd.format(datetime, FORMAT_B));
        });
    });
});
