'use strict';

(function () {
  function renderSocialComment (comment) {
  const renderedComment = bigPicture.querySelector(".social__comment").cloneNode(true);

  renderedComment.querySelector(".social__picture").setAttribute("src", "img/avatar-" + getRandomNumber(1, 6) + ".svg");
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
})();
