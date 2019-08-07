'use strict';

(function () {
  var main = document.querySelector('main');

  var renderStatusMessage = function (template) {
    var fragment = document.createDocumentFragment();
    var cloneTemplate = template.cloneNode(true);

    fragment.appendChild(cloneTemplate);
    main.appendChild(fragment);
  };

  var hideSuccessMessage = function () {
    var hideElem = main.querySelector('.success');

    main.removeChild(hideElem);

    document.removeEventListener('keydown', onSuccessEcsPress);
    document.removeEventListener('click', onSuccessDocumentClick);
  };

  var hideErrorMessage = function () {
    var hideElem = main.querySelector('.error');

    main.removeChild(hideElem);

    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', onErrorDocumentClick);
  };

  var onSuccessButtonClick = function () {
    hideSuccessMessage();
  };

  var onErrorButtonClick = function () {
    hideErrorMessage();
  };

  var onSuccessEcsPress = function (evt) {
    window.isEscEvent(evt, hideSuccessMessage);
  };

  var onErrorEscPress = function (evt) {
    window.isEscEvent(evt, hideErrorMessage);
  };

  var onSuccessDocumentClick = function () {
    hideSuccessMessage();
  };

  var onErrorDocumentClick = function () {
    hideErrorMessage();
  };

  window.backendMessage = {
    success: function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');

      renderStatusMessage(successTemplate);
      var successButton = document.querySelector('.success__button');

      successButton.addEventListener('click', onSuccessButtonClick);
      document.addEventListener('keydown', onSuccessEcsPress);
      document.addEventListener('click', onSuccessDocumentClick);
    },

    error: function () {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');

      renderStatusMessage(errorTemplate);
      var errorButtons = document.querySelector('.error__buttons');

      errorButtons.addEventListener('click', onErrorButtonClick);
      document.addEventListener('keydown', onErrorEscPress);
      document.addEventListener('click', onErrorDocumentClick);
    }
  };
})();
