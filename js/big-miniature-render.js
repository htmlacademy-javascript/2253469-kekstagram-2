import { renderComments, clearComments } from './comments-render.js';
import { isEscapeKey } from './util.js';

const miniatureList = document.querySelector('.pictures');
const bigMiniature = document.querySelector('.big-picture');
const bigMiniatureimg = bigMiniature.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigMiniature.querySelector('.likes-count');
const commentsCaption = bigMiniature.querySelector('.social__caption');
const bigMiniatureCancel = bigMiniature.querySelector('.big-picture__cancel');
let pictures = [];

export const fillPictures = (photos) => {
  pictures = photos;
};


function onEscKeydown (evt) {
  if (!isEscapeKey (evt)) {
    closeBigMiniature();
  }
}


function onBigMiniatureCancelClick (){
  closeBigMiniature();
}


function closeBigMiniature () {

  clearComments();

  bigMiniature.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
  bigMiniatureCancel.removeEventListener('click', onBigMiniatureCancelClick);
}

export function openBigMiniature (photoId) {
  const currentPhoto = pictures.find((object) => object.id === Number(photoId));

  bigMiniatureimg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  commentsCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);

  bigMiniature.classList.remove('hidden');
  bigMiniatureCancel.addEventListener('click', onBigMiniatureCancelClick);
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onEscKeydown);
}
miniatureList.addEventListener('click', (evt) => {
  const currentMiniatureNode = evt.target.closest('.picture');
  if (currentMiniatureNode) {
    openBigMiniature(currentMiniatureNode.dataset.photoId);
  }
});

