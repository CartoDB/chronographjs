var assert      = require('assert'),
    Chronograph = require('../lib/chronograph');


suite('chronograph', function() {

    test('timeit\'ed function returns original value', function() {
        var reporter = {
            handle: function(reports) {}
        };

        var chronograph = new Chronograph(reporter);

        var expectedValue = 1;
        function fooFunc() {
            return expectedValue;
        }

        var result = chronograph.after(fooFunc)();

        assert.equal(expectedValue, result);
    });

    test('object call without a provided context returns undefined', function() {

        var reporter = {
            handle: function(reports) {}
        };

        var chronograph = new Chronograph(reporter);

        var expectedValue = 1;
        function fooFunc() {
            return expectedValue;
        }

        var result = chronograph.after(fooFunc)();

        assert.equal(expectedValue, result);
    });
});
