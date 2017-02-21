'use strict';

(function () {
  // Проверка правильности введенных данных
  var formTitle = document.querySelector('#title');

  formTitle.setAttribute('required', '');
  formTitle.setAttribute('minlength', 30);
  formTitle.setAttribute('maxlength', 100);

  // Цена за ночь
  var formPrice = document.querySelector('#price');

  formPrice.setAttribute('required', '');
  formPrice.setAttribute('type', 'number');
  formPrice.setAttribute('min', 1000);
  formPrice.setAttribute('max', 1000000);

  // Адрес — обязательное поле
  var formAddress = document.querySelector('#address');

  formAddress.setAttribute('required', '');

  // Поля «время заезда» и «время выезда» синхронизированы
  var timeIn = document.querySelector('#time');
  var timeOut = document.querySelector('#timeout');

  function syncValues(element, value) {
    element.value = value;
  };

  synchronizeFields(timeIn, timeOut, ['after-12', 'after-13', 'after-14'], ['before-12', 'before-13', 'before-14'], syncValues);
  synchronizeFields(timeOut, timeIn, ['before-12', 'before-13', 'before-14'], ['after-12', 'after-13', 'after-14'], syncValues);

  // Значение поля «Тип жилья» синхронизировано с минимальной ценой
  var type = document.querySelector('#type');

  function syncValueWithMin(element, value) {
    element.min = value;
  };

  synchronizeFields(type, formPrice, ['flat', 'hut', 'palace'], [1000, 0, 10000], syncValueWithMin);

  // Количество комнат связано с количеством гостей
  var roomCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  synchronizeFields(roomNumber, roomCapacity, ['1-room', '2-rooms', '100-rooms'], ['no-guests', '3-guests', '3-guests'], syncValues);
})();
