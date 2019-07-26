'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    randomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  };
})();
