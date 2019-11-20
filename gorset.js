function Metrics() {
    var currentMetric = 0,
        tarrif = 0.22,
        date = "",
        isPayed = false,
        metrics = [],
        currentSum = 0,
        conductor = "",
        paymentDate = "",
        debt = 0;
    prepayment = 0;

    function setMetric(metric, metricDate, payedBill) {
        currentMetric = metric;
        date = metricDate;
        currentSum = tarrif * metric;
        isPayed = payedBill;
    }

    function Pay(sum, conductorPay, prePay) {
        var delta = sum - currentMetric * tarrif;
        conductor = conductorPay;
        paymentDate = new Date();
        debt = currentSum - sum;
        prepayment = prePay;
        if (debt > prepayment) {
            debt = debt - prepayment;
        } else if (debt < prepayment) {
            prepayment -= debt;
            debt = 0;
            isPayed = true;
        }
        metrics.push({
            currentMetric,
            isPayed,
            date,
            debt,
            conductor,
            paymentDate,
            prepayment
        });

    }

    function getMonth(num) {
        console.log("In ", num, " month  CurrentMetric = ", num * currentMetric);
        console.log("In ", num, " month CurrentSum = ", num * currentSum);
    }

    function getYear(n) {
        console.log("In ", n, " year currentMetric =  ", currentMetric * (n * 12));
        console.log("In ", n, " year currentSum =  ", currentSum * (n * 12));
    }

    function getMetric() {
        var innerMetrics = {
            currentMetric,
            currentSum,
            date,
            isPayed,
            debt,
            prepayment
        };

        if (isPayed) {
            innerMetrics.conductor = conductor;
            innerMetrics.paymentDate = paymentDate;
        }

        return innerMetrics;
    }

    return {
        setMetric,
        getMetric,
        Pay,
        getYear,
        getMonth
    }
}

var m1 = new Metrics();
m1.setMetric(450, "18.11.2019", false);
console.log(m1.getMetric());
m1.Pay(50, "Robert Downey jr.", 20);
console.log(m1.getMetric());
console.log(m1.getYear(2));
console.log(m1.getMonth(1));