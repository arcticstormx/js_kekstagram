'use strict';

(function () {
  for (let i = 0; i < 25; i++) {
    postsArray.push(createPost());
    postsArray[i].url = "photos/" + (i + 1) + ".jpg";
  }

  for (var i = 0; i < postsArray.length; i++) {
    fragment.appendChild(renderPost(postsArray[i]));
  }

  pictures.appendChild(fragment);

  renderBigPicture(postsArray[0]);

  document.querySelector(".social__comment-count").classList.add("visually-hidden");
  document.querySelector(".comments-loader").classList.add("visually-hidden");
})();
