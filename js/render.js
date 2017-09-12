'use strict';

(function () {
  var WIZARDS_AMOUNT = 4;
  var setup = document.querySelector('.setup');
  var similar = document.querySelector('.setup-similar');
  var similarList = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  /**
   * Создаёт DOM-элемент на основе JS-объекта wizard
   * @param  {object} wizard
   * @return {type} DOM-элемент (Node)
   */
  function renderWizard(wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function renderWizards(data) {
    var fragment = document.createDocumentFragment();
    var dataCount = data.length > WIZARDS_AMOUNT ? WIZARDS_AMOUNT : data.length;

    similarList.innerHTML = '';

    for (var i = 0; i < dataCount; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }

    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  }

  window.render = renderWizards;
})();
