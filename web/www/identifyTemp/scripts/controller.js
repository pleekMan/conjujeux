// import tippy from 'node_modules/tippy.js/dist/tippy-bundle.iife.js';
//import 'node_modules/tippy.js/dist/tippy.css';

// all IS THE WHOLE DB
// xxSet ARE THE SET OF PHRASES AND VERBS THAT ARE BEING USED CURRENTLY (A SET OF 10, FOR EXAMPLE)

var phraseCount = 20;
var atPhrase = 0;
var score = 0;

var tooltip; // DELETE, THIS IS THE OLD TOOLTIP LIB

var currentParagraphData;
var activeVerb = -1;
var userResponses = [];

//console.log(allPhrases);

$(document).ready(function () {

	bindStuff();
	reStart();


});

function bindStuff() {

	// PRESSING THE ENTER KEY ON TEXTBOX
	$("#verbTextBox").on('keypress', function (e) {
		//console.log("something pressed");
		if (e.which === 13) { // 13 = enter KEY
			checkAnswer();
		}
	});

	// $("#playButton").on("mousedown", function () {
	// 	reStart();
	// });







}

function reStart() {
	buildParagraph(0);
	bindTooltips();

	$("#playButton").hide();
	fadeInPhrase();
}

function chooseTemp(whichTemp) {
	console.log(whichTemp);

	var whichTempToString = "-";

	switch (whichTemp) {
		case 0:
			whichTempToString = "imparfait";
			break;
		case 1:
			whichTempToString = "passe composse";
			break;
		case 2:
			whichTempToString = "future proche";
			break;
		case 3:
			whichTempToString = "future simple";
			break;
		default:
			whichTempToString = "-";
			break;
	}

	userResponses[activeVerb] = whichTempToString;

	var verbSlots = $("#phraseText").find("span");

	// UPDATE THE TOOLTIP CONTENT TO SHOW THE SELECTED OPTION
	$(verbSlots[activeVerb]).get(0)._tippy.setContent(whichTempToString);
	$(verbSlots[activeVerb]).get(0)._tippy.show();
	//$(verbSlots[activeVerb]).get(0)._tippy.setProps({interactive:true});
	$(verbSlots[activeVerb]).get(0)._tippy.enable();
}

function buildParagraph(which) {

	currentParagraphData = paragraphs[which];


	// SLICING ALL VERB AND NON-VERB PORTIONS FROM PARAGRAPH TO ADD TO A LIST
	var paragraphSlicing = [];
	var lastFirstIndex = 0;
	for (let i = 0; i < currentParagraphData.verbs.length; i++) {
		const verbData = currentParagraphData.verbs[i];

		// VERB START-END
		var verbStartIndex = currentParagraphData.paragraph.indexOf(verbData.verb);
		var verbEndIndex = verbStartIndex + verbData.verb.length;

		// GET WHATEVER THERE IS UNTIL THE VERB
		var nonVerbPhrase = currentParagraphData.paragraph.slice(lastFirstIndex, verbStartIndex);
		// GET THE VERB
		var verbPhrase = currentParagraphData.paragraph.slice(verbStartIndex, verbEndIndex);
		lastFirstIndex = verbEndIndex; // UPDATE NEXT NON-VERB INDEX START

		// ADD TO LIST
		paragraphSlicing.push(nonVerbPhrase);
		paragraphSlicing.push(verbPhrase);

		console.log(i + " : " + nonVerbPhrase);
		console.log(i + " : " + verbPhrase);

		// ALSO, ADD DEFAULT VALUES TO RESPONSES ARRAY
		userResponses.push("-");
	}

	// GET THE TAILING WORDS: EITHER ANOTHER PHRASE OR "."
	if (lastFirstIndex <= currentParagraphData.paragraph.length) {
		var tailPhrase = currentParagraphData.paragraph.slice(lastFirstIndex);
		paragraphSlicing.push(tailPhrase);
		console.log("TailPhrase : " + tailPhrase);
	}

	console.log("Original Paragraph: " + currentParagraphData.paragraph);

	console.log(paragraphSlicing);

	//-------------

	// NOW LETS WRAP THE VERBS WITH HTML TAGS

	var htmlParagraph = "<p>"; // OPEN PARAGRAPH
	var verbIndexInParagraph = 0;
	for (let i = 0; i < paragraphSlicing.length; i++) {
		const currentPhrase = paragraphSlicing[i];

		// CHECK IF IT IS A VERB
		let isVerb = false;
		for (let j = 0; j < currentParagraphData.verbs.length; j++) {
			if (currentPhrase.indexOf(currentParagraphData.verbs[j].verb) >= 0) {
				isVerb = true;
				break;
			}
		}

		if (isVerb) {
			// surround with tags
			let pre = "<span id='verb' data-position='" + verbIndexInParagraph + "'>";
			let post = "</span>"
			htmlParagraph += pre;
			htmlParagraph += currentPhrase;
			htmlParagraph += post;

			verbIndexInParagraph++;

		} else {
			// simply add currentPhrase to htmlParagraph
			htmlParagraph += currentPhrase;
		}
	}

	htmlParagraph += "</p>" // CLOSE PARAGRAPH

	console.log(htmlParagraph);

	// finaly add the HTMLize paragraph to the DOM
	$("#phraseText").html(htmlParagraph);


}

function bindTooltips() {

	var tempList = document.getElementById("tempsDisponibles").innerHTML;

	// tempList.each(function(){
	// 	$(this).bind("click"), function(){
	// 		console.log($(this).html())
	// 	}
	// });

	var verbSlots = $("#phraseText").find("span");
	verbSlots.each(function () {

		// BIND TO tippy TOOLTIP SYSTEM
		// get(0) PULLS THE NATIVE DOM ELEMENT FROM THE JQUERY ELEMENT (required by Tippy)
		// tippy STUFF IS LINKED ON THE HTML, AT THE BOTTOM
		$(this).data("tippy-content", "-")

		tippy($(this).get(0), {
			arrow: true,
			allowHTML: true,
			interactive: true,
			// content: document.getElementById("tempsDisponibles")
			content: tempList
		});

		// HOVER IN-OUT ACTIONS
		$(this).mouseenter(function (e) {
			//console.log("hover");
			$(this).removeClass("verbWord-unselected");
			$(this).addClass("verbWord-selected");

			// SET activeVerb from html data-position
			activeVerb = $(this).data("position");

		}).mouseleave(function (e) {
			$(this).removeClass("verbWord-selected");
			$(this).addClass("verbWord-unselected");


			// $(this).get(0)._tippy.setContent("HOLAAAAAA");
			// $(this).get(0)._tippy.show();
		});

	});

}
/*
function buildCurrentSet(count) {

	phraseSet = [];
	verbSet = [];
	atPhrase = 0;
	score = 0;
	updateProgressBar(atPhrase);

	// SELECTION, FOR NOW
	//var selection = generateRandomNonRepeatableNums(count, allPhrases.length);

	selectPhrasesByFilter(selectedConjugationFilters);

	for (var i = 0; i < phraseSet.length; i++) {

		var phraseData = phraseSet[i];

		// 	// BUILD PHRASE SET
		// 	const phraseData = allPhrases[selection[i]];
		// 	phraseSet.push(phraseData);

		// BUILD VERB SET
		verbLoop: // FOR break labels TO WORK, ONLY USE STANDARD FOR LOOPS
		for (var j = 0; j < allVerbs.length; j++) {
			const verbData = allVerbs[j];

			// CHECK INFINITIF
			if (verbData.infinitif == phraseData.infinitif) {

				// CHECK WHICH CONJUGATION
				for (var k = 0; k < verbData.conjugaisons.length; k++) {
					const conjugs = verbData.conjugaisons[k];

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

	putPhrase(atPhrase);



}
*/

function selectPhrasesByFilter(conjugationFilter) {

	// PRESELECT (by index (store the index, not the object) ) ALL THAT MATCH THE FILTERS
	// APRES, WE WILL SELECT A BUNCH ONLY

	var preSelection = [];
	for (let i = 0; i < allPhrases.length; i++) {
		const currentPhrase = allPhrases[i];

		for (let j = 0; j < conjugationFilter.length; j++) {
			const currentFilter = conjugationFilter[j];

			if (currentPhrase.temp == currentFilter) {
				//console.log(currentPhrase);
				preSelection.push(i);
				break;
			}
		}
	}
	//console.log("-| PreSelection: " + preSelection);


	// NOW, WE SELECT A BUNCH
	//var setSelection = generateRandomNonRepeatableNums(phraseCount, preSelection.length);
	//var setSelection = generateRandomNonRepeatableNums(preSelection.length, preSelection.length);

	// SHUFFLE SELECTION
	var shuffled = shuffle(preSelection); // ONLY NEED TO PASS preSelection.length
	//console.log("-| Shuffled: " + shuffled);

	// TRIM THE FIRST {phraseCount} ELEMENTS
	var trimed = shuffled.slice(0, phraseCount);
	//console.log("-| Trimmed: " + trimed);

	// USE THE SHUFFLED INDEXES TO ADD THE PHRASES TO phraseSet
	for (let i = 0; i < trimed.length; i++) {
		phraseSet.push(allPhrases[trimed[i]]);
	}
	//console.log(phraseSet);


	// DONE

}

function shuffle(array) {
	// Fisher-Yates (aka Knuth) Shuffle algorithm
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function changeConjugationFilter(whichButton) {
	let filterInButton = whichButton.attr("data-db_code");

	// ADD/REMOVE FROM filterList
	let found = -1;
	// CHECK IF IT'S THERE AND RETURN INDEX
	for (let i = 0; i < selectedConjugationFilters.length; i++) {
		if (selectedConjugationFilters[i] == filterInButton) {
			found = i;
			break;
		}
	}
	// IF IT WAS FOUND && LIST.lenght IS NOT 1 => REMOVE FROM LIST
	if (found >= 0 && selectedConjugationFilters.length != 1) {
		selectedConjugationFilters.splice(found, 1);
		whichButton.removeClass("buttonOn");
		whichButton.addClass("buttonOff");
	} else {
		// IF IT IS NOT THE SAME THING THAT YOU ARE ADDING
		if (filterInButton != selectedConjugationFilters[found]) {
			selectedConjugationFilters.push(filterInButton);
			whichButton.removeClass("buttonOff");
			whichButton.addClass("buttonOn");
		}
	}

	//console.log(selectedConjugationFilters);

	//buildCurrentSet(phraseCount);
	reStart(phraseCount);
	//$("#playButton").hide();


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

	// TOOLTIP
	updateTooltip(phraseData.temp)


}

function checkAnswer() {
	var verbBox = $("#verbTextBox");

	if (verbBox.val() == "?") {
		// IF NOT KNOW, TYPE "?" TO GET THE ANSWER
		verbBox.val(verbBox.attr("data-conjugated"));
		score--;
	} else {
		// COMPARING DATA STORED IN ELEMENT
		if (verbBox.val().toLowerCase() == verbBox.attr("data-conjugated")) {
			// CORRECT..!!
			score++;
			console.log("Score: " + score);

			displayEmoji("correct");

			// TOOLTIP
			tooltip.tooltip("hide");

			// FADE OUT
			$("#phraseText").animate({
				opacity: 0.0,
				//left: "+=50",
				//height: "toggle"
			}, 500, function () {
				putNextPhrase();
			});
		} else {
			// INCORRECT

			//DISPLAY FUNNY EMOJI
			displayEmoji("incorrect");

		}
	}
}

function putNextPhrase() {

	atPhrase++;
	if (atPhrase < phraseSet.length) {
		putPhrase(atPhrase);

		// FADE IN
		fadeInPhrase();

		updateProgressBar(atPhrase);

	} else {
		$("#playButton").show();
		tooltip.tooltip("hide");
	}
}

function fadeInPhrase() {
	// FADE IN
	$("#phraseText").animate({
		opacity: 1.0,
		//left: "+=50",
		//height: "toggle"
	}, 500);
}

function updateProgressBar(phraseNum) {
	$("#progressBar").attr("style", "width:" + (((phraseNum + 1) / phraseCount) * 100) + "%")
	$("#scoreText").text(score + " bonnes réponses sur " + atPhrase);
}

function generateRandomNonRepeatableNums(count, max) {
	var random = [];
	for (var i = 0; i < count; i++) {
		var temp = Math.floor(Math.random() * max);
		if (random.indexOf(temp) == -1) {
			random.push(temp);
		}
		else
			i--;
	}
	return random;
	//console.log(random)
}

function displayEmoji(state) {

	var emojiList;

	if (state == "correct") {
		emojiList = $("#emojisCorrectList").children("li");
	} else {
		emojiList = $("#emojisIncorrectList").children("li");
	}

	var selectedEmoji = emojiList.eq(Math.floor(Math.random() * emojiList.length));

	var emoji = $("#emojiContainer");
	emoji.text(selectedEmoji.text());

	$("#emojiContainer").fadeIn(200, function () {
		//WHEN COMPLETED, fadeOut
		$("#emojiContainer").fadeOut(2000, function () {
		});
	});

}

function updateTooltip(text) {

	if (text == "passe compose") {
		text = "passé composé";
	}

	tooltip.attr("data-original-title", text);
	tooltip.tooltip("show");
}