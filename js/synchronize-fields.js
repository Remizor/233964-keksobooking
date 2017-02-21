'use strict';

// модуль, который экспортирует в глобальную область видимости функцию synchronizeFields.

var synchronizeFields = (function() {
  return function(element1, element2, values1, values2, syncFunction) {
    element1.addEventListener('change', changeValue);

    function changeValue() {
      for (var i = 0; i < values1.length; i++) {
        if (element1.value === values1[i]) {

          if (typeof syncFunction === 'function') {
            syncFunction(element2, values2[i]);
          }

        }
      }
    }
    
  }
})();

window.synchronizeFields = synchronizeFields;
