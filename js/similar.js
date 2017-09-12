'use strict';

(function () {
  var wizards = [];
  var coatColor;
  var eyesColor;

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updateWizards() {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  window.wizard.eyesChangeHandler = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  window.wizard.coatChangeHandler = function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  };

  function loadHandler(data) {
    wizards = data;
    updateWizards();
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
})();
