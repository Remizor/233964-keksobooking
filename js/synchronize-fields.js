'use strict';

// модуль, который экспортирует в глобальную область видимости функцию synchronizeFields.

var synchronizeFields = function(element1, element2, values1, values2, syncFunction) {
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

window.synchronizeFields = synchronizeFields;

function synchronizeFields_2(filter, filterValues, parameter, syncFunction, items) {
  for (var i = 0; i < filterValues.length; i++) {

    if (filter.value === filterValues[i]) {
      if (typeof syncFunction === 'function') {
        return syncFunction(filter, parameter, items);
      }
    }

  }

};
window.synchronizeFields_2 = synchronizeFields_2;
