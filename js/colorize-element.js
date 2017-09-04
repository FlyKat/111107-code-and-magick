'use strict';

(function () {

  function colorizeElement(elem, arr, changeColor) {
    var color = window.util.getRandomElement(arr);
    changeColor(elem, color);
  }

  window.colorizeElement = colorizeElement;
})();
