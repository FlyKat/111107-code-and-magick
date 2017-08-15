'use strict';

window.renderStatistics = function (ctx, names, times) {

  function drawCloud (ctx, X, Y, width, height, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(X, Y, width, height);
    ctx.closePath();
    ctx.stroke;
    ctx.fill();
  }

  drawCloud(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  drawCloud(ctx, 100, 10, 420, 270, 'rgb(255, 255, 255)');

  function typeMessage(ctx, font, color, text, X, Y) {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.fillText(text, X, Y);
  }

  typeMessage(ctx, '16px PT Mono', 'rgb(0, 0, 0)', 'Ура, вы победили!', 120, 40);
  typeMessage(ctx, '16px PT Mono', 'rgb(0, 0, 0)', 'Список результатов:', 120, 60);

  function getMaxNumber(arr) {
    return Math.max.apply(null, arr)
  }

  function getRandomNumber() {
    return +Math.random().toFixed(1);
  }

  function drawHistogram() {
    var max = getMaxNumber(times);
    var histogramHeight = 150;
    var step = histogramHeight / max;
    var barWidth = 40;
    var indent = 90;
    var initialX = 150;
    var initialY = 250;

    for(var i = 0; i < times.length; i++) {

    //names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 0, 255, getRandomNumber())'
    //names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 0, 255, +Math.random().toFixed(1))';
      names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';

      ctx.fillRect(initialX + indent * i, initialY, barWidth, -step * times[i]);
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.textBaseline = 'top';
      ctx.fillText(names[i], initialX + indent * i, initialY);
      ctx.fillText(Math.round(times[i]), initialX + indent * i, initialY - step * times[i] - 20);
    }

  }

  drawHistogram();

};
