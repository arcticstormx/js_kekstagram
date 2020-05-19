'use strict';

(function () {

  let postsArray = [];
  let postsArrayCopy = [];

  const bigPicture = document.querySelector(".big-picture");
  const cancelPreview = document.querySelector("#picture-cancel");

  function renderPost (post) {
    const pictureTemplate = document.querySelector("#picture")
      .content
      .querySelector(".picture");
    const renderedPost = pictureTemplate.cloneNode(true);

    renderedPost.querySelector(".picture__img").setAttribute('src', post.url);
    renderedPost.querySelector(".picture__likes").textContent = post.likes;
    renderedPost.querySelector(".picture__comments").textContent = post.comments.length;

    return renderedPost;
  }

  function renderPreviewComment (post) {
    const comment = document.createElement("li");
    const pic = document.createElement("img");
    const text = document.createElement("p");

    comment.className = "social__comment";
    pic.className = "social__picture";
    text.className = "social__text";
    comment.appendChild(pic);
    comment.appendChild(text);

    comment.querySelector(".social__picture").setAttribute("src", post.avatar);
    comment.querySelector(".social__picture").setAttribute("width", 35);
    comment.querySelector(".social__picture").setAttribute("height", 35);
    comment.querySelector(".social__text").textContent = post.message;

    return comment;
  }

  function renderPreview (post) {
    const socialCommentsFragment = document.createDocumentFragment();
    console.log('renderPreview post', post);
    const img = document.createElement("img");

    bigPicture.querySelector(".big-picture__img").appendChild(img);
    bigPicture.querySelector(".big-picture__img").querySelector("img").setAttribute('src', post.url);
    bigPicture.querySelector(".likes-count").textContent = post.likes;
    bigPicture.querySelector(".comments-count").textContent = post.comments.length;
    bigPicture.querySelector(".social__caption").textContent = post.description;

    // Прикрепляем все комментарии к фрагменту
    for (let i = 0; i < post.comments.length; i++) {
      const newComment = renderPreviewComment(post.comments[i]);
      socialCommentsFragment.appendChild(newComment);
    }
    // Очистим список комментариев
    bigPicture.querySelector(".social__comments").innerHTML = "";
    // Добавим комментарии, которые мы сгенерировали
    bigPicture.querySelector(".social__comments").appendChild(socialCommentsFragment);
    // Скрываем все комментарии, кроме первых 5
    const comments = bigPicture.querySelectorAll(".social__comment");
    console.log("comments", comments);
    if (comments.length > 5) {
      for (let i = 5; i < comments.length; i++) {
        comments[i].className += " visually-hidden";
      }
    }
    let hidden = bigPicture.querySelectorAll("li.visually-hidden");
    console.log("hidden", hidden);
    // Вешаем слушатель на comment-loader для загрузки комментариев
    const loader = bigPicture.querySelector(".comments-loader");
    // Покажем загрузчик, если он скрыт
    if (loader.classList.contains("visually-hidden")) loader.classList.remove("visually-hidden");

    loader.addEventListener( "click", (evt) => {
      const commentCount = bigPicture.querySelector(".social__comment-count");
      const notHidden = bigPicture.querySelectorAll(".social__comment:not(.visually-hidden)");
      console.log("notHidden inside loader", notHidden);
      // Проверка, есть ли ещё спрятанные комментарии, если нет, то скрыть "загрузчик"
      if (hidden.length >= 5) {
        for (let i = 0; i < 5; i++) {
          if (hidden[i].classList.contains("visually-hidden")) hidden[i].classList.remove("visually-hidden");
        }
        commentCount.innerHTML = (5 + comments.length - hidden.length) + " из " + "<span class='comments-count'>" + post.comments.length + "</span>" + " комментариев";
      } else if (hidden.length < 5) {
        for (let i = 0; i < hidden.length; i++) {
          if (hidden[i].classList.contains("visually-hidden")) hidden[i].classList.remove("visually-hidden");
        }
        hidden = bigPicture.querySelectorAll("li.visually-hidden");
        commentCount.innerHTML = (comments.length - hidden.length) + " из " + "<span class='comments-count'>" + post.comments.length + "</span>" + " комментариев";
      }
      if (hidden.length === 0 ) loader.classList.add("visually-hidden");
      hidden = bigPicture.querySelectorAll("li.visually-hidden");
      console.log("hidden inside loade", hidden)
    });
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

  const renderPosts = (posts) => {
    const pictures = document.querySelector(".pictures");

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < posts.length; i++) {
      fragment.appendChild(renderPost(posts[i]));
    }

    pictures.appendChild(fragment);

    const picturesArray = document.querySelectorAll(".picture");

    picturesArray.forEach( (elem) => {
      elem.addEventListener("click", (evt) => {
        clearPreview();
        let photo = evt.target.src.slice(32);
        let post = new Object();
        postsArray.forEach( (el) => {
          if (el.url === photo) {
            post = el;
          }
        })
        renderPreview(post);
        openPreview();
      });
    });
  }

  const clearPosts = () => {
    const pics = document.querySelectorAll(".picture");
    pics.forEach( (el) => {
      el.remove();
    });
  }

  const clearPreview = () => {
    const picture = bigPicture.querySelector(".big-picture__img");
    const socialHeader = bigPicture.querySelector(".social__header");
    const caption = bigPicture.querySelector(".social__caption");
    const likes = bigPicture.querySelector(".likes-count");
    const commentsCount = bigPicture.querySelector(".comments-count");
    const comments = bigPicture.querySelector(".social__comments")

    picture.innerHTML = "";
    caption.textContent = "";
    likes.textContent = "";
    commentsCount.textContent = "";
    comments.innerHTML = "";
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function shuffleTwo(array) {
    array.sort(() => Math.random() - 0.5);
  }

  // Добавим локальный successHandler, чтобы сохранить загруженный массив
  // в исходном состоянии

  let successHandler = (data) => {
    postsArray = data;
    renderPosts(postsArray);
    // Делаем копию оригинального массива
    postsArrayCopy = postsArray.slice();

    // После загрузки данных показать вкладки на странице
    const imgFilters = document.querySelector(".img-filters");
    imgFilters.classList.remove("img-filters--inactive");

    const imgFiltersBtns = document.querySelectorAll(".img-filters__button");
    const imgFilterPopular = document.querySelector("#filter-popular");
    const imgFilterNew = document.querySelector("#filter-new");
    const imgFilterDiscussed = document.querySelector("#filter-discussed");


    imgFiltersBtns.forEach( (elem) => {
      elem.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("img-filters__button--active")) return;

          imgFiltersBtns.forEach( (el) => {
            el.classList.remove("img-filters__button--active");
          });

          evt.target.classList.add("img-filters__button--active");

        window.debounce( () => {
          switch (evt.target.id) {
            case "filter-discussed":
              clearPosts();
              postsArrayCopy.sort((left, right) => {
                return right.comments.length - left.comments.length;
              });
              renderPosts(postsArrayCopy);
            break;
            case "filter-new":
              clearPosts();
              shuffle(postsArrayCopy);
              renderPosts(postsArrayCopy);
            break;
            case "filter-popular":
              clearPosts();
              renderPosts(postsArray);
            break;
          }
        });
      });
    });
  }

  cancelPreview.addEventListener("click", (evt) => {
    closePreview();
  })

  // Загрузка данных
  // Github блокирует отправку формы
  // window.back.downloadData(successHandler, window.back.errorHandler);

})();
