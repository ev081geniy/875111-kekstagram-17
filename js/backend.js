'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };
  var OK_CODE = 200;
  var TIMEOUT = 10000;

  var makeXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = makeXhr(onSuccess, onError);

      xhr.open('GET', Url.LOAD);
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = makeXhr(onSuccess, onError);

      xhr.open('POST', Url.UPLOAD);
      xhr.send(data);
    }
  };
})();
