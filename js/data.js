import { getRandomInt } from './util.js';

// const id = Array.from({ length: 25 }, (_, i) => i + 1);

const description = 'Мое фото';

const likes = Array.from({ length: 200 - 15 + 1 }, (_, i) => i + 15);

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Вася',
  'Лена',
  'Саша',
  'Катя',
  'Вова',
];

function getComment() {
  return {
    commentId: Math.floor(Math.random() * 1000),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messages[getRandomInt(0, messages.length - 1)],
    userName: names[getRandomInt(0, names.length - 1)]
  };
}

function getPhotoDescription(index) {
  const id = index + 1;

  return {
    photoId: id,
    url: `photos/${id}.jpg`,
    description: description,
    likes: likes[getRandomInt(0, likes.length - 1)],
    comments: Array.from({ length: 10 }, () => getComment()),
  };
}

export const mockPhotos = Array.from({ length: 25 }, (_, index) => getPhotoDescription(index));

