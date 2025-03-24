const miniature = document.querySelector('#picture').content;
const miniatureList = document.querySelector('.pictures');
const similarMiniaturesFragment = document.createDocumentFragment();

function getPictureCardTemplate(photoObject) {
  const miniatureElement = miniature.cloneNode(true);

  miniatureElement.querySelector('.picture__img').src = photoObject.url;
  miniatureElement.querySelector('.picture__img').alt = photoObject.description;
  miniatureElement.querySelector('.picture__likes').textContent = photoObject.likes;
  miniatureElement.querySelector('.picture__comments').textContent = photoObject.comments.length;

  return miniatureElement;
}

export function renderPictures(picturesData) {
  picturesData.forEach((photoObject) => {
    const pictureCard = getPictureCardTemplate(photoObject);
    similarMiniaturesFragment.appendChild(pictureCard);
  });
  miniatureList.appendChild(similarMiniaturesFragment);
}

export {miniatureList};
