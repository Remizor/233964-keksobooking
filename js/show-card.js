'use strict';

var showCard = function() {
// Функция должна показывать карточку выбранного отеля по нажатию на метку на карте
  var onCardClose = null;

  pinMap.addEventListener('click', activatePinByClick);
  pinMap.addEventListener('keydown', activatePinByEnter);

  function activatePinByClick(event) {
    var target = event.target;
    if (target.parentElement.className === 'pin') {
      activatePin(target);
    }
  }

  function activatePin(pin) {
    var activePins = document.querySelectorAll('.pin--active');
    for (var i = 0; i < activePins.length; i++) {
      var activePin = activePins[i];
      activePin.classList.remove('pin--active');
    };
    pin.parentElement.classList.add('pin--active');
    dialogCard.classList.remove('invisible');

    return window.onCardClose = function() {
      pin.focus();
    }
  }

  for (var i = 0; i < allPins.length; i++) {
    activatePinByEnter(allPins[i]);
  }

  function activatePinByEnter(event) {
    if (window.utils.enterPressed(event)) {
      var target = event.target;
      if (target.parentElement.className === 'pin') {
        activatePin(target);
      }
    }
  }





// dialogClose.addEventListener('keydown', onKeyDown); //onKeyDown не прописано!
  // onCardClose = callback;
  // }

}();

window.showCard = showCard;

// (function() {
//     dialogCard.addEventListener('keydown', function(event) {
//       if (window.utils.enterPressed(event)) {
//         window.showCard(returnFocus);
//
//         function returnFocus() {
//           pin.focus();
//         };
//       }
//     });
// })();
