'use strict';

(function () {
  var NEW_PHOTOS_COUNT = 10;

  window.filters = {
    filterPopular: function (array) {
      return array;
    },

    filterNew: function (array) {
      var copyArray = array.slice();
      var newArray = copyArray.
        sort(function () {
          return Math.random() - 0.5;
        }).slice(0, NEW_PHOTOS_COUNT);

      return newArray;
    },

    filterDiscussed: function (array) {
      var copyArray = array.slice();
      var newArray = copyArray.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });

      return newArray;
    }
  };
})();
