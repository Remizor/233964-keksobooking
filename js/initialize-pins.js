'use strict';

//  Модуль, который экспортирует в глобальную области видимости функцию initializePins. Функция должна содержать всю логику по отрисовке меток на карте: добавление обработчиков, показ и закрытие карточки, отметку метки как активной.

(function () {
  // Показ карточки объявления
  var allPins = document.querySelectorAll('.pin');
  var dialogCard = document.querySelector('.dialog');
  var dialogClose = document.querySelector('.dialog__close');
  var pinMap = document.querySelector('div.tokyo__pin-map');


  function activatePinByClick(event) {
    var target = event.target;
    console.log('click',event);
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
  }

  // Закрытие карточки объявления
  dialogClose.addEventListener('click', closeCard);

  function closeCard() {
    var activePins = document.querySelectorAll('.pin--active');
    for (var i = 0; i < allPins.length; i++) {
      if (activePins[i]) {
        activePins[i].classList.remove('pin--active');
      }
    }
    dialogCard.classList.add('invisible');
  }

  // Сделать сайт более доступным для людей с ограниченными возможностями
  makeARIADialog(dialogCard);
  setTabindex(dialogCard, allPins.length + 1);

  makeARIAButton(dialogClose);
  setTabindex(dialogClose, allPins.length + 2);

  var allPinsImg = document.querySelectorAll('div.pin img');

  for (var i = 0; i < allPinsImg.length; i++) {
    var pinImg = allPinsImg[i];
    makeARIAButton(pinImg);
    setTabindex(pinImg, i+1);
  }

  function toggleButton(element) {
    var pressed = (element.getAttribute("aria-pressed") === "true");
    element.setAttribute("aria-pressed", !pressed);
  }

   function handleBtnClick(event) {
    toggleButton(event.target);
  };

  function makeARIAButton(element) {
    element.setAttribute('role', 'button');
    element.setAttribute('aria-pressed', 'false');
    element.addEventListener('keydown', handleBtnClick);
  }

  function makeARIADialog(element) {
    element.setAttribute('role', 'dialog');
  }

  function setTabindex(element, tabindex) {
    element.setAttribute('tabindex', tabindex);
  }

  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  for (var i = 0; i < allPins.length; i++) {
    activatePinByEnter(allPins[i]);
  }

  function activatePinByEnter(event) {
    console.log('keydown', event);
    if (event.keyCode === ENTER_KEY_CODE) {
      var target = event.target;
      if (target.parentElement.className === 'pin') {
        activatePin(target);
      }
    }
  }

  document.addEventListener('keydown', closeByEsc);
  dialogClose.addEventListener('keydown', closeByEnter);

  function closeByEsc() {
    if (event.keyCode === ESC_KEY_CODE) {
      closeCard();
    }
  };

  function closeByEnter(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      closeCard();
    }
  };

  // Оптимизировать обработчики используя делегирование
  pinMap.addEventListener('click', activatePinByClick);
  pinMap.addEventListener('keydown', activatePinByEnter);
})();
