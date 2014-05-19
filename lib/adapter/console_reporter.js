function ConsoleReporter () {
}

ConsoleReporter.prototype.handle = function (reports) {
    reports.forEach(function(report) {
        console.log("ConsoleReporter", report.l, report.t);
    });
};

module.exports = ConsoleReporter;
