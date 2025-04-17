const miniatureList = document.querySelector('.pictures');
const miniature = document.querySelector('#picture').content;
const similarMiniaturesFragment = document.createDocumentFragment();

function getPictureCardTemplate(photoObject) {
  const miniatureElement = miniature.cloneNode(true);
  miniatureElement.querySelector('.picture').dataset.photoId = photoObject.id;
  miniatureElement.querySelector('.picture__img').src = photoObject.url;
  miniatureElement.querySelector('.picture__img').alt = photoObject.description;
  miniatureElement.querySelector('.picture__likes').textContent = photoObject.likes;
  miniatureElement.querySelector('.picture__comments').textContent = photoObject.comments.length;

  return miniatureElement;
}


export function renderPictures(picturesData) {
  picturesData.slice().forEach((photoObject) => {
    const pictureCard = getPictureCardTemplate(photoObject);
    similarMiniaturesFragment.appendChild(pictureCard);
  });

  miniatureList.appendChild(similarMiniaturesFragment);
}

const clearPhotoCards = () => {
  const pictures = miniatureList.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

export const renderPhotoCards = (photosArray) => {
  clearPhotoCards();
  miniatureList.append(renderPictures(photosArray));
};
