'use strict';
// Функция должна показывать карточку выбранного отеля по нажатию на метку на карте

window.dialog = (function () {

  var dialogCard = document.querySelector('.dialog');
  var dialogClose = dialogCard.querySelector('.dialog__close');

  var showDialog = function (pinData) {
    // avatar
    document.querySelector('.dialog__title img').src = pinData.author.avatar;
    // dialog panel
    document.querySelector('.lodge__title').innerHTML = pinData.offer.title;
    document.querySelector('.lodge__address').innerHTML = pinData.offer.address;
    document.querySelector('.lodge__price').innerHTML = pinData.offer.price;
    document.querySelector('.lodge__type').innerHTML = pinData.offer.type;
    document.querySelector('.lodge__rooms-and-guests').innerHTML = (pinData.offer.rooms + ' комната(ы) для ' + pinData.offer.guests + ' гостя(ей)');
    document.querySelector('.lodge__checkin-time').innerHTML = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
    document.querySelector('.lodge__description').innerHTML = pinData.offer.description;

    // Очистка существующих дочерних элементов
    function removeAllChildren(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }

    // Добавление фич
    removeAllChildren(document.querySelector('.lodge__features'));
    for (var i = 0; i < pinData.offer.features.length; i++) {
      document.querySelector('.lodge__features').insertAdjacentHTML('beforeend', '<span class="feature__image  feature__image--' + pinData.offer.features[i] + '"></span>');
    }

    // Добавление фотографий
    removeAllChildren(document.querySelector('.lodge__photos'));
    for (var j = 0; j < pinData.offer.photos.length; j++) {
      document.querySelector('.lodge__photos').insertAdjacentHTML('beforeend', '<img src="' + pinData.offer.photos[j] + '" alt="Lodge photo"' + j + '"  width="52" height="42">');
    }

    dialogCard.classList.remove('invisible');
  };

  var closeDialogClickHandler = function () {
    dialogCard.classList.add('invisible');
  };

  var closeDialogKeyHandler = function (e) {
    if (window.utils.enterPressed(e)) {
      dialogCard.classList.add('invisible');
    }
  };

  dialogClose.addEventListener('click', closeDialogClickHandler);
  dialogClose.addEventListener('keydown', closeDialogKeyHandler);

  return {
    show: function (data, cb) {
      showDialog(data);
      dialogClose.addEventListener('keydown', function (e) {
        closeDialogKeyHandler(e);
        cb();
      });
    },
    close: closeDialogClickHandler
  };
})();
