'use strict';

(function () {
  var postArray = [];

  var filters = {
    'filter-popular': 'filterPopular',
    'filter-new': 'filterNew',
    'filter-discussed': 'filterDiscussed'
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var picturesList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = document.querySelector('.img-filters__form');

  var renderPhoto = function (post) {
    var clonePicture = pictureTemplate.cloneNode(true);
    clonePicture.querySelector('.picture__img').src = post.url;
    clonePicture.querySelector('.picture__likes').textContent = post.likes;
    clonePicture.querySelector('.picture__comments').textContent = post.comments.length;
    fragment.appendChild(clonePicture);
  };

  var renderPictures = function (pictures) {
    pictures.forEach(function (picture) {
      renderPhoto(picture);
    });
    picturesList.appendChild(fragment);
  };

  var removePictures = function () {
    var pictures = picturesList.querySelectorAll('.picture');

    pictures.forEach(function (picture) {
      picturesList.removeChild(picture);
    });
  };

  var refreshPictures = function (array) {
    removePictures();
    renderPictures(array);
  };

  var changeClassActive = function (elem) {
    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    elem.classList.add('img-filters__button--active');
  };

  var onClickFiltersButton = function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      var filterName = filters[evt.target.id];
      var newArray = window.filters[filterName](postArray);

      changeClassActive(evt.target);
      window.debounce(function () {
        refreshPictures(newArray);
      });
    }
  };

  var onSuccessPhotos = function (array) {
    postArray = array;
    imgFilters.classList.remove('img-filters--inactive');
    renderPictures(postArray);

    renderBigPic(postArray[0]);
    bigPicture.classList.remove('hidden');

    imgFiltersForm.addEventListener('click', onClickFiltersButton);
  };

  window.load(onSuccessPhotos);

  var bigPicture = document.querySelector('.big-picture');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = bigPicture.querySelector('.social__comment');

  var createComment = function (array) {
    var cloneComment = socialComment.cloneNode(true);
    cloneComment.querySelector('.social__picture').src = array.avatar;
    cloneComment.querySelector('.social__text').textContent = array.message;

    fragment.appendChild(cloneComment);
  };

  var renderBigPic = function (post) {
    bigPicture.querySelector('IMG').src = post.url;
    bigPicture.querySelector('.likes-count').textContent = post.likes;
    bigPicture.querySelector('.comments-count').textContent = post.comments.length;
    bigPicture.querySelector('.social__caption').textContent = post.description;

    createComments(post.comments);

    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  var createComments = function (comments) {
    comments.forEach(function (comment) {
      createComment(comment);
    });
    removeComments();
    socialComments.appendChild(fragment);
  };

  var removeComments = function () {
    var comments = socialComments.querySelectorAll('.social__comment');

    comments.forEach(function (comment) {
      socialComments.removeChild(comment);
    });
  };
})();
