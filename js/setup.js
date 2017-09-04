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
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  /**
   * Заполняет блок DOM-элементами на основе массива JS-объектов
   * @return {type} DocumentFragment
   */
  function renderWizards() {
    var fragment = document.createDocumentFragment();
    var count = wizards.length;

    for (var i = 0; i < count; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    return fragment;
  }

  function fillElement(elem, color) {
    elem.style.fill = color;
  }

  function changeElementBackground(elem, color) {
    elem.style.backgroundColor = color;
  }

  window.colorizeElement(wizardCoat, WIZARD_PARAMS.coatColors, fillElement);

  window.colorizeElement(wizardEyes, WIZARD_PARAMS.eyesColors, fillElement);

  window.colorizeElement(fireball, WIZARD_PARAMS.fireballColors, changeElementBackground);

  /**
   *Отрисовывает похожих персонажей во временном блоке DocumentFragment
   */
  renderWizards();

  /**
   * Отрисовывает похожих персонажей (заполняет блок similarListElement DOM-элементами из DocumentFragment)
   */
  similarListElement.appendChild(renderWizards());

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

  artifactsShop.addEventListener('dragstart', dragstartHandler);
  artifactsBag.addEventListener('dragover', dragovertHandler);
  artifactsBag.addEventListener('drop', dropHandler);
  artifactsBag.addEventListener('dragenter', dragenterHandler);
  artifactsBag.addEventListener('dragleave', dragleaveHandler);
  artifactsBag.addEventListener('dragend', dragendHandler);
})();
