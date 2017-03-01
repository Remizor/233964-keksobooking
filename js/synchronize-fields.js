'use strict';

// модуль, который экспортирует в глобальную область видимости функцию synchronizeFields.
window.synchronizeFields = (function () {
  return function (element1, element2, values1, values2, syncFunction) {
    element1.addEventListener('change', function () {
      var index1 = values1.indexOf(element1.value);
      syncFunction(element2, values2[index1]);
    });
  };
})();
