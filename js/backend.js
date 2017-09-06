'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/code-and-magick';

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  }


  function save(data, onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  window.backend = {
    save: save,
    load: load
  };
})();
