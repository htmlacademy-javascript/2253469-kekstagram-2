import { mockPhotos } from './data.js';

const miniatureList = document.querySelector('.pictures');
const bigMiniature = document.querySelector('.big-picture');
const bigMiniatureimg = bigMiniature.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigMiniature.querySelector('.likes-count');
const socialComments = bigMiniature.querySelector('.social__comments');
const socialCommentsTemplate = socialComments.querySelector('.social__comment');
const commentsCaption = bigMiniature.querySelector('.social__caption');
const commentsCount = bigMiniature.querySelector('.social__comment-count');
const commentLoader = bigMiniature.querySelector('.social__comments-loader');
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
  bigMiniature.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
  bigMiniatureCancel.removeEventListener('click', onBigMiniatureCancelClick);
}


function openBigMiniature (photoId) {

  const currentPhoto = mockPhotos.find((object) => object.photoId === Number(photoId));
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
}

miniatureList.addEventListener('click', (evt) => {
  const currentMiniatureNode = evt.target.closest('.picture');

  if (currentMiniatureNode) {
    openBigMiniature(currentMiniatureNode.dataset.photoId);
  }
});


