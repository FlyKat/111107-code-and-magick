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

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];



/**
 * Количество персонажей
 * @type {Number}
 */
var WIZARDS_COUNT = 4;

/**
 * Находит и показывает панель настроек персонажа
 */
var setup = document.querySelector('.setup');


/**
 * Находит блок, в который будем вставлять похожих персонажей
 */
var similarListElement = setup.querySelector('.setup-similar-list');

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
 * Возвращает случайный элемент массива
 * @param  {[array]} arr
 * @return {[type]}
 */
function getRandomElement(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var element = arr[randomIndex];

  return element;
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

var KEYCODS = {
  esc : 27,
  enter: 13
}

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSubmit = setup.querySelector('.setup-submit');
var setupUserName   = setup.querySelector('.setup-user-name');
var wizardSetup = setup.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

function popupEscPressHandler(evt) {
  if (evt.keyCode === KEYCODS.esc && evt.target !== setupUserName) {
    closePopup();
  }
};

function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
}

function closePopup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
}

setupOpen.addEventListener('click', function() {
  openPopup();
});

setupOpen.addEventListener('keydown', function(evt) {
  if (evt.keyCode === KEYCODS.enter) {
    openPopup();
  }
});


setupClose.addEventListener('click', function() {
  closePopup();
});

setupClose.addEventListener('keydown', function(evt) {
  if (evt.keyCode === KEYCODS.enter) {
    closePopup();
  }
});

setupSubmit.addEventListener('click', function() {
  closePopup();
});

setupSubmit.addEventListener('keydown', function(evt) {
  if (evt.keyCode === KEYCODS.enter) {
    closePopup();
  }
});


wizardCoat.addEventListener('click', function() {
  wizardCoat.style.fill = getRandomElement(COAT_COLORS);
});

wizardEyes.addEventListener('click', function() {
  wizardEyes.style.fill = getRandomElement(EYES_COLORS);
});

fireball.addEventListener('click', function() {
  fireball.style.background = getRandomElement(FIREBALL_COLORS);
});


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
setup.querySelector('.setup-similar').classList.remove('hidden');
