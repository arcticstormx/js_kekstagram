'use strict';

(function () {

  const COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const postsArray = [];
  const pictureTemplate = document.querySelector("#picture")
    .content
    .querySelector(".picture");
  const pictures = document.querySelector(".pictures");
  const picturesArray = document.querySelectorAll(".picture");
  const bigPicture = document.querySelector(".big-picture");

  let fragment = document.createDocumentFragment();

  function createComment () {
    var comment = window.data.getRandomElement(COMMENTS);
    if (Math.round(Math.random()) == true) {
      comment += ' ' + window.data.getRandomElement(COMMENTS);
    }
    return comment;
  }

  function createPost () {
    let post = {};
    post.url = null;
    post.likes = window.data.getRandomNumber(15, 200);
    post.comments = [];
    for (let i = 0; i < window.data.getRandomNumber(5, 20); i++) {
      post.comments.push(createComment());
    }
    return post;
  }

  function renderPost (post) {
    const renderedPost = pictureTemplate.cloneNode(true);

    renderedPost.querySelector(".picture__img").setAttribute('src', post.url);
    renderedPost.querySelector(".picture__likes").textContent = post.likes;
    renderedPost.querySelector(".picture__comments").textContent = post.comments;

    return renderedPost;
  }

  function renderSocialComment (comment) {
    const renderedComment = bigPicture.querySelector(".social__comment").cloneNode(true);

    renderedComment.querySelector(".social__picture").setAttribute("src", "img/avatar-" + window.data.getRandomNumber(1, 6) + ".svg");
    renderedComment.querySelector(".social__text").textContent = comment;

    return renderedComment;
  }

  function renderBigPicture (post) {
    const socialCommentsFragment = document.createDocumentFragment();

    bigPicture.querySelector(".big-picture__img").querySelector("img").setAttribute('src', post.url);
    bigPicture.querySelector(".likes-count").textContent = post.likes;
    bigPicture.querySelector(".comments-count").textContent = post.comments.length;

    // Прикрепляем все комментарии к фрагменту //
    for (let i = 0; i < post.comments.length; i++) {
      const newComment = renderSocialComment(post.comments[i]);
      socialCommentsFragment.appendChild(newComment);
    }

    // Очистим список комментариев //
    bigPicture.querySelector(".social__comments").innerHTML = "";

    // Добавим комментарии, которые мы сгенерировали //
    bigPicture.querySelector(".social__comments").appendChild(socialCommentsFragment);
  }

  const closePreview = () => {
    bigPicture.classList.add("hidden");
    document.removeEventListener("keydown", onPreviewEscPress);
  };

  const onPreviewEscPress = (evt) => {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closePreview();
    }
  };

  const openPreview = () => {
    bigPicture.classList.remove("hidden");
    document.addEventListener("keydown", onPreviewEscPress);
  };

  for (let i = 0; i < 25; i++) {
    postsArray.push(createPost());
    postsArray[i].url = "photos/" + (i + 1) + ".jpg";
  }

  for (let i = 0; i < postsArray.length; i++) {
    fragment.appendChild(renderPost(postsArray[i]));
  }

  pictures.appendChild(fragment);

  renderBigPicture(postsArray[0]);

  document.querySelector(".social__comment-count").classList.add("visually-hidden");
  document.querySelector(".comments-loader").classList.add("visually-hidden");

  //Добавлеине всем элементам с классом .picture открытие по клику
  picturesArray.forEach( (elem) => {
    elem.addEventListener("click", (evt) => {
      openPreview();
    })
  });
})();
