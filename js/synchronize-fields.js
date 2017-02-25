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

// var synchronizeFields_2 = (function() {
//   return function(element1, values1, parameter, syncFunction) {
//     // element1.addEventListener('change', changeValue_2);
//
//     console.log('im inside sync_2: values1 = ' + values1);
//
//     // function changeValue_2() {
//       for (var i = 0; i < values1.length; i++) {
//         if (element1.value === values1[i]) {
//           if (typeof syncFunction === 'function') {
//             syncFunction(element1, parameter);
//           }
//         }
//       }
//     // }
//   }
// })();
// window.synchronizeFields_2 = synchronizeFields_2;
