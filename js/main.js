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


var effectLevelPin = document.querySelector(".effect-level__pin");
var effectLevelValue = document.querySelector(".effect-level__value");
var imgUploadPreview = document.querySelector(".img-upload__preview");

var effectNoneInput = document.querySelector("#effect-none");
var effectDefaultInput = document.querySelector(".effects__radio[checked]");
var effectDefaultInputValue = document.querySelector(".effects__radio[checked]").value;

var effectChromeInput = document.querySelector("#effect-chrome");
var effectSepiaInput = document.querySelector("#effect-sepia");
var effectMarvinInput = document.querySelector("#effect-marvin");
var effectPhobosInput = document.querySelector("#effect-phobos");
var effectHeatInput = document.querySelector("#effect-heat");


uploadFile.addEventListener("change", (evt) => {
  var uploadOverlay = document.querySelector(".img-upload__overlay");

  if (!uploadOverlay.classList.contains("hidden")) {
    uploadFile.value = "";
  }

  uploadOverlay.classList.toggle("hidden");
});


effectLevelPin.addEventListener("mouseup", (evt) => {
  var effectPinStyle = getComputedStyle(effectLevelPin);
  var effectPinCoordValue = +effectPinStyle.getPropertyValue("left").slice(0, -2);
  effectLevelValue.value = effectPinCoordValue;

  imgUploadPreview.setAttribute("style", "filter: " + "grayscale(" + ((effectLevelValue.value / 100) * 1) + ")");

  // switch (effectDefaultInputValue) {
  // case "chrome":
  //   imgUploadPreview.setAttribute("style", "filter: " + "grayscale(" + (effectLevelValue.value / 100) * 1 + ")");
  //   break;

  // case "sepia":
  //   imgUploadPreview.setAttribute("style", "filter: " + "sepia(" + (effectLevelValue.value / 100) * 1 + ")");
  //   break;

  // case "marvin":
  //   imgUploadPreview.setAttribute("style", "filter: " + "grayscale(" + effectLevelValue.value + "%)");
  //   break;

  // case "phobos":
  //   imgUploadPreview.setAttribute("style", "filter: " + "blur(" + (effectLevelValue.value / 100) * 3 + "px)");
  //   break;

  // case "heat":
  //   imgUploadPreview.setAttribute("style", "filter: " + "brightness(" + (effectLevelValue.value / 100) * 3 + ")");
  //   break;
  // }

});

// effectHeatInput.addEventListener("focus", (evt) => {
//   var pinStyle = getComputedStyle(effectLevelPin);

//   var valueWithoutPercent = +pinStyle.left.slice(0, -1);

//   effectLevelValue.value = valueWithoutPercent;

// });

