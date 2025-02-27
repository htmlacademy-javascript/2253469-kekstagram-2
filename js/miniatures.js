import { mockPhotos } from './data.js';
const miniature = document.querySelector('#picture').content;
const miniatureList = document.querySelector('.pictures');

const similarMiniatures = mockPhotos;
const similarMiniaturesFragment = document.createDocumentFragment();

similarMiniatures.forEach ((url, description, likes, comments) => {
  const miniatureElement = miniature.cloneNode(true);
  miniatureElement.querySelector.src = url;
  miniatureElement.querySelector.alt = description;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureElement.querySelector('.picture__comments').textContent = comments;
});

miniatureList.appendChild(similarMiniaturesFragment);
