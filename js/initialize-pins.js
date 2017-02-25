'use strict';

//  Модуль, который экспортирует в глобальную области видимости функцию initializePins. Функция должна содержать всю логику по отрисовке меток на карте: добавление обработчиков, показ и закрытие карточки, отметку метки как активной.

function initializeElements() {
  window.allPins = document.querySelectorAll('.pin');
  window.dialogCard = document.querySelector('.dialog');
  window.dialogClose = document.querySelector('.dialog__close');
  window.allPinsImg = document.querySelectorAll('div.pin img');
  window.pinMap = document.querySelector('div.tokyo__pin-map');
};
initializeElements();

(function(){

  var similarApartments = [];

  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function(event) {
    try {
      window.similarApartments = JSON.parse(event.target.response);

      function clonePin(pinData) {
        var pinTemplate = document.querySelector('#pin-template');
        var pinToClone = pinTemplate.content.querySelector('.pin');
        var newPin = pinToClone.cloneNode(true);
        window.pinMap.appendChild(newPin);
      };

      function locatePin(newPin, pinData) {
        // location
        newPin.style.left = pinData.location.x + 'px';
        newPin.style.top = pinData.location.y + 'px';
        // avatar
        newPin.children[0].src = pinData.author.avatar;
      };

      for (var i = 0 ; i < window.similarApartments.length; i++) {
        clonePin();
        locatePin(pinMap.children[i+1], window.similarApartments[i]);
      }

    }
    catch(err) {
      console.log('Error! ' + err);
    }

    initializeElements();

  });
})();

window.updateDialogCardInfo = function(pinData) {
  // avatar
  document.querySelector(".dialog__title img").src = pinData.author.avatar;
  // dialog panel
  document.querySelector(".lodge__title").innerHTML = pinData.offer.title;
  document.querySelector(".lodge__address").innerHTML = pinData.offer.address;
  document.querySelector(".lodge__price").innerHTML = pinData.offer.price;
  document.querySelector(".lodge__type").innerHTML = pinData.offer.type;
  document.querySelector(".lodge__rooms-and-guests").innerHTML = (pinData.offer.rooms + ' комната(ы) для ' + pinData.offer.guests + ' гостя(ей)');
  document.querySelector(".lodge__checkin-time").innerHTML = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  document.querySelector(".lodge__description").innerHTML = pinData.offer.description;

  // Очистка существующих дочерних элементов
  function removeAllChildren(parent){
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    };
  };

  // Добавление фич
  removeAllChildren(document.querySelector(".lodge__features"));
  for (var i = 0; i < pinData.offer.features.length; i++) {
    document.querySelector(".lodge__features").insertAdjacentHTML('beforeend', '<span class="feature__image  feature__image--' + pinData.offer.features[i] + '"></span>');
  };

  // Добавление фотографий
  removeAllChildren(document.querySelector(".lodge__photos"));
  for (var i = 0; i < pinData.offer.photos.length; i++) {
    document.querySelector(".lodge__photos").insertAdjacentHTML('beforeend', '<img src="' + pinData.offer.photos[i] + '" alt="Lodge photo'+ i +'"  width="52" height="42">');
  };
};

function addkeyboardElements() {
  // Делает сайт более доступным для людей с ограниченными возможностями
  makeARIADialog(dialogCard);
  setTabindex(dialogCard, allPins.length + 1);

  makeARIAButton(dialogClose);
  setTabindex(dialogClose, allPins.length + 2);

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
};
window.addkeyboardElements = addkeyboardElements();

// Включение фильтров
(function() {
  var filters = document.querySelectorAll('.tokyo__filter');

  for (var i = 0; i < filters.length; i++) {
    filters[i].addEventListener('change', hideAllPins);
    filters[i].addEventListener('change', activateFilters);
  }

  function hideAllPins() {
    for (var i = 1; i < window.allPins.length; i++) {
      window.allPins[i].classList.add('invisible');
    };
  }



  function activateFilters() {
    console.log('activateFilters is working');

    var pinsToShowList = [];

    function synchronizeFields_2(element1, values1, parameter, syncFunction) {
      // console.log('im inside sync_2: values1 = ' + values1);

      for (var i = 0; i < values1.length; i++) {
        if (element1.value === values1[i]) {
          if (typeof syncFunction === 'function') {
            syncFunction(element1, parameter);
          }
        }
      }
    };


    function filterByValue(filter, parameter) {
      pinsToShowList = [];

      for (var j = 0; j < window.similarApartments.length; j++) {
        var pinData = window.similarApartments[j];

        if (filter.value === 'any') {
          pinsToShowList.push(j);
        };

        if (filter.value === String(pinData.offer[parameter])) {
          pinsToShowList.push(j);
        };

      }
      console.log('pinsToShowList = ' + pinsToShowList);

      (function showPins() {
        console.log('pinsToShowList at the end = ' + pinsToShowList);
        for (var i = 0; i < pinsToShowList.length; i++) {
          window.allPins[pinsToShowList[i] + 1].classList.remove('invisible');
        }
      })();

    };

    function filterByPrice(filter, parameter) {
      pinsToShowList = [];

      for (var j = 0; j < window.similarApartments.length; i++) {
        var pinData = window.similarApartments[j];
        var offerPrice = pinData.offer[parameter];

        if (filter.value === 'low') {
          if (offerPrice < 10000) {
            pinsToShowList.push(i);
          }
        };

        if (filter.value === 'high') {
          if (offerPrice > 50000) {
            pinsToShowList.push(i);
          }
        };

        if (filter.value === 'middle') {
          if (offerPrice > 10000 && offerPrice < 50000) {
            pinsToShowList.push(i);
          }
        };
      };
      console.log('pinsToShowList = ' + pinsToShowList);

      (function showPins() {
        console.log('pinsToShowList at the end = ' + pinsToShowList);
        for (var i = 0; i < pinsToShowList.length; i++) {
          window.allPins[pinsToShowList[i] + 1].classList.remove('invisible');
        }
      })();

    };

    synchronizeFields_2(filters[0], ['any', 'flat', 'house', 'bungalo'], 'type', filterByValue)();

    synchronizeFields_2(filters[1], ['middle', 'low', 'hight'], 'price', filterByPrice)();

    synchronizeFields_2(filters[2], ['any', '1', '2', '3'], 'rooms', filterByValue)();

    synchronizeFields_2(filters[3], ['any', '1', '2'], 'guests', filterByValue)();

  };
})();
