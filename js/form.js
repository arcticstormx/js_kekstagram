"use strict";

(function () {
  const effectLevelPin = document.querySelector(".effect-level__pin");
  const effectLevelValue = document.querySelector(".effect-level__value");
  const imgUploadPreview = document.querySelector(".img-upload__preview");
  const imgUploadPreviewClose = document.querySelector(".img-upload__cancel");
  const imgUploadSubmit = document.querySelector("#upload-submit");
  const uploadOverlay = document.querySelector(".img-upload__overlay");
  const uploadFile = document.querySelector("#upload-file");

  const effectsList = document.querySelector(".effects__list");
  const effectsLabels = effectsList.querySelectorAll(".effects__label");

  const effectsInputs = effectsList.querySelectorAll(".effects__radio");
  const effectCheckedInputValue = effectsList.querySelector(".effects__radio[checked]").value;

  const effectNoneInput = document.querySelector("#effect-none");
  const effectChromeInput = document.querySelector("#effect-chrome");
  const effectSepiaInput = document.querySelector("#effect-sepia");
  const effectMarvinInput = document.querySelector("#effect-marvin");
  const effectPhobosInput = document.querySelector("#effect-phobos");
  const effectHeatInput = document.querySelector("#effect-heat");

  const form = document.querySelector(".img-upload__form");

  const FILE_TYPES = ["gif", "jpg", "jpeg", "png"];
  let previewImg = imgUploadPreview.querySelector("img");

  const closeUploadOverlay = () => {
    uploadOverlay.classList.add("hidden");
    document.removeEventListener("keydown", onUploadOverlayEscPress);
  };

  const onUploadOverlayEscPress = (evt) => {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeUploadOverlay();
    }
  };

  const openUploadOverlay = () => {
    uploadOverlay.classList.remove("hidden");
    document.addEventListener("keydown", onUploadOverlayEscPress);
  };

  const onPressPreventSubmit = (evt) => {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      evt.preventDefault();
    }
  };

  const calculatePinValueInPercent = () => {
    let effectPinValue = getComputedStyle(effectLevelPin);
    effectPinValue = +effectPinValue.getPropertyValue("left").slice(0, -2) / 432;
    effectPinValue = (Math.round(effectPinValue * 100) / 100) * 100;
    return effectPinValue;
  };


  //Открытие фильтров при изменении загрузчика изображения
  uploadFile.addEventListener("change", (evt) => {
    if (!uploadOverlay.classList.contains("hidden")) {
      uploadFile.value = "";
    }
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some( (it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
      previewImg.setAttribute("style", "width: 100%");
      openUploadOverlay();
    }
  });

  //Закрытие блока с фильтрами
  imgUploadPreviewClose.addEventListener("click", (evt) => {
    closeUploadOverlay();
  });

  const setFilterValue = (evt) => {
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

  //Добавление каждому элементу массива лэйблов event listener
  effectsLabels.forEach( (elem) => {
    elem.addEventListener("click", setFilterValue);
  });

  effectsLabels.forEach( (elem) => {
    elem.addEventListener("keydown", (evt) => {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        setFilterValue(evt);
      }
    });
  });


  //Фальтры для хэштегов
  const textHashtagsInput = document.querySelector(".text__hashtags");

  // textHashtagsInput.addEventListener("focus", (evt) => {
  //   document.removeEventListener("keydown", onPreviewEscPress);
  // });

  // textHashtagsInput.addEventListener("blur", (evt) => {
  //   document.addEventListener("keydown", onPreviewEscPress);
  // });

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
      } else if (itemSplit[0] === "#" && itemSplit.includes("#", 1)) {
        textHashtagsInput.setCustomValidity("Хэш-теги должны быть разделены пробелами");
      }
    })
  });



  //Обработчики для передвижения пина в фильтре
  const effectLevelDepth = document.querySelector(".effect-level__depth");

  effectLevelPin.addEventListener("mousedown", (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX
    };

    const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };

        startCoords = {
          x: moveEvt.clientX,
        };

        if ((effectLevelPin.offsetLeft - shift.x >= 0) && (effectLevelPin.offsetLeft - shift.x <= 453)) {
          effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + "px";
          effectLevelDepth.style.width = effectLevelPin.style.left;

          effectLevelValue.value = calculatePinValueInPercent();

          const effectCheckedInput = effectsList.querySelector(".effects__radio[checked]");

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

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  form.addEventListener("submit", function (evt) {
    window.back.uploadData(new FormData(form),
      function (response) {
        closeUploadOverlay();
        console.log("Данные отправлены!")
      },
    );
    evt.preventDefault();
  }, false);

  // Изменение размера изображение

  const smallerBtn = document.querySelector(".scale__control--smaller");
  const biggerBtn = document.querySelector(".scale__control--bigger");
  const imgScale = document.querySelector(".scale__control--value");
  let sizeValue = imgScale.value.slice(0, -1);

  smallerBtn.addEventListener("click", (evt) => {
    if (!sizeValue) return;
    console.log("до", sizeValue);
    previewImg.setAttribute("style", "height: auto; width: " + (sizeValue - 5) + "%");
    console.log("после", sizeValue);
    sizeValue = (previewImg.width / 600) * 100;
    imgScale.value = Math.round(sizeValue) + "%";
  });

  biggerBtn.addEventListener("click", (evt) => {
    if (sizeValue >= 100) return;
    console.log("до", sizeValue);
    previewImg.setAttribute("style", "height: auto; width: " + (sizeValue + 5) + "%");
    console.log("после", sizeValue);
    sizeValue = (previewImg.width / 600) * 100;
    imgScale.value = Math.round(sizeValue) + "%";
  });
})();

