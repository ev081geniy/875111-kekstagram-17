'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var fragment = document.createDocumentFragment();

  var createComment = function (comment) {
    var cloneComment = socialComment.cloneNode(true);
    cloneComment.querySelector('.social__picture').src = comment.avatar;
    cloneComment.querySelector('.social__text').textContent = comment.message;

    fragment.appendChild(cloneComment);
  };

  var removeComments = function () {
    var comments = socialComments.querySelectorAll('.social__comment');

    comments.forEach(function (comment) {
      socialComments.removeChild(comment);
    });
  };

  var createComments = function (comments) {
    comments.forEach(function (comment) {
      createComment(comment);
    });
    removeComments();
    socialComments.appendChild(fragment);
  };

  var renderBigPicture = function (data) {
    bigPicture.querySelector('IMG').src = data.url;
    bigPicture.querySelector('.likes-count').textContent = data.likes;
    bigPicture.querySelector('.comments-count').textContent = data.comments.length;
    bigPicture.querySelector('.social__caption').textContent = data.description;

    createComments(data.comments);

    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  var openPopup = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureCancel.addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    bigPictureCancel.removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupCloseClick = function () {
    closePopup();
  };

  window.openBigPicture = function (data) {
    renderBigPicture(data);
    openPopup();
  };
})();
