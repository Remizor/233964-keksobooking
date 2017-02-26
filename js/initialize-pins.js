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
  var activeFilters = [];
  window.similarApartments = [];

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
  var pinsToShowList = [];
  var selectedFeatures = [];
  var activeFilters = {
    features: function(items) {
      if (selectedFeatures.length === 0) {
        return items;
      }

      return items.filter(function(item) {
        var contain = false;

        selectedFeatures.map(function(feature) {
          if (window.similarApartments[item].offer.features.indexOf(feature) > -1) {
            contain = true;
          }
        });

        return contain;
      });
    }
  };

  // for (var i = 0; i < filters.length; i++) {
  //   filters[i].addEventListener('change', activateFilter + i);
  //
  // };

  // var onFilterChange = function(event) {
  //
  // };

  filters[0].addEventListener('change', activateFilter0);

  filters[1].addEventListener('change', activateFilter1);

  filters[2].addEventListener('change', activateFilter2);

  filters[3].addEventListener('change', activateFilter3);

  document.querySelector('#housing_features').addEventListener('change', function(event) {
    console.log('change ', event.target.name, event.target.value);
    var value = event.target.value;
    var index = selectedFeatures.indexOf(value);

    if (index > -1) {
      selectedFeatures = [].concat(selectedFeatures.slice(0, index), selectedFeatures.slice(index + 1));
    } else {
      selectedFeatures.push(value);
    }

    console.log('selectedFeatures cahnge', selectedFeatures);

        showPins();
  });

  // filters.addEventListener('change', onFilterChange);

  function activateFilter0() {
    // скрытие всех пинов с карты
    // hideAllPins();

    // сравнение данных каждого пина и значения фильтра
    activeFilters.type = function(items) {
      return synchronizeFields_2(
        filters[0],
        ['any', 'flat', 'house', 'bungalo'],
        'type',
        filterByValue,
        items
      );
    };

    // отображение подходящих пинов, которые записаны в pinsToShowList
    showPins();
  };

  function activateFilter1() {
    // скрытие всех пинов с карты
    // hideAllPins();

    // сравнение данных каждого пина и значения фильтра
    activeFilters.price = function(items) {
      return synchronizeFields_2(
        filters[1],
        ['middle', 'low', 'high'],
        'price',
        filterByPrice,
        items
      );
    };

    // отображение подходящих пинов, которые записаны в pinsToShowList
    showPins();
  };

  function activateFilter2() {
    // скрытие всех пинов с карты
    // hideAllPins();

    // сравнение данных каждого пина и значения фильтра
    activeFilters.rooms = function(items) {
      return synchronizeFields_2(
        filters[2],
        ['any', '1', '2', '3'],
        'rooms',
        filterByValue,
        items
      );
    };

    // отображение подходящих пинов, которые записаны в pinsToShowList
    showPins();
  };

  function activateFilter3() {
    // скрытие всех пинов с карты
    hideAllPins();

    // сравнение данных каждого пина и значения фильтра
    activeFilters.guests = function(items) {
      return synchronizeFields_2(
        filters[3],
        ['any', '1', '2'],
        'guests',
        filterByValue,
        items
      );
    };

    // отображение подходящих пинов, которые записаны в pinsToShowList
    showPins();
  };

  function filterProcess(activeFilters) {
    // console.log('filterProcess start');
    var filteredPins = [];
    var items = window.similarApartments.map(function(item, index) {
      return index;
    });

    Object.keys(activeFilters).map(function(fieldName) {
      // console.log('filter apply', activeFilters[fieldName]());
      console.log('filteredPins before', filteredPins);

      if (!fieldName) {
        return null;
      }

      if (filteredPins.length === 0) {
        filteredPins = activeFilters[fieldName](items);
      } else {
        filteredPins = activeFilters[fieldName](filteredPins);
      }
            console.log('filteredPins after', filteredPins, fieldName);
      // filteredPins = filteredPins.concat(activeFilters[fieldName](
      //   filteredPins.length === 0 ?
      //   items :
      //   filteredPins
      // ));
      // filteredPins.push(filterFunction());
    });

    // console.log('filter process return ', filteredPins);

    return filteredPins;
  }



  // вспомогательные функции
  function hideAllPins() {
    for (var i = 1; i < window.allPins.length; i++) {
      window.allPins[i].classList.add('invisible');
    };
  }

  function filterByValue(filter, parameter, items) {
    var filteredItems = [];
    // console.log('filter value '  + filter.value);
    for (var j = 0; j < items.length; j++) {
      var pinData = window.similarApartments[items[j]];

      if (typeof pinData === 'undefined') {
        continue;
      }

      if (filter.value === 'any') {
        filteredItems.push(items[j]);
      } else if (filter.value === String(pinData.offer[parameter])) {
        filteredItems.push(items[j]);
      };

    }

    return filteredItems;
    // console.log('pinsToShowList = ' + pinsToShowList);
  };
  function filterByFeature(filter, value, items) {
    var filteredItems = [];
    // console.log('filter value '  + filter.value);
    for (var j = 0; j < items.length; j++) {
      var pinData = window.similarApartments[items[j]];

      if (typeof pinData === 'undefined') {
        continue;
      }

      if (filter.features.indexOf(value) > -1) {
        filteredItems.push(items[j]);
      }
    }

    return filteredItems;
    // console.log('pinsToShowList = ' + pinsToShowList);
  };

  function filterByPrice(filter, parameter, items) {
    console.log('filterByPrice run');
    var filteredItems = [];

    for (var j = 0; j < items.length; j++) {
      var pinData = window.similarApartments[items[j]];
      var offerPrice = pinData.offer[parameter];

      // console.log(j + ' offerPrice = ' + offerPrice);
      // console.log('filter.value = ' + filter.value);
      // console.log('low?' + (offerPrice < 10000));
      // console.log('middle?' + (offerPrice > 10000 && offerPrice < 50000));
      // console.log('high?' + (offerPrice > 50000));


      if (filter.value === 'low') {
        if (offerPrice < 10000) {
          filteredItems.push(items[j]);
        }
      };

      if (filter.value === 'high') {
        if (offerPrice > 50000) {
          filteredItems.push(items[j]);
        }
      };

      if (filter.value === 'middle') {
        if (offerPrice > 10000 && offerPrice < 50000) {
          filteredItems.push(items[j]);
        }
      };
    };

    console.log('filter by price ', filteredItems);

    return filteredItems;
    // console.log('pinsToShowList = ' + pinsToShowList);
  };

  function showPins() {
    hideAllPins();

    var filteredItemsToShow = filterProcess(activeFilters);
    // console.log('===', filteredItemsToShow);

    // console.log('pinsToShowList at the end 2 = ' + pinsToShowList);
    for (var i = 0; i < filteredItemsToShow.length; i++) {
      if (typeof filteredItemsToShow[i] === 'undefined') {
        continue;
      }

      window.allPins[filteredItemsToShow[i] + 1].classList.remove('invisible');
    }
  };
})();
