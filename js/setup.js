'use strict';

var WIZARDS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария', 'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARDS_LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго', 'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

/**
 * Количество персонажей
 * @type {Number}
 */
var WIZARDS_COUNT = 4;

/**
 * Находит и показывает панель настроек персонажа
 */
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

/**
 * Находит блок, в который будем вставлять похожих персонажей
 */
var similarListElement = userDialog.querySelector('.setup-similar-list');

/**
 * Находит шаблон
 */
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

/**
 * Возвращает массив, перетасованный по алгоритму Фишера–Йейтса в варианте Дуршенфельда
 * @param  {[array]} arr
 * @return {[array]}
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
 * Возвращает массив персонажей со случайными уникальными характеристиками
 * @return {[array]} wizards
 */
function getWizards() {
  var wizards = [];

  var wizardsNames = shuffle(WIZARDS_NAMES);
  var wizardsLastNames = shuffle(WIZARDS_LAST_NAMES);
  var coatsColors = shuffle(COAT_COLORS);
  var eyesColors = shuffle(EYES_COLORS);

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards[i] = {
      name: wizardsNames[i] + ' ' + wizardsLastNames[i],
      coatColor: coatsColors[i],
      eyesColor: eyesColors[i]
    };
  }

  return wizards;
}


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
  var wizards = getWizards();
  var count = wizards.length;

  for (var i = 0; i < count; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  return fragment;
}

/**
 *Отрисовывает похожих персонажей во временном блоке DocumentFragment
 */
renderWizards();

/**
 * Отрисовывает похожих персонажей (заполняет блок similarListElement DOM-элементами из DocumentFragment)
 */
similarListElement.appendChild(renderWizards());

/**
 * Показывает блок похожих персонажей
 */
userDialog.querySelector('.setup-similar').classList.remove('hidden');
