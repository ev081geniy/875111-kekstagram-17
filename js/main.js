'use strict';

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var picturesList = document.querySelector('.pictures');
var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('#upload-file');
var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
var uploadCancel = imgUpload.querySelector('#upload-cancel');
var effectLevelPin = imgUpload.querySelector('.effect-level__pin');
var effectLevelValue = imgUpload.querySelector('.effect-level__value');
var imgEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
var effectsList = imgUpload.querySelector('.effects__list');
var scaleControlValue = imgUpload.querySelector('.scale__control--value');
var imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
var currentEffect = '';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var SUM_PHOTOS = 25;
var ESC_KEYCODE = 27;
var SCALE_STEP = 25;
var SCALE_MIN = 25;
var SCALE_MAX = 100;
var DEFAULT_SCALE_VALUE = 100;
var DEFAULT_PIN_POSITION = '100%';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Артём', 'Ксения', 'Кирилл', 'Татьяна', 'Егор', 'Варвара'];

var effects = {
  chrome: {
    filter: 'grayscale',
    maxValue: 1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    maxValue: 1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    maxValue: 100,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    maxValue: 3,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    maxValue: 3,
    unit: ''
  }
};

var randomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var randomArrayIndex = function (array) {
  return array[randomValue(0, array.length)];
};

var createPost = function () {
  var posts = [];
  for (var i = 0; i < SUM_PHOTOS; i++) {
    posts.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomValue(LIKES_MIN, LIKES_MAX),
      comments: creatComments()
    });
  }
  return posts;
};

var creatComments = function () {
  var comments = [];
  var commentsCount = randomValue(1, 4);
  for (var i = 0; i < commentsCount; i++) {
    comments.push({
      avatar: 'img/avatar-' + randomValue(1, 7) + '.svg',
      message: messageLength(),
      name: randomArrayIndex(NAMES)
    });
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

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  scalingImage(DEFAULT_SCALE_VALUE);
  imgEffectLevel.classList.add('hidden');
  effectLevelPin.style.left = DEFAULT_PIN_POSITION;
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = 'none';
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var scalingImage = function (scaleValue) {
  scaleControlValue.value = scaleValue + '%';
  imgUploadPreview.style.transform = 'scale(' + scaleValue / 100 + ')';
};

var onScaleBiggerClick = function () {
  var currenScaleValue = parseInt(scaleControlValue.value, 10);
  if (currenScaleValue < SCALE_MAX) {
    currenScaleValue += SCALE_STEP;
    scaleControlValue.value = currenScaleValue + '%';
    scalingImage(currenScaleValue);
  }
};

var onScaleSmallerClick = function () {
  var currenScaleValue = parseInt(scaleControlValue.value, 10);
  if (currenScaleValue > SCALE_MIN) {
    currenScaleValue -= SCALE_STEP;
    scalingImage(currenScaleValue);
  }
};

var onEffectClick = function (evt) {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    if (currentEffect !== 'none') {
      var effect = effects[currentEffect];
      imgUploadPreview.className = 'effects__preview--' + currentEffect;
      imgUploadPreview.style.filter = createFilter(effect);
      effectLevelPin.style.left = DEFAULT_PIN_POSITION;
      imgEffectLevel.classList.remove('hidden');
    } else {
      imgEffectLevel.classList.add('hidden');
      imgUploadPreview.style.filter = 'none';
    }
  }
};

var onPinMouseup = function () {
  var effect = effects[currentEffect];
  imgUploadPreview.style.filter = createFilter(effect);
};

var createFilter = function (effect) {
  var currentPinPosition = parseInt(effectLevelPin.style.left, 10);
  effectLevelValue.value = currentPinPosition;
  var effectValue = (effect.maxValue * currentPinPosition) / 100;
  var filter = effect.filter + '(' + effectValue + effect.unit + ')';
  return filter;
};

uploadFile.addEventListener('change', openPopup);

uploadCancel.addEventListener('click', closePopup);

scaleControlBigger.addEventListener('click', onScaleBiggerClick);

scaleControlSmaller.addEventListener('click', onScaleSmallerClick);

effectsList.addEventListener('click', onEffectClick);

effectLevelPin.addEventListener('mouseup', onPinMouseup);
