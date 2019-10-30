// import tippy from 'node_modules/tippy.js/dist/tippy-bundle.iife.js';
//import 'node_modules/tippy.js/dist/tippy.css';

// all IS THE WHOLE DB
// xxSet ARE THE SET OF PHRASES AND VERBS THAT ARE BEING USED CURRENTLY (A SET OF 10, FOR EXAMPLE)

//var phraseCount = 20;
//var atPhrase = 0;
//var score = 0;

var tooltip; // DELETE, THIS IS THE OLD TOOLTIP LIB

var selectedConjugationFilters = ["present"];

var tempList;
var currentParagraphData;
var activeVerb = -1;
var userResponses = [];

//console.log(allPhrases);

$(document).ready(function () {

	bindGlobalStuff();
	reStart();


});

function bindGlobalStuff() {


	// $('.dropdown-toggle').dropdown();

	// PRESSING THE ENTER KEY ON TEXTBOX
	/*
	$("#verbTextBox").on('keypress', function (e) {
		//console.log("something pressed");
		if (e.which === 13) { // 13 = enter KEY
			checkAnswer();
		}
	});
	*/

	$("#playButton").on("mousedown", function () {
		reStart();
	});

	$("#buttonImparfait").on("mousedown", function () {
		changeConjugationFilter($(this));
	});
	$("#buttonPasseCompose").on("mousedown", function () {
		changeConjugationFilter($(this));
	});
	$("#buttonPresent").on("mousedown", function () {
		changeConjugationFilter($(this));
	});
	$("#buttonFuturProche").on("mousedown", function () {
		changeConjugationFilter($(this));
	});
	$("#buttonFuturSimple").on("mousedown", function () {
		changeConjugationFilter($(this));
	});

	// GET RAW TEMPS LIST (WITH FUNCTION CALLS) TO LATER MODIFY AND INJECT
	// WHEN USER SELECTS SOMETHING
	tempList = document.getElementById("tempsDisponibles").innerHTML;


}

function reStart() {

	buildParagraph(selectParagraphByFilter());
	bindTooltips();
	updateProgressBar(0,userResponses.length);

	$("#playButton").hide();
}

function selectParagraphByFilter() {

	var allParagraphs = paragraphs;

	// preSelect only the paragraphs that have verbs temps within the global filters
	var filteredParagraphs = [];
	for (let i = 0; i < allParagraphs.length; i++) {
		const thisVerbs = allParagraphs[i].verbs;

		// FOR ALL VERBS IN PARAGRAPH
		paragraphLoop:
		for (let j = 0; j < thisVerbs.length; j++) {
			// FOR ALL SELECTED TEMP FILTERS
			for (let k = 0; k < selectedConjugationFilters.length; k++) {
				// IF IT FINDS MATCHING TEMPS, ADD THE PARAGRAPH TO filteredParagraphs
				if (thisVerbs[j].temp == selectedConjugationFilters[k]) {
					filteredParagraphs.push(allParagraphs[i]);
					break paragraphLoop;
				}
			}
		}
	}

	console.log(filteredParagraphs);

	let rand = Math.floor(Math.random() * filteredParagraphs.length);

	//TODO: need to work on this a little bit more
	// let finalFilter = removeNonSelectedTempsFromParagraph(filteredParagraphs[rand]);

	return filteredParagraphs[rand];

}

function removeNonSelectedTempsFromParagraph(paragraph) {

	//FIXME:
	var paragraphCopy = JSON.parse(JSON.stringify(paragraph));
	for (let i = 0; i < paragraphCopy.verbs.length; i++) {

		var thisTemp = paragraphCopy.verbs[i].temp;
		var exist = false;

		for (let j = 0; j < selectedConjugationFilters.length; j++) {
			if (thisTemp == selectedConjugationFilters[j]) {
				exist = true;
				break;
			}
		}

		if (!exist) {

		}

	}

}

function buildParagraph(paragraph) {

	//currentParagraphData = paragraphs[which];
	currentParagraphData = paragraph;
	userResponses = [];
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

		//console.log(i + " : " + nonVerbPhrase);
		//console.log(i + " : " + verbPhrase);

		// ALSO, ADD DEFAULT VALUES TO RESPONSES ARRAY
		userResponses.push("-");
	}

	// GET THE TAILING WORDS: EITHER ANOTHER PHRASE OR "."
	if (lastFirstIndex <= currentParagraphData.paragraph.length) {
		var tailPhrase = currentParagraphData.paragraph.slice(lastFirstIndex);
		paragraphSlicing.push(tailPhrase);
		//console.log("TailPhrase : " + tailPhrase);
	}

	//console.log("Original Paragraph: " + currentParagraphData.paragraph);

	//console.log(paragraphSlicing);

	//-------------

	// NOW LETS WRAP THE VERBS WITH HTML TAGS

	var htmlParagraph = "<p>"; // OPEN PARAGRAPH
	//var htmlParagraph = "";
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

	$("#phraseText").html(htmlParagraph);

	//console.log(htmlParagraph);

	// FADE OUT/IN PARAGRAPHS (A <p> should be the first-child of #phraseText)
	// var text = $("#phraseText:first-child")
	// text.fadeOut(500, function () {
	// 	text.html(htmlParagraph);
	// 	text.fadeIn(500)
	// });

}

function bindTooltips() {

	//var tempList = document.getElementById("tempsDisponibles").innerHTML;

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
	reStart();
	//$("#playButton").hide();


}


function chooseTemp(whichTemp) {
	console.log(whichTemp);

	var whichTempToString = "-";

	switch (whichTemp) {
		case 0:
			whichTempToString = "imparfait";
			break;
		case 1:
			whichTempToString = "passe compose";
			break;
		case 2:
			whichTempToString = "present";
			break;
		case 3:
			whichTempToString = "futur proche";
			break;
		case 4:
			whichTempToString = "futur simple";
			break;
		default:
			whichTempToString = "-";
			break;
	}

	// SAVE USER RESPONSE
	userResponses[activeVerb] = whichTempToString;

	// BASED ON RAW tempList, MODIFY THE li TO REFLECT SELECTION
	var tempHighlighted = $(tempList);
	tempHighlighted.find("li").eq(whichTemp).css({ "background-color": "#748282" });

	// UPDATE THE TOOLTIP CONTENT TO SHOW THE SELECTED OPTION
	var verbSlots = $("#phraseText").find("span");
	var toolTipRegularDOM = $(verbSlots[activeVerb]).get(0);
	toolTipRegularDOM._tippy.setContent(tempHighlighted.get(0));
	//toolTipRegularDOM._tippy.setProps({ interactive: true });
	//toolTipRegularDOM._tippy.enable();
	// toolTipRegularDOM._tippy.show();

	updateProgress();
}

function checkAnswers() {

	var score = 0;
	for (let i = 0; i < currentParagraphData.verbs.length; i++) {
		if (currentParagraphData.verbs[i].temp == userResponses[i]) {
			score++;
		}
	}

	$("#scoreText").text(score + " bonnes réponses sur " + userResponses.length + " ( " + Math.ceil((score / userResponses.length) * 100) + "% )");

	console.log("Score: " + score);

	showResultsOnText();

}

function showResultsOnText() {

	var verbSlots = $("#phraseText").find("span");

	// COLOR HIGHLIGHT THE IN/CORRECT ANSWERS
	for (let i = 0; i < userResponses.length; i++) {

		if (userResponses[i] == currentParagraphData.verbs[i].temp) {
			verbSlots.eq(i).css({ "color": "green" });
		} else {
			verbSlots.eq(i).css({ "color": "red" });
		}

		// CHANGE CONTENT OF TOOLTIPS TO SHOW CORRECT ANSWERS
		var toolTipRegularDOM = $(verbSlots[i]).get(0);
		toolTipRegularDOM._tippy.setContent(currentParagraphData.verbs[i].temp);
		toolTipRegularDOM._tippy.show();
	}


	$("#playButton").fadeIn(500);

}

/*
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
*/

function updateProgress() {

	// CHECK WHICH ONES WERE ANSWERED. "-" MEANS NO ANSWER
	let answered = 0;
	for (let i = 0; i < userResponses.length; i++) {
		if (userResponses[i] != "-") {
			answered++;
		}
	}

	updateProgressBar(answered, userResponses.length);

	// IF FINISHED
	if (answered == userResponses.length) {
		checkAnswers();
	}
}
function updateProgressBar(progress, total) {

	$("#progressBar").attr("style", "width:" + (((progress) / total) * 100) + "%")
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