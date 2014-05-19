var _               = require('underscore'),
    ConsoleReporter = require('./adapter/console_reporter');
    StatsdReporter  = require('./adapter/statsd_reporter');

/**
 * Chronograph allows you to wrap function calls to report its execution time from the moment they were invoked or
 * queued as callback until they were actually executed.
 *
 * Chronograph will notify all reporters in intervals with all reports available between each report.
 *
 * @param {Object|Array<Object>} reporters A reporter must provide a method `handle`.
 * @param {Object} config
 *  {
 *      namespace: string to be prepended to reports
 *      reportInterval: milliseconds between each report
 *  }
 * @constructor
 */
function Chronograph(reporters, config) {
    config = config || {};

    this.reporters = _.isArray(reporters) ? reporters : [reporters];
    this.reports = [];

    this.append = function(label, time) {
        this.reports.push({'l': [this.namespace, label].join('.'), 't': time});
    };

    this.config = config || {};
    this.namespace = config.namespace || '';

    this.start();
}

/**
 * It will report the time it took from the moment `func` was wrapped until it finished its call.
 */
Chronograph.prototype.after = function (func, label, context) {
    var startTime = Date.now();
    return function() {
        var result = func.apply(context || func, arguments);
        this.append(label || func.name, Date.now() - startTime);
        return result;
    }.bind(this);
};

/**
 * It will report the time it took from the moment `func` was wrapped until it was actually called.
 *
 * This is useful when wrapping functions that are callback for other methods so you can track the time it took until
 * the callback was invoked.
 */
Chronograph.prototype.before = function (func, label, context) {
    var startTime = Date.now();
    return function() {
        this.append(label || func.name, Date.now() - startTime);
        return func.apply(context || func, arguments);
    }.bind(this);
};

Chronograph.prototype.addReporter = function (func) {
    this.reporters.push(func);
};

/**
 * Starts reporting
 * The report interval can be defined via `reportInterval` configuration key
 */
Chronograph.prototype.start = function () {
    this.intervalId = setInterval(this.report.bind(this), this.config.reportInterval || 10000);
};

Chronograph.prototype.stop = function () {
    clearInterval(this.intervalId);
    this.intervalId = null;
};

Chronograph.prototype.report = function () {
    var reports = this.reports;
    this.reports = [];
    this.reporters.forEach(function(reporter) {
        if (_.isFunction(reporter.handle)) {
            reporter.handle(reports);
        }
    });
    reports = null;
};

module.exports = Chronograph;
module.exports.StatsdReporter = StatsdReporter;
module.exports.ConsoleReporter = ConsoleReporter;
