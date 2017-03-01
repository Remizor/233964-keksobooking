'use strict';

//  Модуль, который экспортирует в глобальную области видимости функцию initializePins. Функция должна содержать всю логику по отрисовке меток на карте: добавление обработчиков, показ и закрытие карточки, отметку метки как активной.

window.initializePins = (function () {
  var filters = document.querySelector('.tokyo__filters');

  var pinMap = document.querySelector('.tokyo__pin-map');

  var pinTemplate = document.querySelector('#pin-template');
  var pinToClone = pinTemplate.content.querySelector('.pin');

  var similarApartments = [];
  var filteredApartments = [];

  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';

  var pinsRender = function (pinData) {
    pinData.forEach(function (pin) {
      var newPin = pinToClone.cloneNode(true);
      // location
      newPin.style.left = pin.location.x + 'px';
      newPin.style.top = pin.location.y + 'px';
      // avatar
      newPin.children[0].src = pin.author.avatar;
      newPin.tabIndex = '1';
      newPin.setAttribute('role', 'button');
      newPin.setAttribute('aria-pressed', 'false');
      newPin.data = pin;

      pinMap.appendChild(newPin);
    });
  };

  var pinLoad = function () {
    window.load(DATA_URL, function (data) {
      similarApartments = data;
      var firstThreeApartments = similarApartments.slice(0, 3);
      pinsRender(firstThreeApartments);
    });
  };

  function toggleButton(element) {
    var pressed = !(element.getAttribute('aria-pressed') === 'true');
    element.setAttribute('aria-pressed', pressed.toString());
  }

  function activatePin(pin) {
    var activePin = document.querySelector('.pin--active');
    if (activePin !== null) {
      activePin.classList.remove('pin--active');
      toggleButton(activePin);
    }

    pin.classList.add('pin--active');
    toggleButton(pin);

    window.dialog.show(pin.data, function () {
      pin.focus();
      pin.classList.remove('pin--active');
    });
  }

  function cleanMap() {
    var pins = pinMap.querySelectorAll('.pin');
    pins.forEach(function (i) {
      if (!i.classList.contains('pin__main')) {
        pinMap.removeChild(i);
      }
    });
    window.dialog.close();
  }

  var getActivePin = function (e) {
    var target = e.target.classList.contains('pin') ? e.target : e.target.parentElement;
    if (target.classList.contains('pin') && !(target.classList.contains('pin__main'))) {
      activatePin(target);
    }
  };

  var pinByEnterHandler = function (e) {
    if (window.utils.enterPressed(e)) {
      if (e.target.classList.contains('pin')) {
        getActivePin(e);
      }
    }
  };

  var pinByClickHandler = function (e) {
    getActivePin(e);
  };

  pinMap.addEventListener('click', pinByClickHandler);
  pinMap.addEventListener('keydown', pinByEnterHandler);

  // Перерисовка пинов по изменению в фильтрах
  filters.addEventListener('change', function () {
    cleanMap();
    filteredApartments = window.filterApartments(similarApartments);
    pinsRender(filteredApartments);
  });

  return {
    pinLoad: pinLoad
  };
})();
