

// all IS THE WHOLE DB
// xxSet ARE THE SET OF PHRASES AND VERBS THAT ARE BEING USED CURRENTLY (A SET OF 10, FOR EXAMPLE)
var allPhrases = phrases;
var phraseSet;
var allVerbs = verbs;
var verbSet;

var atSet = 0;

//console.log(allPhrases);

var currentPhrases = [];

$(document).ready(function () {

	bindStuff();

	buildCurrentSet(3);
	putPhrase(atSet);

});

function bindStuff() {

	// PRESSING THE ENTER KEY ON TEXTBOX
	$("#verbTextBox").on('keypress', function (e) {
		console.log("something pressed");

		if (e.which === 13) { // 13 = enter KEY
			checkAnswer();
		}
	});
}




function buildCurrentSet(count) {

	phraseSet = [];
	verbSet = [];
	atSet = 0;

	for (let i = 0; i < count; i++) {
		// SELECTION PROCEDURE
		//var randomInt = Math.floor(Math.random() * allPhrases.length);
		var randomInt = 1;

		// BUILD PHRASE SET
		const phraseData = allPhrases[randomInt];
		phraseSet.push(phraseData);

		// BUILD VERB SET
		verbLoop: // FOR break labels TO WORK, ONLY USE STANDARD FOR LOOPS
		for (let i = 0; i < allVerbs.length; i++) {
			const verbData = allVerbs[i];

			// CHECK INFINITIF
			if (verbData.infinitif == phraseData.infinitif) {

				// CHECK WHICH CONJUGATION
				for (let j = 0; j < verbData.conjugaisons.length; j++) {
					const conjugs = verbData.conjugaisons[j];

					if (conjugs.mode == phraseData.mode && conjugs.temp == phraseData.temp) {
						conjugs.group = verbData.group; // ADDING AND EXTRA DATA TO THE WORKING SET

						verbSet.push(conjugs);
						break verbLoop;
					}
				}
			}
		}
	}

	console.log(phraseSet);
	console.log(verbSet);


}

function putPhrase(whichPhrase) {

	// GET PHRASE TO WORK ON
	var phraseData = phraseSet[whichPhrase];
	var verbData = verbSet[whichPhrase];

	// GET VERB DATA
	// AND SPLITTING THE PHRASE ACCORDING TO THE SEARCHED CONJUGATION
	var whichConjugation = phraseData.personne - 1; // ARRAY LOCATION
	var conjugatedVerb = verbData.personnes[whichConjugation];
	var splittedPhrase = phraseData.phrase.split(conjugatedVerb);
	//console.log(splittedPhrase);

	// GET JQUERY OBJECTS
	var preVerb = $("#preVerbTextBox");
	var postVerb = $("#postVerbTextBox");
	var verbBox = $("#verbTextBox");

	// SET VIEWPORT
	preVerb.text(splittedPhrase[0]);
	postVerb.text(splittedPhrase[1]);
	verbBox.attr("data-infinitif", phraseData.infinitif);
	verbBox.attr("data-conjugated", conjugatedVerb);
	verbBox.attr("placeHolder", phraseData.infinitif);
	verbBox.val("");

}

function checkAnswer() {
	var verbBox = $("#verbTextBox");

	if (verbBox.val() == "?") {
		// IF NOT KNOW, TYPE "?" TO GET THE ANSWER
		verbBox.val(verbBox.attr("data-conjugated"));
	} else {
		// COMPARING DATA STORED IN ELEMENT
		if (verbBox.val().toLowerCase() == verbBox.attr("data-conjugated")) {
			console.log("Super");

			// FADE
			$("#phraseText").animate({
				opacity: 0.0,
				//left: "+=50",
				//height: "toggle"
			}, 500, function () {
				putNextPhrase();
			});
		}
	}
}

function putNextPhrase() {

	atSet++;
	if (atSet <= phraseSet.length) {
		putPhrase(atSet);

		$("#phraseText").animate({
			opacity: 1.0,
			//left: "+=50",
			//height: "toggle"
		}, 500);

	} else {

	}
}