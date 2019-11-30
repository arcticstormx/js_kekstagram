'use strict';

(function () {
var closePreview = () => {
  bigPicture.classList.add("hidden");
  document.removeEventListener("keydown", onPreviewEscPress);
};

var onPreviewEscPress = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    closePreview();
  }
};

var openPreview = () => {
  bigPicture.classList.remove("hidden");
  document.addEventListener("keydown", onPreviewEscPress);
};

})();
