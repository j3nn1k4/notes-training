var noteName = ["c", "d", "e", "f", "g", "a", "h"];
var selectNote;

createButtons();
printRandomNote();

/**
 * TODO
 */
function printRandomNote() {
	var arrayNum = Math.floor(Math.random() * noteName.length);
	selectNote = noteName[arrayNum];

	$('#note')
		.removeClass()
		.addClass('note')
		.addClass(selectNote + '-note');
}

/**
 * TODO
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
		$('#result').text('Richtige Note gewählt!');

		// Zeige die nächste Note nach 2000ms an.
		setTimeout(function() {
			printRandomNote();
			$('#result').text('Wähle die richtige Note');
		}, 2000);
	}
	else {
		$('#result').text('Viel Erfolg beim nächsten Mal!');
	}
}


//Array mit Notennamen, später Bilder oder sonstige Darstellung
//ich hab mehrere auswahlmöglichkeiten, später Klavíertastatur