function StatsdReporter (statsdClient) {
    this.statsdClient = statsdClient;
}

StatsdReporter.prototype.handle = function (reports) {
    reports.forEach(function(report) {
        this.statsdClient.timing(report.l, report.t);
    }.bind(this));
};

module.exports = StatsdReporter;
