'use strict';

(function () {
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var COLOR_WHITE = 'rgb(255, 255, 255)';
  var COLOR_BLACK = 'rgb(0, 0, 0)';
  var PLAYER_NAME = 'Вы';

  /**
   * Рисует облако
   * @param  {canvas.getContext} ctx  '2d'
   * @param  {number} x    Начальная координата x
   * @param  {number} y    Начальная координата y
   * @param  {number} width
   * @param  {number} height
   * @param  {string} color
   */
  function drawCloud(ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }

  /**
   * Выводит сообщение
   * @param  {canvas.getContext} ctx  '2d'
   * @param  {string} font
   * @param  {string} color
   * @param  {string} text
   * @param  {number} x    Начальная координата x
   * @param  {number} y       Начальная координата y
   */
  function typeMessage(ctx, font, color, text, x, y) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, x, y);
  }

  /**
   * Возвращает случайный оттенок синего цвета
   * @return {string}
   */
  function getRandomColorBlue() {
    return 'rgba(0, 0, 255, ' + (window.util.getRandomNumber(0, 1) + 0.1).toFixed(1) + ')';
  }

  /**
   * Рисует гистограмму
   * @param  {type} ctx   [description]
   * @param  {array} names  - Массив имен игроков
   * @param  {array} times  - Массив времени прохождения игры игроками
   */
  function drawHistogram(ctx, names, times) {
    var max = window.util.getMaxNumber(times);
    var histogramHeightMax = 150;
    var step = histogramHeightMax / max;
    var barWidth = 40;
    var indent = 90;
    var initialX = 150;
    var initialY = 250;
    var count = times.length;

    for (var i = 0; i < count; i++) {
      ctx.fillStyle = (names[i] === PLAYER_NAME) ? PLAYER_COLOR : getRandomColorBlue();
      ctx.fillRect(initialX + indent * i, initialY, barWidth, -step * times[i]);
      ctx.fillStyle = COLOR_BLACK;
      ctx.textBaseline = 'top';
      ctx.fillText(names[i], initialX + indent * i, initialY);
      ctx.fillText(Math.round(times[i]), initialX + indent * i, initialY - step * times[i] - 20);
    }
  }

  /**
   * Отображает канвас
   *  @param  {canvas.getContext} ctx  '2d'
   * @param  {array} names  - Массив имен игроков
   * @param  {array} times  - Массив времени прохождения игры игроками
   */
  window.renderStatistics = function (ctx, names, times) {
    drawCloud(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
    drawCloud(ctx, 100, 10, 420, 270, COLOR_WHITE);
    typeMessage(ctx, '16px PT Mono', COLOR_BLACK, 'Ура, вы победили!', 120, 40);
    typeMessage(ctx, '16px PT Mono', COLOR_BLACK, 'Список результатов:', 120, 60);
    drawHistogram(ctx, names, times);
  };
})();
