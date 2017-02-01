'use strict';

// Показ карточки объявления
var allPins = document.querySelectorAll('.pin');
var dialogCard = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

function activatePin(thePin) {
  thePin.addEventListener('click', function() {
    var activePins = document.querySelectorAll('.pin--active');
    for (var i = 0; i < activePins.length; i++) {
      var activePin = activePins[i];
      activePin.classList.remove('pin--active');
    };
    thePin.classList.add('pin--active');
    dialogCard.classList.remove('invisible');
  });
}

for (var i = 0; i < allPins.length; i++) {
  activatePin(allPins[i]);
}

// Закрытие карточки объявления
dialogClose.addEventListener('click', function() {
  var activePins = document.querySelectorAll('.pin--active');
  for (var i = 0; i < allPins.length; i++) {
    if (activePins[i]) {
      activePins[i].classList.remove('pin--active');
    }
  }
  dialogCard.classList.add('invisible');
});

// Проверка правильности введенных данных
// Заголовок объявления
var formTitle = document.querySelector('#title');
  // Обязательное поле
formTitle.setAttribute('required', '');
// Минимальная длина — 30 символов
formTitle.setAttribute('minlength', 30);
// Маскимальная длина — 100 символов
formTitle.setAttribute('maxlength', 100);

// Цена за ночь
var formPrice = document.querySelector('#price');
  // Обязательное поле
formPrice.setAttribute('required', '');
//   Числовое поле
formPrice.setAttribute('type', 'number');
//   Минимальное значение — 1000
formPrice.setAttribute('min', 1000);
//   Максимальное значение — 1 000 000
formPrice.setAttribute('max', 1000000);

// Адрес — обязательное поле
var formAddress = document.querySelector('#address');
formAddress.setAttribute('required', '');

// Автоматическая корректировка полей в форме
  // Поля «время заезда» и «время выезда» синхронизированы
var timeIn = document.querySelector('#time');
var timeOut = document.querySelector('#timeout');
var timeInOptions = document.querySelectorAll('#time option');
var timeOutOptions = document.querySelectorAll('#timeout option');
timeIn.addEventListener('change', changeTimeOut);
timeOut.addEventListener('change', changeTimeIn);

function changeTimeOut() {
  for (var j = 0; j < timeInOptions.length; j++) {
    if (timeIn.value === 'after-1' + (2 + j)) {
      timeOut.value = 'before-1' + (2 + j);
    }
  }
}

function changeTimeIn() {
  for (var j = 0; j < timeOutOptions.length; j++) {
    if (timeOut.value === 'before-1' + (2 + j)) {
      timeIn.value = 'after-1' + (2 + j);
    }
  }
}

// Значение поля «Тип жилья» синхронизировано с минимальной ценой
var type = document.querySelector('#type');
var typeOptions = document.querySelectorAll('#type option');
type.addEventListener('change', changeMinPrice);
function changeMinPrice() {
  var minPrice = 1000; // default for flat
  if (type.value === 'hut') {
    minPrice = 0;
  }
  if (type.value === 'palace') {
    minPrice = 10000;
  }
  formPrice.setAttribute('min', minPrice);
}

// Количество комнат связано с количеством гостей
var roomNumber = document.querySelector('#room_number');
var roomNumberOption = document.querySelectorAll('#room_number option');
var roomCapacity = document.querySelector('#capacity');
var roomCapacityOptions = document.querySelectorAll('#capacity option');
roomNumber.addEventListener('change', changeRoomCapacity);
function changeRoomCapacity() {
  for (var i = 0; i < roomCapacityOptions.length; i++) {
    roomCapacityOptions[i].removeAttribute('selected');
  }
  if (roomNumber.value === '1-room') {
    roomCapacityOptions[1].setAttribute('selected', '');
  }
  else {
    roomCapacityOptions[0].setAttribute('selected', '');
  }
}
