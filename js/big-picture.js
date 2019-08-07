'use strict';

(function () {
  var COMMENT_STEP = 5;

  var bigPicture = document.querySelector('.big-picture');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var commentCount = 0;
  var comments = [];

  var counterComments = function () {
    commentCount += COMMENT_STEP;
    var newData = comments.slice(0, commentCount);

    if (commentCount >= comments.length) {
      commentCount = comments.length;
      commentsLoader.classList.add('visually-hidden');
    }

    socialCommentCount.textContent = commentCount + ' из ' + comments.length + ' комментариев';

    window.createComments(newData);
  };

  var onCommentsLoaderClick = function () {
    counterComments();
  };

  var renderBigPicture = function (data) {
    bigPicture.querySelector('IMG').src = data.url;
    bigPicture.querySelector('.likes-count').textContent = data.likes;
    bigPicture.querySelector('.social__caption').textContent = data.description;
    comments = data.comments;

    counterComments();
  };

  var openPopup = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureCancel.addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  };

  var onPopupEscPress = function (evt) {
    window.isEscEvent(evt, closePopup);
  };

  var onPopupCloseClick = function () {
    closePopup();
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentCount = 0;
    commentsLoader.classList.remove('visually-hidden');

    bigPictureCancel.removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupEscPress);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };

  window.openBigPicture = function (data) {
    renderBigPicture(data);
    openPopup();
  };
})();
