'use strict';

(function () {
  var DEFAULT_SCALE_VALUE = 100;

  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('#upload-file');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var uploadCancel = imgUpload.querySelector('#upload-cancel');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var imgEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
  var textDescription = imgUpload.querySelector('.text__description');
  var textHashtags = imgUpload.querySelector('.text__hashtags');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var onPopupEscPress = function (evt) {
    window.isEscEvent(evt, closePopup);
  };

  var onCommentFocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onCommentBlur = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onHashtagsFocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onHashtagsBlur = function () {
    document.addEventListener('keydown', onPopupEscPress);
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

    document.addEventListener('keydown', onPopupEscPress);
    textDescription.addEventListener('focus', onCommentFocus);
    textDescription.addEventListener('blur', onCommentBlur);
    textHashtags.addEventListener('focus', onHashtagsFocus);
    textHashtags.addEventListener('blur', onHashtagsBlur);
  };

  var onUploadChange = function () {
    openPopup();
  };

  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    imgUploadForm.reset();

    document.addEventListener('keydown', onPopupEscPress);
    textDescription.removeEventListener('focus', onCommentFocus);
    textDescription.removeEventListener('blur', onCommentBlur);
    textHashtags.removeEventListener('focus', onHashtagsFocus);
    textHashtags.removeEventListener('blur', onHashtagsBlur);
  };

  var onCancelClick = function () {
    closePopup();
  };

  var onSuccess = function () {
    closePopup();
    window.backendMessage.success();
  };

  var onError = function () {
    closePopup();
    window.backendMessage.error();
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(imgUploadForm), onSuccess, onError);
    evt.preventDefault();
  };

  uploadFile.addEventListener('change', onUploadChange);

  uploadCancel.addEventListener('click', onCancelClick);

  imgUploadForm.addEventListener('submit', onFormSubmit);
})();
