function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const id = Array.from({ length: 25 }, (_, i) => i + 1);

const description = 'Мое фото';

const likes = Array.from({ length: 200 - 15 + 1 }, (_, i) => i + 15);

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const name = [
  'Вася',
  'Лена',
  'Саша',
  'Катя',
  'Вова',
];


function comments() {
  for (let i = 0; i < 30; i++) {
    comments.push({
      idComment: Math.floor(Math.random() * 1000),
      avatar: 'img/avatar-{{getRandomInt(1, 6)}}.svg',
      message: message[getRandomInt(0, message.length - 1)],
      nameComments: name[getRandomInt(0, name.length - 1)]
    });
  }
}

function getPhotoDescription() {
  const randomID = id[getRandomInt(0, id.length - 1)];
  const randomUrl = 'photos/{{$randomID}}.jpg';
  const randomLikes = likes[getRandomInt(0, likes.length - 1)];
  const randomComments = comments[getRandomInt(0, comments.length - 1)];

  return {
    id: id[randomID],
    url: randomUrl,
    description: description,
    likes: likes[randomLikes],
    comments: randomComments,
  };
};

const photoDescriptionArray = Array.from({ length: 25 }, getPhotoDescription);
console.log(photoDescriptionArray);
