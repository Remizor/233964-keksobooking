'use strict';
// Функция должна показывать карточку выбранного отеля по нажатию на метку на карте

var showCard = function() {

  var onCardClose = null;

  window.pinMap.addEventListener('click', activatePinByClick);
  window.pinMap.addEventListener('keydown', activatePinByEnter);

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

    var activePinIndex = function(pin) {
      var i = 0;
      while( (pin = pin.previousSibling) != null )
        i++;
      return i;
    };

    window.updateDialogCardInfo(window.similarApartments[activePinIndex(pin.parentElement) - 3]);

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
}();

window.showCard = showCard;
