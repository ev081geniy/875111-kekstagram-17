'use strict';

(function () {
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
  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;
  var DEFAULT_PIN_VALUE = 100;
  var PERCENT_COUNT = 100;
  var SCALE_COUNT = 100;

  var imgUpload = document.querySelector('.img-upload__overlay');
  var scaleControlValue = imgUpload.querySelector('.scale__control--value');
  var scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
  var inputHashtags = imgUpload.querySelector('.text__hashtags');
  var effectLevelValue = imgUpload.querySelector('.effect-level__value');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
  var imgEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
  var effectsList = imgUpload.querySelector('.effects__list');
  var currentEffect;
  var effectLevelDepth = imgUpload.querySelector('.effect-level__depth');
  var effectLevelLine = imgUpload.querySelector('.effect-level__line');
  var effectLevelPin = imgUpload.querySelector('.effect-level__pin');

  var scalingImage = function (scaleValue) {
    scaleControlValue.value = scaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + scaleValue / SCALE_COUNT + ')';
  };

  var counterScale = function (flag) {
    var currenScaleValue = parseInt(scaleControlValue.value, 10);

    if (flag === 'smaller' && currenScaleValue > SCALE_MIN) {
      currenScaleValue -= SCALE_STEP;
    } else if (flag === 'bigger' && currenScaleValue < SCALE_MAX) {
      currenScaleValue += SCALE_STEP;
    }
    scalingImage(currenScaleValue);
  };

  var onScaleBiggerClick = function () {
    counterScale('bigger');
  };

  var onScaleSmallerClick = function () {
    counterScale('smaller');
  };

  var createFilter = function () {
    var value = effectLevelValue.value;
    var effect = EFFECTS[currentEffect];
    var effectValue = ((effect.maxValue - effect.minValue) * value / PERCENT_COUNT) + effect.minValue;
    var filter = effect.filter + '(' + effectValue + effect.unit + ')';
    imgUploadPreview.style.filter = filter;
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

  var changePin = function (value) {
    effectLevelPin.style.left = value + '%';
    effectLevelDepth.style.width = value + '%';
    effectLevelValue.value = value;
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

      var pinPosition = Math.round(newCoordX / sliderWidth * PERCENT_COUNT);

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

  var onHashtagsValidation = function () {
    window.validation();
  };

  scaleControlBigger.addEventListener('click', onScaleBiggerClick);
  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);

  effectsList.addEventListener('click', onEffectClick);

  effectLevelPin.addEventListener('mousedown', onPinMouseDown);

  inputHashtags.addEventListener('input', onHashtagsValidation);
})();
