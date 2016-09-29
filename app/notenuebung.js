var noteName = ["c", "d", "e", "f", "g", "a", "b"];
var selectNote;
var points = 0;
var previousNote;
var renderer;
var context;

// führe Initialisierung nach laden des gesamten Dokumentes durch
$(function() {
	initRenderer();
	createButtons(true);
	printRandomNote();
	showPoints();
	bindEventHandler();
	countToNewNote();
});

/**
 * Funktion führt das initiale Rendering für die Notenlinien aus
 */
function initRenderer() {
	// Create an SVG renderer and attach it to the DIV element named "note".
	var div = document.getElementById("note")
	renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
	renderer.resize(375, 100)

	// Configure the rendering context.
	context = renderer.getContext();
}

/**
 * Funktion verbindte die HTML Buttons mit dem Javascript Code
 */
function bindEventHandler() {
	$('#ctrlShowNotes').on('click', function() {
		console.log('zeige Noten');
		createButtons(true);
	});

	$('#ctrlHideNotes').on('click', function() {
		createButtons(false);
	});
}

/**
 * Diese Funktion erzeugt eine Random Note
 * Anschließend werden die Notenstriche generiert und die random Note dort angezeigt
 */
function printRandomNote() {

	var arrayNum = Math.floor(Math.random() * noteName.length);
		selectNote = noteName[arrayNum];

	if (selectNote == previousNote) {
		var arrayNum = Math.floor(Math.random() * noteName.length);
		selectNote = noteName[arrayNum];
		previousNote = selectNote;
		printRandomNote();
		$('#result').text('Wähle die richtige Note!');
	}
	else {
		countToNewNote();
		context.clear();
		$('#result').text('Wähle die richtige Note!');
		// Positioniert die Notenanzeige richtig und ermittelt die richtige Breite
		var stave = new Vex.Flow.Stave(130, 0, 100);

		// Add a clef and time signature.
		stave.addClef("treble").addTimeSignature("4/4");

		// Connect it to the rendering context and draw!
		stave.setContext(context).draw();

		var notes = [
		  // A quarter-note C.
		  new Vex.Flow.StaveNote({ keys: [selectNote + "/4"], duration: "w" }),

		];

		// Create a voice in 4/4 and add above notes
		var voice = new Vex.Flow.Voice({num_beats: 4,  beat_value: 4});
		voice.addTickables(notes);

		// Format and justify the notes to 400 pixels.
		var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 400);

		// Render voice
		voice.draw(context, stave);
		previousNote = selectNote
	}
}

/**
 * Diese Funktion erstellt die Buttons, die die Klaviertastatur darstellen
 */
function createButtons(showNotes) {

	// Lösche alle direkten Kind-Elemente in notes von Typ Button
	$('#notes > button').remove();

	for (var i = 0; i < noteName.length; i++) {
		var $noteButton = $('<button>')
			.attr('data-note', noteName[i])
			.on('click', onNoteClick);

		if(showNotes) {
			$noteButton.text(noteName[i]);
		}

		$('#notes').append($noteButton);	
	}
}

/**
 * Countdown bis zur nächsten Note
 */
 function countToNewNote(){
	var counter = 10;
	var newElement = document.createElement("p");
	var newElement = document.createElement("p");
	newElement.innerHTML = "You can download the file in 10 seconds.";
	var id;

	id = setInterval(function() {
	    counter--;
	    if(counter < 0) {
	        clearInterval(id);
	        printRandomNote();
	    } else {
	        $('#test').text("Wähle eine Note in  " + counter.toString() + " Sekunden.");
	    }
		}, 1000);
}
/**
 * Funktion wird aufgerufen wenn auf die Note geclickt wird
 */
function onNoteClick(event){

	var note = event.target.dataset.note;

	if (note == selectNote){
		//Zähle Punktscore hoch
		points += 1;
		showPoints();
		$('#result').text('Richtige Note gewählt!');

		
		// Zeige die nächste Note nach 1500ms an.
		setTimeout(function() {
			printRandomNote();
			$('#result').text('Wähle die richtige Note!');			
		}, 1500);
	}
	else {
		$('#result').text('Viel Erfolg beim nächsten Mal!');
		points -= 1;
		showPoints();
	}
}

/**
 * Funktion wird aufgerufen wenn auf die Note geclickt wird
 */
function showPoints() {
	$('#points').html("Deine aktuelle Punktzahl ist: </br>" + points);
}
