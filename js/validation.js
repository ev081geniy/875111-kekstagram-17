'use strict';

(function () {
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var HASHTAG_SYMBOL = '#';

  var inputHashtags = document.querySelector('.text__hashtags');

  window.validation = function () {
    var hashtags = inputHashtags.value.split(' ');
    var invalidities = [];

    if (hashtags.length > MAX_HASHTAGS) {
      invalidities.push('Нельзя указать больше пяти хэш-тегов.');
    }

    hashtags.forEach(function (item, i) {
      if (item[0] !== HASHTAG_SYMBOL && item !== '') {
        invalidities.push('Хэш-тег должен начинаеться с символа # (решётка).');
      } else if (item === HASHTAG_SYMBOL) {
        invalidities.push('Хэш-тег не может состоять только из одной решётки.');
      } else if (item.length > MAX_HASHTAG_LENGTH) {
        invalidities.push('Максимальная длина одного хэш-тега 20 символов, включая решётку.');
      } else if (hashtags.indexOf(item.toLowerCase()) !== i) {
        invalidities.push('Один и тот же хэш-тег не может быть использован дважды.');
      }
    });

    if (invalidities) {
      inputHashtags.setCustomValidity(invalidities.join(' '));
    } else {
      inputHashtags.setCustomValidity('');
    }
  };
})();
