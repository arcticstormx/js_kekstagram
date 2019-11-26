'use strict';

(function () {
  function createComment () {
    let comment = getRandomElement(COMMENTS);
    if (Math.round(Math.random()) == true) {
      comment += ' ' + getRandomElement(COMMENTS);
    }
    return comment;
  }

  function createPost () {
    const post = {};
    post.url = null;
    post.likes = getRandomNumber(15, 200);
    post.comments = [];
    for (let i = 0; i < getRandomNumber(5, 20); i++) {
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

  for (let i = 0; i < 25; i++) {
    postsArray.push(createPost());
    postsArray[i].url = "photos/" + (i + 1) + ".jpg";
  }
})();
