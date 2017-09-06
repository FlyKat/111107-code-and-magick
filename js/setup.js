'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var similarList = document.querySelector('.setup-similar');
  var similarListElement = setup.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardSetup = setup.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var fireball = setup.querySelector('.setup-fireball-wrap');
  var WIZARD_PARAMS = window.data.WIZARD_PARAMS;
  var artifactsShop = setup.querySelector('.setup-artifacts-shop');
  var artifactsBag = setup.querySelector('.setup-artifacts');
  var draggedItem = null;

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

  function renderWizards(wizards) {
    var fragment = document.createDocumentFragment();
    var count = 4;

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  }

  function loadHandler(wizards) {
    renderWizards(wizards);
    similarList.classList.remove('hidden');
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');

    node.style.zIndex = '100';
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend.load(loadHandler, errorHandler);

  function fillElement(elem, color) {
    elem.style.fill = color;
  }

  function changeElementBackground(elem, color) {
    elem.style.backgroundColor = color;
  }

  function coatColorChangeHandler() {
    window.colorizeElement(wizardCoat, WIZARD_PARAMS.coatColors, fillElement);
  }

  function eyesColorChangeHandler() {
    window.colorizeElement(wizardEyes, WIZARD_PARAMS.eyesColors, fillElement);
  }

  function fireballColorChangeHandler() {
    window.colorizeElement(fireball, WIZARD_PARAMS.fireballColors, changeElementBackground);
  }

  function dragstartHandler(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsBag.style.outline = '2px dashed red';
    }
  }

  function dragovertHandler(evt) {
    evt.preventDefault();
    return false;
  }

  function dropHandler(evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  }

  function dragenterHandler(evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  }

  function dragleaveHandler(evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  }

  function dragendHandler(evt) {
    artifactsBag.style.outline = 'none';
    evt.preventDefault();
  }

  wizardCoat.addEventListener('click', coatColorChangeHandler);
  wizardEyes.addEventListener('click', eyesColorChangeHandler);
  fireball.addEventListener('click', fireballColorChangeHandler);

  artifactsShop.addEventListener('dragstart', dragstartHandler);
  artifactsBag.addEventListener('dragover', dragovertHandler);
  artifactsBag.addEventListener('drop', dropHandler);
  artifactsBag.addEventListener('dragenter', dragenterHandler);
  artifactsBag.addEventListener('dragleave', dragleaveHandler);
  artifactsBag.addEventListener('dragend', dragendHandler);
})();
