'use strict';

(function () {


  let postsArray = [];
  const pictureTemplate = document.querySelector("#picture")
    .content
    .querySelector(".picture");
  const pictures = document.querySelector(".pictures");
  const picturesArray = document.querySelectorAll(".picture");
  const bigPicture = document.querySelector(".big-picture");

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
    renderedPost.querySelector(".picture__comments").textContent = post.comments.length;
    // renderedPost.querySelector(".picture__info").textContent = post.description;

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

  let renderPosts = (posts) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < posts.length; i++) {
      fragment.appendChild(renderPost(posts[i]));
    }

    pictures.appendChild(fragment);
    renderBigPicture(posts[0]);
  }

  let clearPosts = () => {
    pictures.innerHTML = "";
  }

  // Добавим локальный successHandler, чтобы сохранить загруженный массив
  // в исходном состоянии
  let postsArrayCopy = [];

  let successHandler = (data) => {
    postsArray = data;
    renderPosts(postsArray);
    // Делаем копию оригинального массива
    postsArrayCopy = postsArray.slice();

    // После загрузки данных показать вкладки на странице
    const imgFilters = document.querySelector(".img-filters");
    imgFilters.classList.remove("img-filters--inactive");
  }

  // Загрузка данных
  window.back.downloadData(successHandler, window.back.errorHandler);

  document.querySelector(".social__comment-count").classList.add("visually-hidden");
  // document.querySelector(".comments-loader").classList.add("visually-hidden");

  // Добавление всем элементам с классом .picture открытие по клику
  picturesArray.forEach( (elem) => {
    elem.addEventListener("click", (evt) => {
      openPreview();
    })
  });

  // module7-task1
  // Добавим переключение состояния кнопкам сортировки и
  // повесим на них события по сортировке и рендеру массива фотографий
  const imgFiltersBtns = document.querySelectorAll(".img-filters__button");
  const imgFilterPopular = document.querySelector("#filter-popular");
  const imgFilterNew = document.querySelector("#filter-new");
  const imgFilterDiscussed = document.querySelector("#filter-discussed");

  // imgFiltersBtns.forEach( (elem) => {
  //   elem.addEventListener("click", (evt) => {
  //     if (evt.target.classList.contains("img-filters__button--active")) return;
  //     imgFiltersBtns.forEach( (el) => {
  //       el.classList.remove("img-filters__button--active");
  //     })
  //     evt.target.classList.add("img-filters__button--active");
  //     switch (evt.target.id) {
  //       case "filter-popular":
  //         postsArrayCopy.sort((left, right) => {
  //           return right.comments.length - left.comments.length;
  //        });
  //         break;
  //       case "filter-new":
  //         postsArrayCopy

  //     }
  //   })
  // });

  //Сортируем массив


})();
