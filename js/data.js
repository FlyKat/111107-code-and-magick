'use strict';

(function () {
  var WIZARD_PARAMS = {
    names: [
      'Иван',
      'Хуан Себастьян',
      'Мария', 'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    lastNames: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго', 'Ирвинг'
    ],
    coatColors: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    eyesColors: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],
    fireballColors: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  /**
   * Количество персонажей
   * @type {Number}
   */
  var WIZARDS_COUNT = 4;

  /**
   * Возвращает массив персонажей со случайными уникальными характеристиками
   * @return {array} wizards
   */
  function getWizards() {
    var wizards = [];

    var wizardsNames = window.util.shuffle(WIZARD_PARAMS.names);
    var wizardsLastNames = window.util.shuffle(WIZARD_PARAMS.lastNames);
    var coatsColors = window.util.shuffle(WIZARD_PARAMS.coatColors);
    var eyesColors = window.util.shuffle(WIZARD_PARAMS.eyesColors);

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizards[i] = {
        name: wizardsNames[i] + ' ' + wizardsLastNames[i],
        coatColor: coatsColors[i],
        eyesColor: eyesColors[i]
      };
    }

    return wizards;
  }

  window.data = {
    wizards: getWizards(),
    WIZARD_PARAMS: WIZARD_PARAMS
  };
})();
