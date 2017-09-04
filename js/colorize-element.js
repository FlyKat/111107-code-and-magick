'use strict';

(function () {

  function colorizeElement(elem, arr, colorChangeHandler) {
    elem.addEventListener('click', function () {
      var color = window.util.getRandomElement(arr);
      colorChangeHandler(elem, color);
    });
  }

  window.colorizeElement = colorizeElement;
})();
