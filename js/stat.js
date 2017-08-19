'use strict';

var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var COLOR_WHITE = 'rgb(255, 255, 255)';
var COLOR_BLACK = 'rgb(0, 0, 0)';
var PLAYER_NAME = 'Вы';


function drawCloud(ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function typeMessage(ctx, font, color, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
}

function getMaxNumber(arr) {
  return Math.max.apply(null, arr);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomColorBlue() {
  return 'rgba(0, 0, 255, ' + (getRandomNumber(0, 1) + 0.1).toFixed(1) + ')';
}

function drawHistogram(ctx, names, times) {

  var max = getMaxNumber(times);
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

window.renderStatistics = function (ctx, names, times) {

  drawCloud(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, 100, 10, 420, 270, COLOR_WHITE);
  typeMessage(ctx, '16px PT Mono', COLOR_BLACK, 'Ура, вы победили!', 120, 40);
  typeMessage(ctx, '16px PT Mono', COLOR_BLACK, 'Список результатов:', 120, 60);
  drawHistogram(ctx, names, times);

};
