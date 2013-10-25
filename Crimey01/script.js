function outDate() {

	var daysPerYear = 365;
    var daysPerMonth = 30.5;
    var radioResult1;
	var radioResult2 = document.timeServed.choice2;
	var multiple1
	var multiple2;
	
	// Determines wether sentences is served at 50, 80 or 85
	
	for (var i = 0; i < document.timeServed.choice1.length; ++i) {
		if (document.timeServed.choice1[i].checked){
			radioResult1 = document.timeServed.choice1[i].value;
		}
	}
	
	for (var i = 0; i < document.timeServed.choice2.length; ++i) {
		if (document.timeServed.choice2[i].checked){
			radioResult2 = document.timeServed.choice2[i].value;
		}
	}

	if (radioResult1 === "violentFelony") {
		multiple1 = 0.15;
		multiple2 = 0.85
	} else if (radioResult1 ==="violentFelony" && radioResult2 ==="admitStrike"){
		multiple1 = 0.15;
		multiple2 = 0.85;
	} else if (radioResult1 === "felony" && radioResult2 === "admitStrike") {
		multiple1 = 0.2
		multiple2 = 0.8;
	} else if (radioResult1 === "seriousFelony" && radioResult2 === "admitStrike") {
		multiple1 = 0.2
		multiple2 = 0.8;
	} else {
		multiple1 = 1
		multiple2 = 0.5;
	}
	
	// variables related to pre-sentence credit
	
	var actualCredits = document.timeServed.actualCredits.value;
	var conductCredits = Math.floor(document.timeServed.actualCredits.value * multiple1);
	var totalCredits = Number(conductCredits) + Number(actualCredits);
	
	// variables related to post-sentece credits
	
	var totalSentence =	(document.timeServed.sentenceYears.value * daysPerYear) + 
						Math.floor(document.timeServed.sentenceMonths.value * daysPerMonth) + 
						(document.timeServed.sentenceDays.value * 1);
	var lessCredits = Number(totalSentence) - Number(totalCredits);
	var remainingSentence = Math.floor(lessCredits * multiple2);
	
	var remaingYears = Math.floor(remainingSentence / daysPerYear);
	var remainingMonths = Math.floor((remainingSentence % daysPerYear) / daysPerMonth);
	var remainingDays = Math.round(remainingSentence - (remaingYears * daysPerYear) - (remainingMonths * daysPerMonth)); 
    
  	
	var allTogether = 	"<div>" + actualCredits + " Actual credits for time served<br>" +
						conductCredits + " Additional good time / work time credits<br>" +
						totalCredits + " TOTAL CREDITS FOR TIME SERVED<br><br>" +
	
						totalSentence + " Number of days to serve<br>" +
						lessCredits + " Minus total pre-sentence credits<br>" + 
						remainingSentence + " Total days remaining</div>"
	
						+ "<br><div><span>(Time Left:  " + remaingYears + " years, " + remainingMonths + " months, " + remainingDays + " days.)</span></div>";
	
	document.getElementById("allTogether").innerHTML = allTogether;

}