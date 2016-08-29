var textSpeed = 80;

var output = document.querySelector('.output');
var previewButton = document.querySelector('.previewButton');

var showText = function (target, message, index, interval, callback) {
  if (index < message.length) {
    target.innerHTML += message[index++];
    setTimeout(function () {
      showText(target, message, index, interval, callback);
    }, interval);
  } else {
    setTimeout(function() {
      callback();
    }, 350);
  }
};

var start = function() {
  document.querySelector('.startButton').addEventListener('click', function() {
    // hide box
    document.querySelector('.startBox').style.display = 'none';
    // animate in elements
    document.body.classList.add('animateIn');

    var backgroundMusic = document.querySelector('audio');
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();

    setTimeout(init, 1500);
  });
};

var init = function() {

  var synth = new Animalese('sounds/animalese.wav', function() {
    var say = function(input, callback) {
        var audio = new Audio();
        audio.src = synth.Animalese(input).dataURI;
        audio.volume = 0.8;
        audio.play();

        // clear the output container
        output.innerHTML = '';
        showText(output, input, 0, textSpeed, callback);
    }

    output.style.display = 'block';

    var textToSay = [
      'Hello there Anne! Here to wish you a great day!',
      'Oh! What\'s this... I have a message from your grandsons!',
      'Nick and Zac wish you a Happy Birthday and send their love.',
      'Well that\'s all from me for now... See you around!'
    ];

    say(textToSay[0], function() {
      say(textToSay[1], function() {
        say(textToSay[2], function() {
          say(textToSay[3], function() {
            var restartButton = document.querySelector('.restartButton');
            restartButton.addEventListener('click', function() {
              document.location.reload(true);
            });
            restartButton.style.display = 'block';
          });
        });
      });
    });

  });
};

document.addEventListener('DOMContentLoaded', start);
