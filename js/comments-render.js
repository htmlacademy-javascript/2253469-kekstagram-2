const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigMiniature = document.querySelector('.big-picture');
const commentsCount = bigMiniature.querySelector('.social__comment-count');
const commentsLoader = bigMiniature.querySelector('.social__comments-loader');
const socialComments = bigMiniature.querySelector('.social__comments');
const socialCommentsTemplate = socialComments.querySelector('.social__comment');
socialComments.innerHTML = '';

function renderNextComments() {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialComment = socialCommentsTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.userName;
    socialComment.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialComment);
  });


  socialComments.appendChild(socialCommentsFragment);
  commentsCount.firstChild.textContent = renderedCommentsLength;
  commentsCount.querySelector('.social__comment-total-count').textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');

  }

  currentCount += COUNT_STEP;

}

function clearComments () {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove ('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
}

function renderComments (currentPhotoComments) {
  comments = currentPhotoComments;
  renderNextComments ();

  commentsLoader.addEventListener('click', renderNextComments);
}

export {clearComments, renderComments};
