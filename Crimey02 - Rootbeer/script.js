var daysPerYear = 365;
var daysPerMonth = 30.42;

function multiple() {
    var i, x, y;
    for (i = 0; i < document.outDate.rsv.length; i++) {
        if (document.outDate.rsv[i].checked) {
            x = document.outDate.rsv[i].value;
        }
    }
    for (i = 0; i < document.outDate.strike.length; i++) {
        if (document.outDate.strike[i].checked) {
            y = document.outDate.strike[i].value;
        }
	}
    if (x === "violent") {
        return [0.15, 0.85];
    } else if (x === "violent" && y === "yStrike") {
        return [0.15, 0.85];
    } else if (x === "regular" && y === "yStrike") {
        return [0.2, 0.8];
    } else if (x === "serious" && y === "yStrike") {
        return [0.2, 0.8];
    } else {
        return [1, 0.5];
    }
}

function totalCredits() {
    var actualCredits = document.outDate.actualCredits.value;
	return Math.floor(actualCredits * multiple()[0]) + Number(actualCredits);
}

function totalSentence() {
    var years, months, days;
    years = document.outDate.sentenceYears.value;
    months = document.outDate.sentenceMonths.value;
    days = document.outDate.sentenceDays.value;
    return Math.floor(years * daysPerYear) + Math.floor(months * daysPerMonth) + Number(days);
}

function totalLessCredits() {
    var credits, sentence;
    credits = totalCredits();
    sentence = totalSentence();
    return Math.floor((sentence - credits) * multiple()[1]);
}

function convertYMD(days) {
	var totalYears, totalMonths, totalDays;
	totalYears = Math.floor(days / daysPerYear);
	totalMonths = Math.floor((days % daysPerYear) / daysPerMonth);
	totalDays = Math.floor(days - (totalYears * daysPerYear) - (totalMonths * daysPerMonth));
	return totalYears + " years, " + totalMonths + " months, " + totalDays + " days";
}

function calculate() {
	var x, y, z;
    x = totalCredits();
    y = totalSentence();
    z = totalLessCredits();
    document.getElementById("calculate").innerHTML = "<span>Total Sentence:<br>" + convertYMD(y) + "<br>(Days: " + y + ")<br><br>Total Credits:<br>" + convertYMD(x) + "<br>(Days: " + x + ")<br><br>Remaining Time:<br>" + convertYMD(z) + "<br>(Days: " + z + ")</span>";
}




