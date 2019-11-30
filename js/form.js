'use strict';

(function () {
  var effectLevelPin = document.querySelector(".effect-level__pin");
  var effectLevelValue = document.querySelector(".effect-level__value");
  var imgUploadPreview = document.querySelector(".img-upload__preview");
  var imgUploadPreviewClose = document.querySelector(".img-upload__cancel");
  var imgUploadSubmit = document.querySelector("#upload-submit");
  var uploadOverlay = document.querySelector(".img-upload__overlay");

  var effectsList = document.querySelector(".effects__list");
  var effectsLabels = effectsList.querySelectorAll(".effects__label");

  var effectsInputs = effectsList.querySelectorAll(".effects__radio");
  var effectCheckedInputValue = effectsList.querySelector(".effects__radio[checked]").value;

  var effectNoneInput = document.querySelector("#effect-none");
  var effectChromeInput = document.querySelector("#effect-chrome");
  var effectSepiaInput = document.querySelector("#effect-sepia");
  var effectMarvinInput = document.querySelector("#effect-marvin");
  var effectPhobosInput = document.querySelector("#effect-phobos");
  var effectHeatInput = document.querySelector("#effect-heat");

  var closeUploadOverlay = () => {
    uploadOverlay.classList.add("hidden");
    document.removeEventListener("keydown", onUploadOverlayEscPress);
  };

  var onUploadOverlayEscPress = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = () => {
    uploadOverlay.classList.remove("hidden");
    document.addEventListener("keydown", onUploadOverlayEscPress);
  };

  var onPressPreventSubmit = (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
      evt.preventDefault();
    }
  };

  var calculatePinValueInPercent = () => {
    var effectPinStyle = getComputedStyle(effectLevelPin);
    var effectPinCoordValue = +effectPinStyle.getPropertyValue("left").slice(0, -2) / 432;
    var effectPinCoordRounded = (Math.round(effectPinCoordValue * 100) / 100) * 100;
    return effectPinCoordRounded;
  };

  //Открытие фильтров при загрузке изображения
  uploadFile.addEventListener("change", (evt) => {
    if (!uploadOverlay.classList.contains("hidden")) {
      uploadFile.value = "";
    }
    openUploadOverlay();
  });
  //Закрытие блока с фильтрами
  imgUploadPreviewClose.addEventListener("click", (evt) => {
    closeUploadOverlay();
  });

  //Добавление каждому элементу массива лэйблов event listener
effectsLabels.forEach( (elem) => {
  elem.addEventListener("click", (evt) => {
    //Удаление checked аттрибута из старого элемента
    effectsInputs.forEach((item) => {
      if (item.hasAttribute("checked")) {
        item.removeAttribute("checked");
      }
    });

    //Рассчёт и передача value на слайдере
    effectLevelValue.value = calculatePinValueInPercent();

    //Если аттрибут кликнутого лэйбла совпадает с названием одного из фильтров, то
    switch (evt.currentTarget.getAttribute("for")) {
      case "effect-none":
        imgUploadPreview.setAttribute("style", "");
        break;

      case "effect-chrome":
        imgUploadPreview.setAttribute("style", "filter: " + "grayscale(" + effectLevelValue.value + "%)");
        effectChromeInput.setAttribute("checked","");
        break;

      case "effect-sepia":
        imgUploadPreview.setAttribute("style", "filter: " + "sepia(" + effectLevelValue.value + "%)");
        effectSepiaInput.setAttribute("checked","");
        break;

      case "effect-marvin":
        imgUploadPreview.setAttribute("style", "filter: " + "invert(" + effectLevelValue.value + "%)");
        effectMarvinInput.setAttribute("checked","");
        break;

      case "effect-phobos":
        imgUploadPreview.setAttribute("style", "filter: " + "blur(" + effectLevelValue.value / 100 * 3 + "px)");
        effectPhobosInput.setAttribute("checked","");
        break;

      case "effect-heat":
        imgUploadPreview.setAttribute("style", "filter: " + "brightness(" + ((effectLevelValue.value / 100 * 3) + 1) + ")");
        effectHeatInput.setAttribute("checked","");
        break;
    }
  });
});

effectsLabels.forEach( (elem) => {
  elem.addEventListener("keydown", (evt) => {
    if (evt.keyCode === ENTER_KEYCODE) {
      //Удаление checked аттрибута из старого элемента
      effectsInputs.forEach((item) => {
        if (item.hasAttribute("checked")) {
          item.removeAttribute("checked");
        }
      });

      //Рассчёт и передача value на слайдере
      effectLevelValue.value = calculatePinValueInPercent();

      //Если аттрибут кликнутого лэйбла совпадает с названием одного из фильтров, то
      switch (evt.currentTarget.getAttribute("for")) {
        case "effect-none":
          imgUploadPreview.setAttribute("style", "");
          break;

        case "effect-chrome":
          imgUploadPreview.setAttribute("style", "filter: " + "grayscale(" + effectLevelValue.value + "%)");
          effectChromeInput.setAttribute("checked","");
          break;

        case "effect-sepia":
          imgUploadPreview.setAttribute("style", "filter: " + "sepia(" + effectLevelValue.value + "%)");
          effectSepiaInput.setAttribute("checked","");
          break;

        case "effect-marvin":
          imgUploadPreview.setAttribute("style", "filter: " + "invert(" + effectLevelValue.value + "%)");
          effectMarvinInput.setAttribute("checked","");
          break;

        case "effect-phobos":
          imgUploadPreview.setAttribute("style", "filter: " + "blur(" + effectLevelValue.value / 100 * 3 + "px)");
          effectPhobosInput.setAttribute("checked","");
          break;

        case "effect-heat":
          imgUploadPreview.setAttribute("style", "filter: " + "brightness(" + ((effectLevelValue.value / 100 * 3) + 1) + ")");
          effectHeatInput.setAttribute("checked","");
          break;
      }
    }

  });
});


//Фальтры для хэштегов
var textHashtagsInput = document.querySelector(".text__hashtags");

textHashtagsInput.addEventListener("focus", (evt) => {
  document.removeEventListener("keydown", onPreviewEscPress);
});

textHashtagsInput.addEventListener("blur", (evt) => {
  document.addEventListener("keydown", onPreviewEscPress);
});

textHashtagsInput.addEventListener("blur", (evt) => {
  var target = evt.target;
  var inputArray = textHashtagsInput.value.split(" ");

  inputArray = inputArray.filter(elem => elem.length > 0);

  if (inputArray.length > 5) {
    textHashtagsInput.setCustomValidity("Можно использовать не больше 5 хэш-тегов");
  }

  inputArray.forEach( (item) => {
    var itemSplit = item.split("");
    if (itemSplit.length > 20) {
      textHashtagsInput.setCustomValidity("Хэш-тег не может быть длиннее 20 символов");
    } else if (itemSplit[0] != "#") {
      textHashtagsInput.setCustomValidity("Каждый хэш-тег должен начинаться с решётки \"#\"");
    } else if (itemSplit.length === 1 && itemSplit[0] == "#") {
      textHashtagsInput.setCustomValidity("Хэш-тег не может состоять только из символа \"#\"");
    } else if (itemSplit[0] === "#" && itemSplit.includes('#', 1)) {
      textHashtagsInput.setCustomValidity("Хэш-теги должны быть разделены пробелами");
    }
  })
});



//Обработчики для передвижения пина в фильтре
var effectLevelDepth = document.querySelector(".effect-level__depth");

effectLevelPin.addEventListener("mousedown", (evt) => {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      if ((effectLevelPin.offsetLeft - shift.x >= 0) && (effectLevelPin.offsetLeft - shift.x <= 453)) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;

        effectLevelValue.value = calculatePinValueInPercent();

        var effectCheckedInput = effectsList.querySelector(".effects__radio[checked]");

        switch (effectCheckedInput.value) {
          case "none":
              imgUploadPreview.setAttribute("style", "");
              break;

          case "chrome":
            imgUploadPreview.setAttribute("style", "filter: " + "grayscale(" + effectLevelValue.value + "%)");
            effectChromeInput.setAttribute("checked","");
            break;

          case "sepia":
            imgUploadPreview.setAttribute("style", "filter: " + "sepia(" + effectLevelValue.value + "%)");
            effectSepiaInput.setAttribute("checked","");
            break;

          case "marvin":
            imgUploadPreview.setAttribute("style", "filter: " + "invert(" + effectLevelValue.value + "%)");
            effectMarvinInput.setAttribute("checked","");
            break;

          case "phobos":
            imgUploadPreview.setAttribute("style", "filter: " + "blur(" + effectLevelValue.value / 100 * 3 + "px)");
            effectPhobosInput.setAttribute("checked","");
            break;

          case "heat":
            imgUploadPreview.setAttribute("style", "filter: " + "brightness(" + ((effectLevelValue.value / 100 * 3) + 1) + ")");
            effectHeatInput.setAttribute("checked","");
            break;
        }
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

})();

