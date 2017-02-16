'use strict';

// модуль, который экспортирует в глобальную область видимости функцию synchronizeFields.

var synchronizeFields = (function() {  
  function synchronizeFields(element1, element2, value1, value2, attribute2) {
    element1.addEventListener('change', function() {
      if (element1.value === value1) {
        element2[attribute2] = value2;
      }
    });
  };
  return synchronizeFields;
})();
