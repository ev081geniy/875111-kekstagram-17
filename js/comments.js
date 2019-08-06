'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();

  var createComment = function (comment) {
    var cloneComment = socialComment.cloneNode(true);
    cloneComment.querySelector('.social__picture').src = comment.avatar;
    cloneComment.querySelector('.social__text').textContent = comment.message;

    fragment.appendChild(cloneComment);
  };

  var removeComments = function () {
    var commentsElem = socialComments.querySelectorAll('.social__comment');

    commentsElem.forEach(function (comment) {
      socialComments.removeChild(comment);
    });
  };

  window.createComments = function (comments) {
    comments.forEach(function (comment) {
      createComment(comment);
    });

    removeComments();
    socialComments.appendChild(fragment);
  };
})();
