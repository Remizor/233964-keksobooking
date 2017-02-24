'use strict';

window.load = function(dataURL, onLoad) {
  var data = [];
  var xhr = new XMLHttpRequest();

  xhr.open('GET', dataURL);
  xhr.addEventListener('readystatechange', function(evt) {

    switch (evt.target.readyState) {
      case 0:
        console.log('Status: not sent');
        break;

      case 1:
        console.log('Status: opened');
        break;

      case 2:
        console.log('Status: headers recieved');
        break;

      case 3:
        console.log('Status: loading');
        break;

      case 4:
        console.log('Status: loaded');
    };
  })

  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('load', window.addkeyboardElements);

  xhr.addEventListener('error', function() {
    alert('Something\'s went wrong');
  });

  xhr.timeout = 50000;
  xhr.addEventListener('timeout', function() {
    alert('Time\'s up!');
  });

  xhr.send();
};
