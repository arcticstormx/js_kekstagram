var randomIntBetweenTwoNumbers = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var makeElement = function(tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

var generateCommentsArray = function() {
    var testArray = [];
    for (i = 0; i < randomIntBetweenTwoNumbers(1, 100); i++) {
      var comment = '';
      for (i = 0; i < randomIntBetweenTwoNumbers(1, 2); i++) {
        if (i == 1) {
          comment += ' ';
        }
        comment += COMMENTS[randomIntBetweenTwoNumbers(0, COMMENTS.length - 1)];
      }
      testArray.push(comment);
    }
    return testArray;
};

var shuffleArray = function (a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

var generatePost = function(url) {
  var post = {
    url: null,
    likes: null,
    comments: [],
    description: null
  };

  post.url = 'photos/' + url + '.jpg';
  post.likes = randomIntBetweenTwoNumbers(15, 200);
  post.comments = generateCommentsArray();
  post.description = DESCRIPTIONS[randomIntBetweenTwoNumbers(0, DESCRIPTIONS.length - 1)];

  return post;
};

var createPostsArray = function(numberOfObjects) {
  var objectsArray = [];
  var shuffledNumbersArray = [];

  for (var i = 1; i < numberOfObjects + 1; i++) {
   shuffledNumbersArray.push(i);
  }

  shuffledNumbersArray = shuffleArray(shuffledNumbersArray);

  for (var i = 0; i < numberOfObjects; i++) {
    var post = generatePost(shuffledNumbersArray[i]);
    objectsArray.push(post);
  }

  return objectsArray;
};

var picturesSection = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPost = function(objectWithData) {
  var pictureContainer = pictureTemplate.cloneNode(true);

  var pictureImage = pictureContainer.querySelector('.picture__img');
  pictureImage.src = objectWithData.url;

  var pictureCommentsNum = pictureContainer.querySelector('.picture__comments');
  pictureCommentsNum.textContent = objectWithData.comments.length;

  var pictureLikes = pictureContainer.querySelector('.picture__likes');
  pictureLikes.textContent = objectWithData.likes;

  var pictureDescription = pictureContainer.querySelector('.picture__info');
  var descriptionText = document.createTextNode(objectWithData.description);

  pictureDescription.insertBefore(descriptionText, pictureDescription.children[0]);

  return pictureContainer;
};

var fragment = document.createDocumentFragment();

var renderArrayIntoHTML = function(arrayWithObjects) {
  for (var i = 0; i < arrayWithObjects.length; i++) {
    fragment.appendChild(renderPost(arrayWithObjects[i]));
  }

  picturesSection.appendChild(fragment);
};

var taskArray = createPostsArray(25);

renderArrayIntoHTML(taskArray);

var bigPicture = document.querySelector('.big-picture');

bigPicture.classList.remove('hidden');

var renderBigPictureComments = function(commentFromArray) {
  var listItem = makeElement('li', 'social__comment');

  var listImage = makeElement('img', 'social__picture');
  listImage.src = 'img/avatar-' + randomIntBetweenTwoNumbers(1, 6) + '.svg';
  listImage.alt = 'Аватар комментатора фотографии';
  listImage.width = '35';
  listImage.height = '35';

  listItem.appendChild(listImage);

  var listText = makeElement('p', 'social__text');
  listText.textContent = commentFromArray;

  listItem.appendChild(listText);

  return listItem;
}

var commentsFragment = document.createDocumentFragment();

var renderBigPicture = function(arrayWithObjects) {
  var arrayItem = arrayWithObjects[0];

  var bigPictureImg = bigPicture.querySelector('img');
  bigPictureImg.src = arrayItem.url;

  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  bigPictureLikesCount.textContent = arrayItem.likes;

  var bigPicturesCommentsCount = bigPicture.querySelector('.comments-count');
  bigPicturesCommentsCount.textContent = arrayItem.comments.length;

  var bigPicturesComments = bigPicture.querySelector('.social__comments');
  var arrayItemComments = arrayItem.comments;

  for (i = 0; i < arrayItemComments.length; i++) {
    var generatedComment = renderBigPictureComments(arrayItemComments[i]);
    commentsFragment.appendChild(generatedComment);
  }

  bigPicturesComments.appendChild(commentsFragment);

  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  bigPictureDescription.textContent = arrayItem.description;
};

renderBigPicture(taskArray);

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
