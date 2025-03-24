import { mockPhotos } from './data.js';

const bigMiniature = document.querySelector('.big-picture');
const bigMiniatureimg = bigMiniature.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigMiniature.querySelector('.likes-count');
const socialComments = bigMiniature.querySelector('.social__comments');
const socialCommentsTemplate = socialComments.querySelector('.social__comment');
const commentsCaption = bigMiniature.querySelector('.social__caption');
const commentsCount = bigMiniature.querySelector('.social__comment-count');
const commentLoader = bigMiniature.querySelector('.social__comments-loader');
const bigMiniatureCancel = bigMiniature.querySelector('.big-picture__cancel');

const onBigMiniatureCancelClick = () => {
  closeBigMiniature();
};

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigMiniature();
  }
};

const closeBigMiniature = () => {
  bigMiniature.classList.add('hidden');
  bigMiniatureCancel.removeEventListener('click', onBigMiniatureCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
};

const openBigMiniature = (photoID) => {
  const currentPhoto = mockPhotos.find((photo) => photo.id === Number(photoID));
  const socialCommentsFragment = document.createDocumentFragment();

  bigMiniatureimg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialComments.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialComment = socialCommentsTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.userName;
    socialComment.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialComment);
  });

  socialComments.appendChild(socialCommentsFragment);
  commentsCaption.textContent = currentPhoto.description;
  commentsCount.classList.add('hidden');
  commentLoader.classList.add('hidden');

  bigMiniature.classList.remove('hidden');
  bigMiniatureCancel.addEventListener('click', onBigMiniatureCancelClick);
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

export {openBigMiniature};


