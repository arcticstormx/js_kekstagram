'use strict';

// КОНСТАНТЫ //
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// ПЕРЕМЕННЫЕ //

var postsArray = [];
var fragment = document.createDocumentFragment();
var pictureTemplate = document.querySelector("#picture")
  .content
  .querySelector(".picture");
var pictures = document.querySelector(".pictures");
var bigPicture = document.querySelector(".big-picture");
var uploadFile = document.querySelector("#upload-file");


// ФУНКЦИИ //

function getRandomElement (arr) {
  var min = 0;
  var max = arr.length - 1;
  var randomElement = Math.floor(Math.random() * (max + 1));
  return arr[randomElement];
}

function getRandomNumber (min, max) {
  var minNum = Math.ceil(min);
  var maxNum = Math.floor(max);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum; //The maximum is inclusive and the minimum is inclusive
}

function getNumbersArray (num) {
  var arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i + 1);
  }
  return arr;
}

function createComment () {
  var comment = getRandomElement(COMMENTS);
  if (Math.round(Math.random()) == true) {
    comment += ' ' + getRandomElement(COMMENTS);
  }
  return comment;
}

function createPost () {
  var post = {};
  post.url = null;
  post.likes = getRandomNumber(15, 200);
  post.comments = [];
  for (let i = 0; i < getRandomNumber(5, 20); i++) {
    post.comments.push(createComment());
  }
  return post;
}

function renderPost (post) {
  var renderedPost = pictureTemplate.cloneNode(true);

  renderedPost.querySelector(".picture__img").setAttribute('src', post.url);
  renderedPost.querySelector(".picture__likes").textContent = post.likes;
  renderedPost.querySelector(".picture__comments").textContent = post.comments;

  return renderedPost;
}

function renderSocialComment (comment) {
  var renderedComment = bigPicture.querySelector(".social__comment").cloneNode(true);

  renderedComment.querySelector(".social__picture").setAttribute("src", "img/avatar-" + getRandomNumber(1, 6) + ".svg");
  renderedComment.querySelector(".social__text").textContent = comment;

  return renderedComment;
}

function renderBigPicture (post) {
  var socialCommentsFragment = document.createDocumentFragment();

  bigPicture.querySelector(".big-picture__img").querySelector("img").setAttribute('src', post.url);
  bigPicture.querySelector(".likes-count").textContent = post.likes;
  bigPicture.querySelector(".comments-count").textContent = post.comments.length;

  // Прикрепляем все комментарии к фрагменту //
  for (var i = 0; i < post.comments.length; i++) {
    var newComment = renderSocialComment(post.comments[i]);
    socialCommentsFragment.appendChild(newComment);
  }

  // Очистим список комментариев //
  bigPicture.querySelector(".social__comments").innerHTML = "";

  // Добавим комментарии, которые мы сгенерировали //
  bigPicture.querySelector(".social__comments").appendChild(socialCommentsFragment);
}


// ВЫЗОВ ФУНКЦИЙ И ВЫПОЛНЯЕМЫЙ КОД //


for (let i = 0; i < 25; i++) {
  postsArray.push(createPost());
  postsArray[i].url = "photos/" + (i + 1) + ".jpg";
}

for (var i = 0; i < postsArray.length; i++) {
  fragment.appendChild(renderPost(postsArray[i]));
}

pictures.appendChild(fragment);

renderBigPicture(postsArray[0]);

// document.querySelector(".big-picture").classList.remove("hidden");

document.querySelector(".social__comment-count").classList.add("visually-hidden");
document.querySelector(".comments-loader").classList.add("visually-hidden");


// Module4-task1 //

var bigPictureClose = document.querySelector(".big-picture__cancel");
var picturesArray = document.querySelectorAll(".picture");

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

var closePreview = () => {
  bigPicture.classList.add("hidden");
  document.removeEventListener("keydown", onPreviewEscPress);
};

var onPreviewEscPress = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closePreview();
  }
};

var openPreview = () => {
  bigPicture.classList.remove("hidden");
  document.addEventListener("keydown", onPreviewEscPress);
};

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

var calculatePinValueInPercent = () => {
  var effectPinStyle = getComputedStyle(effectLevelPin);
  var effectPinCoordValue = +effectPinStyle.getPropertyValue("left").slice(0, -2) / 432;
  var effectPinCoordRounded = (Math.round(effectPinCoordValue * 100) / 100) * 100;
  return effectPinCoordRounded;
};

var onPressPreventSubmit = (evt) => {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
  }
};

// УДАЛИТЬ ПОТОМ ЭТУ СТРОКУ
uploadOverlay.classList.remove("hidden");

//Добавлеине всем элементам с классом .picture открытие по клику
picturesArray.forEach( (elem) => {
  elem.addEventListener("click", (evt) => {
    openPreview();
  })
});

//Закрытие big-picture блока
bigPictureClose.addEventListener("click", () => {
  bigPicture.classList.add("hidden");
  document.removeEventListener("keydown", onPreviewEscPress);
});

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

//Добавление event listener для бегунка
effectLevelPin.addEventListener("mouseup", (evt) => {
  var effectPinStyle = getComputedStyle(effectLevelPin);
  var effectPinCoordValue = +effectPinStyle.getPropertyValue("left").slice(0, -2) / 432;
  var effectPinCoordRounded = (Math.round(effectPinCoordValue * 100) / 100) * 100;
  effectLevelValue.value = effectPinCoordRounded;

  var effectCheckedInput = effectsList.querySelector(".effects__radio[checked]");

  switch (effectCheckedInput.value) {
    case "none":
        imgUploadPreview.setAttribute("style", "");
        break;

    case "chrome":
      imgUploadPreview.setAttribute("style", "filter: " + "grayscale(" + effectPinCoordRounded + "%)");
      effectChromeInput.setAttribute("checked","");
      break;

    case "sepia":
      imgUploadPreview.setAttribute("style", "filter: " + "sepia(" + effectPinCoordRounded + "%)");
      effectSepiaInput.setAttribute("checked","");
      break;

    case "marvin":
      imgUploadPreview.setAttribute("style", "filter: " + "invert(" + effectPinCoordRounded + "%)");
      effectMarvinInput.setAttribute("checked","");
      break;

    case "phobos":
      imgUploadPreview.setAttribute("style", "filter: " + "blur(" + effectPinCoordRounded / 100 * 3 + "px)");
      effectPhobosInput.setAttribute("checked","");
      break;

    case "heat":
      imgUploadPreview.setAttribute("style", "filter: " + "brightness(" + ((effectPinCoordRounded / 100 * 3) + 1) + ")");
      effectHeatInput.setAttribute("checked","");
      break;
  }
});


//  Module4-task2  //


var textHashtagsInput = document.querySelector(".text__hashtags");

textHashtagsInput.addEventListener("input", (evt) => {
  var target = evt.target;
  var inputArray = target.value.split(" ");

  targetArray.forEach( (item) => {
    var itemSplit = item.split("");
    if (itemSplit.length > 20) {
      target.setCustomValidity("Хэш-тег не может быть длиннее 20 символов");
    } else if (itemSplit[0] != "#") {
      target.setCustomValidity("Каждый хэш-тег должен начинаться с решётки \"#\"");
    } else if (itemSplit.length == 1 && itemSplit[0] == "#") {
      target.setCustomValidity("Хэш-тег не может состоять только из символа \"#\"");
    }
  })
});

// userNameInput.addEventListener('invalid', function (evt) {
//   if (userNameInput.validity.tooShort) {
//     userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
//   } else if (userNameInput.validity.tooLong) {
//     userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
//   } else if (userNameInput.validity.valueMissing) {
//     userNameInput.setCustomValidity('Обязательное поле');
//   } else {
//     userNameInput.setCustomValidity('');
//   }
// });

// userNameInput.addEventListener('input', function (evt) {
//   var target = evt.target;
//   if (target.value.length < 2) {
//     target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
//   } else {
//     target.setCustomValidity('');
//   }
// });
