'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');
  var setupUserName = setup.querySelector('.setup-user-name');

  function popupEscPressHandler(evt) {
    window.util.isEscEvent(evt, function () {
      if (evt.target !== setupUserName) {
        closePopup();
      }
    });
  }

  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  }

  function closePopup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  }

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });


  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window. util.isEnterEvent(evt, closePopup);
  });

  setupSubmit.addEventListener('click', function () {
    if (setupUserName.checkValidity() === true) {
      closePopup();
    }
  });

  setupSubmit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  /**
   * Показывает блок похожих персонажей
   */
  setup.querySelector('.setup-similar').classList.remove('hidden');

  var dialogHandle = setup.querySelector('.setup-user-pic');

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function MouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    function MouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    }

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  });
})();
