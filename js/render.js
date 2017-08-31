'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardSetup = setup.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var WIZARD_PARAMS = window.data.WIZARD_PARAMS;
  var wizards = window.data.wizards;

  /**
   * Создаёт DOM-элемент на основе JS-объекта wizard
   * @param  {[object]} wizard
   * @return {[type]} DOM-элемент (Node)
   */
  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  /**
   * Заполняет блок DOM-элементами на основе массива JS-объектов
   * @return {[type]} DocumentFragment
   */
  function renderWizards() {
    var fragment = document.createDocumentFragment();
    var count = wizards.length;

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    return fragment;
  }

  function getWizardElementRandomColor(elem, arr) {
    elem.style.fill = window.util.getRandomElement(arr);
  }


  function getRandomFireballColor() {
    fireball.style.background = window.util.getRandomElement(WIZARD_PARAMS.fireballColors);
  }


  wizardCoat.addEventListener('click', function () {
    getWizardElementRandomColor(wizardCoat, WIZARD_PARAMS.coatColors);
  });

  wizardEyes.addEventListener('click', function () {
    getWizardElementRandomColor(wizardEyes, WIZARD_PARAMS.eyesColors);
  });

  fireball.addEventListener('click', function () {
    getRandomFireballColor();
  });

  /**
   *Отрисовывает похожих персонажей во временном блоке DocumentFragment
   */
  renderWizards();

  /**
   * Отрисовывает похожих персонажей (заполняет блок similarListElement DOM-элементами из DocumentFragment)
   */
  similarListElement.appendChild(renderWizards());

  window.render = {
    setup: setup,
  };
})();
