'use strict';

(function () {
  // Количество комнат связано с количеством гостей
  var roomCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  // Проверка правильности введенных данных
  var formTitle = document.querySelector('#title');
  // Цена за ночь
  var formPrice = document.querySelector('#price');
  // Адрес — обязательное поле
  var formAddress = document.querySelector('#address');
  // Поля «время заезда» и «время выезда» синхронизированы
  var timeIn = document.querySelector('#time');
  var timeOut = document.querySelector('#timeout');
  // Значение поля «Тип жилья» синхронизировано с минимальной ценой
  var type = document.querySelector('#type');

  window.initializePins.pinLoad();

  formTitle.setAttribute('required', '');
  formTitle.setAttribute('minlength', 30);
  formTitle.setAttribute('maxlength', 100);

  formPrice.setAttribute('required', '');
  formPrice.setAttribute('type', 'number');
  formPrice.setAttribute('min', 1000);
  formPrice.setAttribute('max', 1000000);

  formAddress.setAttribute('required', '');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.placeholder = value;
  };

  window.synchronizeFields(timeIn, timeOut, ['after-12', 'after-13', 'after-14'], ['before-12', 'before-13', 'before-14'], syncValues);
  window.synchronizeFields(timeOut, timeIn, ['before-12', 'before-13', 'before-14'], ['after-12', 'after-13', 'after-14'], syncValues);

  window.synchronizeFields(type, formPrice, ['flat', 'hut', 'palace'], [1000, 0, 10000], syncValueWithMin);

  window.synchronizeFields(roomNumber, roomCapacity, ['1-room', '2-rooms', '100-rooms'], ['no-guests', '3-guests', '3-guests'], syncValues);
  window.synchronizeFields(roomCapacity, roomNumber, ['no-guests', '3-guests', '3-guests'], ['1-room', '2-rooms', '100-rooms'], syncValues);
})();
