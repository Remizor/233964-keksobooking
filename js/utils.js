'use strict';

window.utils = (function() {
  var ENTER_KEY_CODE = 13;
  var ESCAPE_KEY_CODE = 27;

  var isKeyboardEvent = function(event) {
    return typeof event.keyCode !== 'undefined';
  };

  return {
    escapePressed: function(event) {
      return isKeyboardEvent(event) && event.keyCode === ESCAPE_KEY_CODE;
    },

    enterPressed: function(event) {
      return isKeyboardEvent(event) && event.keyCode === ENTER_KEY_CODE;
    },

    isKeyboardEvent: isKeyboardEvent
  }
})();
