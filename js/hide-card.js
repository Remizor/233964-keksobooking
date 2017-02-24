'use strict';

// Закрытие карточки объявления
var hideCard = function(){
  // Для управления мышкой
  window.dialogClose.addEventListener('click', closeCard);

  function closeCard() {
    var activePins = document.querySelectorAll('.pin--active');
    for (var i = 0; i < allPins.length; i++) {
      if (activePins[i]) {
        activePins[i].classList.remove('pin--active');
      }
    }
    window.dialogCard.classList.add('invisible');

    if (typeof window.onCardClose === 'function') {
      window.onCardClose();
    }
  }

  // Для управления с клавиатуры
  document.addEventListener('keydown', closeByEsc);
  window.dialogClose.addEventListener('keydown', closeByEnter);

  function closeByEsc(event) {
    if (window.utils.escapePressed(event)) {
      closeCard();
    }
  };

  function closeByEnter(event) {
    if (window.utils.enterPressed(event)) {
      closeCard();
    }
  };

}();

window.hideCard = hideCard;
