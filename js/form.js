'use strict';

initializePins();

var formTitle = document.querySelector('#title');
var formAddress = document.querySelector('#address');
var timeIn = document.querySelector('#time');
var timeOut = document.querySelector('#timeout');
var type = document.querySelector('#type');
var formPrice = document.querySelector('#price');
var roomCapacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');

// Проверка правильности введенных данных
formTitle.setAttribute('required', '');
formTitle.setAttribute('minlength', 30);
formTitle.setAttribute('maxlength', 100);

// Цена за ночь
formPrice.setAttribute('required', '');
formPrice.setAttribute('type', 'number');
formPrice.setAttribute('min', 1000);
formPrice.setAttribute('max', 1000000);

// Адрес — обязательное поле
formAddress.setAttribute('required', '');

// Поля «время заезда» и «время выезда» синхронизированы
synchronizeFields(timeIn, timeOut, 'after-12', 'before-12', 'value');
synchronizeFields(timeIn, timeOut, 'after-13', 'before-13', 'value');
synchronizeFields(timeIn, timeOut, 'after-14', 'before-14', 'value');

synchronizeFields(timeOut, timeIn, 'before-12', 'after-12', 'value');
synchronizeFields(timeOut, timeIn, 'before-13', 'after-13', 'value');
synchronizeFields(timeOut, timeIn, 'before-14', 'after-14', 'value');

// Значение поля «Тип жилья» синхронизировано с минимальной ценой
synchronizeFields(type, formPrice, 'flat', 1000, 'min');
synchronizeFields(type, formPrice, 'hut', 0, 'min');
synchronizeFields(type, formPrice, 'palace', 10000, 'min');

// Количество комнат связано с количеством гостей
synchronizeFields(roomNumber, roomCapacity, '1-room', 'no-guests', 'value');
synchronizeFields(roomNumber, roomCapacity, '2-rooms', '3-guests', 'value');
synchronizeFields(roomNumber, roomCapacity, '100-rooms', '3-guests', 'value');
