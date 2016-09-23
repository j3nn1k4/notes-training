var noteName = ["c", "d", "e", "f", "g", "a", "b"];
var selectNote;
var points = 0;

// Create an SVG renderer and attach it to the DIV element named "note".
var div = document.getElementById("note")
var renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);
renderer.resize(400, 100)

// Configure the rendering context.
var context = renderer.getContext();

createButtons();
printRandomNote();
showPoints();

/**
 * Diese Funktion erzeugt eine Random Note
 * Anschließend werden die Notenstriche generiert und die random Note dort angezeigt
 */
function printRandomNote() {
	var arrayNum = Math.floor(Math.random() * noteName.length);
	selectNote = noteName[arrayNum];

	context.clear();
	// Positioniert die Notenanzeige richtig und ermittelt die richtige Breite
	var stave = new Vex.Flow.Stave(0, 0, 100);

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
}



/**
 * Diese Funktion erstellt die Buttons, die die Klaviertastatur darstellen
 */
function createButtons(){
	for (var i = 0; i < noteName.length; i++) {
		var aNote = $('<button>')
			.attr('data-note', noteName[i])
			.text(noteName[i])
			.on('click', onNoteClick);

		$('#notes').append(aNote);
	}
}

/**
 * Funktion wird aufgerufen wenn auf die Note geclickt wird
 */
function onNoteClick(event){

	var note = event.target.dataset.note;

	if (note == selectNote){
		//Zähle Punktscore hoch
		points += 1;
		$('#result').text('Richtige Note gewählt!');

		
		// Zeige die nächste Note nach 2000ms an.
		setTimeout(function() {
			printRandomNote();
			$('#result').text('Wähle die richtige Note!');
			showPoints();
			
		}, 2000);
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
	$('#points').text(points);
}




