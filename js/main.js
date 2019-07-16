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
var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
var textDescription = imgUpload.querySelector('.text__description');
var effectLevelLine = imgUpload.querySelector('.effect-level__line');
var currentEffect = '';
var commentFocus = false;

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var SUM_PHOTOS = 25;
var ESC_KEYCODE = 27;
var SCALE_STEP = 25;
var SCALE_MIN = 25;
var SCALE_MAX = 100;
var DEFAULT_SCALE_VALUE = 100;
var DEFAULT_PIN_VALUE = 100;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Артём', 'Ксения', 'Кирилл', 'Татьяна', 'Егор', 'Варвара'];

var EFFECTS = {
  none: {
    filter: 'none',
    minValue: '',
    maxValue: '',
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    minValue: 0,
    maxValue: 1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    minValue: 0,
    maxValue: 1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    minValue: 0,
    maxValue: 100,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    minValue: 0,
    maxValue: 3,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    minValue: 1,
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
  imgEffectLevel.classList.add('hidden');
  scalingImage(DEFAULT_SCALE_VALUE);
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = 'none';
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !commentFocus) {
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
    imgUploadPreview.className = 'effects__preview--' + currentEffect;
    imgUploadPreview.style.filter = '';
    imgEffectLevel.classList.toggle('hidden', currentEffect === 'none');
    changePin(DEFAULT_PIN_VALUE);
    createFilter();
  }
};

var createFilter = function () {
  var value = effectLevelValue.value;
  var effect = EFFECTS[currentEffect];
  var effectValue = ((effect.maxValue - effect.minValue) * value / 100) + effect.minValue;
  var filter = effect.filter + '(' + effectValue + effect.unit + ')';
  imgUploadPreview.style.filter = filter;
};

var changePin = function (value) {
  effectLevelPin.style.left = value + '%';
  effectLevelDepth.style.width = value + '%';
  effectLevelValue.value = value;
};

var onCommentFocus = function () {
  commentFocus = true;
};

var onCommentBlur = function () {
  commentFocus = false;
};

var onPinMouseDown = function (downEvt) {
  downEvt.preventDefault();

  var startCoordX = downEvt.clientX;
  var sliderWidth = effectLevelLine.offsetWidth;

  var onPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shiftX = startCoordX - moveEvt.clientX;
    startCoordX = moveEvt.clientX;
    var newCoordX = effectLevelPin.offsetLeft - shiftX;
    if (newCoordX < 0) {
      newCoordX = 0;
    }
    if (newCoordX > sliderWidth) {
      newCoordX = sliderWidth;
    }

    var pinPosition = Math.round(newCoordX / sliderWidth * 100);

    changePin(pinPosition);
    createFilter();
  };

  var onPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    createFilter();

    document.removeEventListener('mousemove', onPinMouseMove);
    document.removeEventListener('mouseup', onPinMouseUp);
  };

  document.addEventListener('mousemove', onPinMouseMove);
  document.addEventListener('mouseup', onPinMouseUp);
};

effectLevelPin.addEventListener('mousedown', onPinMouseDown);

textDescription.addEventListener('focus', onCommentFocus);

textDescription.addEventListener('blur', onCommentBlur);

uploadFile.addEventListener('change', openPopup);

uploadCancel.addEventListener('click', closePopup);

scaleControlBigger.addEventListener('click', onScaleBiggerClick);

scaleControlSmaller.addEventListener('click', onScaleSmallerClick);

effectsList.addEventListener('click', onEffectClick);
