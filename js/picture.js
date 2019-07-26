'use strict';

(function () {
  var SUM_PHOTOS = 25;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var picturesList = document.querySelector('.pictures');

  var renderPhoto = function (post) {
    var clonePicture = pictureTemplate.cloneNode(true);
    clonePicture.querySelector('.picture__img').src = post.url;
    clonePicture.querySelector('.picture__likes').textContent = post.likes;
    clonePicture.querySelector('.picture__comments').textContent = post.comments.length;
    fragment.appendChild(clonePicture);
  };

  var renderPhotos = function () {
    var posts = window.createPost();
    for (var i = 0; i < SUM_PHOTOS; i++) {
      var post = posts[i];
      renderPhoto(post);
    }
    picturesList.appendChild(fragment);
  };

  renderPhotos();
})();
