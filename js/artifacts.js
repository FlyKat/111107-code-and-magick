'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var artifactsShop = setup.querySelector('.setup-artifacts-shop');
  var artifactsBag = setup.querySelector('.setup-artifacts');
  var draggedItem = null;

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
