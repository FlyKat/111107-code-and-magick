'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupAvatar = setup.querySelector('input[name="avatar"]');
  var dialogHandle = setup.querySelector('.upload');

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
    setup.style.top = '100px';
    setup.style.left = '50%';
  }

  function closePopup() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  }

  setupOpen.addEventListener('click', openPopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });


  setupClose.addEventListener('click', closePopup);

  setupClose.addEventListener('keydown', function (evt) {
    window. util.isEnterEvent(evt, closePopup);
  });

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupForm), function () {
      closePopup();
    });
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function MouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();
      setupAvatar.classList.add('hidden');

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
      setupAvatar.classList.remove('hidden');


      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    }

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  });
})();
