'use strict';

(function () {

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
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  }

  window.data = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber
    }
  }
})();
