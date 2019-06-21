'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var SUM_PHOTOS = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Артём', 'Ксения', 'Кирилл', 'Татьяна', 'Егор', 'Варвара'];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var picturesList = document.querySelector('.pictures');

var randomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var randomArrayIndex = function (array) {
  return array[randomValue(0, array.length)];
};

var createPost = function () {
  var posts = [];
  for (var i = 0; i < SUM_PHOTOS; i++) {
    posts[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomValue(LIKES_MIN, LIKES_MAX),
      comments: creatComments()
    };
  }
  return posts;
};

var creatComments = function () {
  var comments = [];
  var commentsCount = randomValue(1, 4);
  for (var i = 0; i < commentsCount; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + randomValue(1, 7) + '.svg',
      message: messageLength(),
      name: randomArrayIndex(NAMES)
    };
  }
  return comments;
};

var messageLength = function () {
  if (Math.random() < 0.5) {
    return randomArrayIndex(COMMENTS);
  } else {
    return randomArrayIndex(COMMENTS) + ' ' + randomArrayIndex(COMMENTS);
  }
};

var renderPhoto = function (post) {
  var clonePicture = pictureTemplate.cloneNode(true);
  clonePicture.querySelector('.picture__img').src = post.url;
  clonePicture.querySelector('.picture__likes').textContent = post.likes;
  clonePicture.querySelector('.picture__comments').textContent = post.comments.length;
  fragment.appendChild(clonePicture);
};

var renderPhotos = function () {
  var posts = createPost();
  for (var i = 0; i < SUM_PHOTOS; i++) {
    var post = posts[i];
    renderPhoto(post);
  }
  picturesList.appendChild(fragment);
};

renderPhotos();
