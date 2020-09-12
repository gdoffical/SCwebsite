try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var surveyTextarea = $('#Survey-textarea');
var instructions = $('#recording-instructions');
var surveyContent = '';



/*-----------------------------
      Voice Recognition
------------------------------*/

recognition.continuous = true;
recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};

recognition.onstart = function() {
  instructions.text('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('No speech was detected. Try again.');
  };
}



/*-----------------------------
      App buttons and input
------------------------------*/

$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});


$('#pause-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('Voice recognition paused.');
});

// Sync the text inside the text area with the noteContent variable.
noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

$('#submit-survey-btn').on('click', function(e) {
  recognition.stop();

  if(!noteContent.length) {
    instructions.text('Could not submit empty survey. Please answer the questions.');
  }
  else {
    surveyContent = '';
    surveyTextarea.val('');
    instructions.text('Survey sent successfully.');
  }

})


notesList.on('click', function(e) {
  e.preventDefault();
  var target = $(e.target);
  if(target.hasClass('listen-survey')) {
    var content = target.closest('.survey').find('.content').text();
    readOutLoud(content);
  }
});



/*-----------------------------
      Speech Synthesis
------------------------------*/

function readOutLoud(message) {
	var speech = new SpeechSynthesisUtterance();
	speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;

	window.speechSynthesis.speak(speech);
}


/*---------------------------------
      Time Zone Auto Detection
----------------------------------*/
