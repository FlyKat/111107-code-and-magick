'use strict';

(function () {
  var KEYCODS = {
    esc: 27,
    enter: 13
  };

  function isEscEvent(evt, action) {
    if (evt.keyCode === KEYCODS.esc) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === KEYCODS.enter) {
      action();
    }
  }

  /**
  * Возвращает массив, перетасованный по алгоритму Фишера–Йейтса в варианте Дуршенфельда
  * @param  {array} arr
  * @return {array}
  */
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[rand];
      arr[rand] = temp;
    }
    return arr;
  }

  /**
  * Возвращает случайный элемент массива
  * @param  {array} arr
  * @return {type}
  */
  function getRandomElement(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    var element = arr[randomIndex];

    return element;
  }

  /**
  * Возвращает максимальное число из массива
 * @param  {array} arr
 * @return {number}
 */
  function getMaxNumber(arr) {
    return Math.max.apply(null, arr);
  }

  /**
  * Возвращает случайное число в заданном диапазоне (не включая max)
  * @param  {number} min
  * @param  {number} max
  * @return {number}
  */
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    shuffle: shuffle,
    getRandomElement: getRandomElement,
    getMaxNumber: getMaxNumber,
    getRandomNumber: getRandomNumber
  };
})();
