'use strict';

(function () {
  var DEFAULT_SCALE_VALUE = 100;

  var commentFocus = false;
  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('#upload-file');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var uploadCancel = imgUpload.querySelector('#upload-cancel');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var imgEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
  var textDescription = imgUpload.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (!commentFocus) {
      window.utils.isEscEvent(evt, closePopup);
    }
  };

  var onCommentFocus = function () {
    commentFocus = true;
  };

  var onCommentBlur = function () {
    commentFocus = false;
  };

  var resetImgPreview = function () {
    scaleControlValue.value = DEFAULT_SCALE_VALUE + '%';
    imgUploadPreview.className = '';
    imgUploadPreview.style = '';
  };

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    imgEffectLevel.classList.add('hidden');
    resetImgPreview();

    textDescription.addEventListener('focus', onCommentFocus);
    textDescription.addEventListener('blur', onCommentBlur);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    textDescription.removeEventListener('focus', onCommentFocus);
    textDescription.removeEventListener('blur', onCommentBlur);
  };

  uploadFile.addEventListener('change', openPopup);
  uploadCancel.addEventListener('click', closePopup);
})();
