import { mockPhotos } from './data.js';
import { renderComments, clearComments } from './comments-render.js';

const miniatureList = document.querySelector('.pictures');
const bigMiniature = document.querySelector('.big-picture');
const bigMiniatureimg = bigMiniature.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigMiniature.querySelector('.likes-count');
const commentsCaption = bigMiniature.querySelector('.social__caption');
const bigMiniatureCancel = bigMiniature.querySelector('.big-picture__cancel');

function onEscKeydown (evt) {
  if (evt.key === 'Escape') {
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


function openBigMiniature (photoId) {

  const currentPhoto = mockPhotos.find((object) => object.photoId === Number(photoId));


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


