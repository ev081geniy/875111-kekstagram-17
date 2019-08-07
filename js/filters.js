'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;

  window.filters = {
    filterPopular: function (array) {
      return array;
    },

    filterNew: function (array) {
      var newArray = array.
        slice(0, NEW_PHOTOS_COUNT).
        sort(function () {
          return Math.random() - 0.5;
        });

      return newArray;
    },

    filterDiscussed: function (array) {
      var newArray = array.
        slice().
        sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });

      return newArray;
    }
  };
})();
