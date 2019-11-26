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

  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  function getRandomElement (arr) {
    const min = 0;
    const max = arr.length - 1;
    const randomElement = Math.floor(Math.random() * (max + 1));
    return arr[randomElement];
  }

  function getRandomNumber (min, max) {
    const minNum = Math.ceil(min);
    const maxNum = Math.floor(max);
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum; //The maximum is inclusive and the minimum is inclusive
  }

  function getNumbersArray (num) {
    const arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(i + 1);
    }
    return arr;
  }
})();
