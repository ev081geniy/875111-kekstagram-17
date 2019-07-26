'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var NAMES = ['Артём', 'Ксения', 'Кирилл', 'Татьяна', 'Егор', 'Варвара'];

  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var SUM_PHOTOS = 25;

  var randomArrayIndex = function (array) {
    return array[window.utils.randomValue(0, array.length)];
  };

  var messageLength = function () {
    if (Math.random() < 0.5) {
      return randomArrayIndex(COMMENTS);
    } else {
      return randomArrayIndex(COMMENTS) + ' ' + randomArrayIndex(COMMENTS);
    }
  };

  var creatComments = function () {
    var comments = [];
    var commentsCount = window.utils.randomValue(1, 4);
    for (var i = 0; i < commentsCount; i++) {
      comments.push({
        avatar: 'img/avatar-' + window.utils.randomValue(1, 7) + '.svg',
        message: messageLength(),
        name: randomArrayIndex(NAMES)
      });
    }
    return comments;
  };

  window.createPost = function () {
    var posts = [];
    for (var i = 0; i < SUM_PHOTOS; i++) {
      posts.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: window.utils.randomValue(LIKES_MIN, LIKES_MAX),
        comments: creatComments()
      });
    }
    return posts;
  };
})();
