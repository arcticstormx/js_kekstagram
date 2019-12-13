'use strict';

(function(){
  let Url = {
    POST: 'https://js.dump.academy/kekstagram',
    GET: 'https://js.dump.academy/kekstagram/data'
  };

  var downloadData = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
      console.log(xhr);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  let uploadData = (data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.readyState === 2) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  let errorHandler = (errorMessage) => {
    const template = document.querySelector("#error").content.querySelector(".error");
    const main = document.querySelector("main");
    var node = template.cloneNode(true);
    main.appendChild(node);
  };

  window.back = {
    downloadData: downloadData,
    uploadData: uploadData,
    errorHandler: errorHandler
  };
})();
