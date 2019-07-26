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

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');
  var scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

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

  scaleControlBigger.addEventListener('click', onScaleBiggerClick);
  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);

  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');
  var imgEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectsList = imgUploadOverlay.querySelector('.effects__list');
  var currentEffect = '';

  var createFilter = function () {
    var value = effectLevelValue.value;
    var effect = EFFECTS[currentEffect];
    var effectValue = ((effect.maxValue - effect.minValue) * value / 100) + effect.minValue;
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

  effectsList.addEventListener('click', onEffectClick);

  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');

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
})();
