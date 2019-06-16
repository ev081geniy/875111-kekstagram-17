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

var randomValue = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var randomArrayIndex = function (array) {
  return array[randomValue(array.length, 0)];
};

var createPhotos = function () {
  var photos = [];
  for (var i = 0; i < SUM_PHOTOS; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomValue(LIKES_MAX, LIKES_MIN),
      comments: creatComments()
    };
  }
  return photos;
};

var creatComments = function () {
  var comments = [];
  for (var i = 0; i < randomValue(4, 1); i++) {
    comments[i] = {
      avatar: 'img/avatar-' + randomValue(7, 1) + '.svg',
      message: randomArrayIndex(COMMENTS),
      name: randomArrayIndex(NAMES)
    };
  }
  return comments;
};

var renderPhoto = function (arrayIndex) {
  var clonePicture = pictureTemplate.cloneNode(true);
  clonePicture.querySelector('.picture__img').src = arrayIndex.url;
  clonePicture.querySelector('.picture__likes').textContent = arrayIndex.likes;
  clonePicture.querySelector('.picture__comments').textContent = arrayIndex.comments.length;
  fragment.appendChild(clonePicture);
};

var renderPhotos = function () {
  for (var i = 0; i < SUM_PHOTOS; i++) {
    renderPhoto(createPhotos()[i]);
  }
  picturesList.appendChild(fragment);
};

renderPhotos();
