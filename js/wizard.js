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

  var setup = document.querySelector('.setup');
  var wizardSetup = setup.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');

  var wizard = {
    coatChangeHandler: function (color) {},
    eyesChangeHandler: function (color) {}
  }

  var newColor;

  function fillElement(elem, color) {
    elem.style.fill = color;
    newColor = color;
  }

  function changeElementBackground(elem, color) {
    elem.style.backgroundColor = color;
  }

  function coatColorClickHandler() {
    window.colorizeElement(wizardCoat, WIZARD_PARAMS.coatColors, fillElement);
    wizard.coatChangeHandler(newColor);
  }

  function eyesColorClickHandler() {
    window.colorizeElement(wizardEyes, WIZARD_PARAMS.eyesColors, fillElement);
    wizard.eyesChangeHandler(newColor);
  }

  function fireballColorChangeHandler() {
    window.colorizeElement(fireball, WIZARD_PARAMS.fireballColors, changeElementBackground);
  }

  wizardCoat.addEventListener('click', coatColorClickHandler);
  wizardEyes.addEventListener('click', eyesColorClickHandler);
  fireball.addEventListener('click', fireballColorChangeHandler);

  window.wizard = wizard;
})();
