import { mockPhotos } from './data.js';
import { renderPictures } from './miniatures.js';
import { miniatureList } from './miniatures.js';
import { openBigMiniature } from './miniature-render.js';

renderPictures(mockPhotos);

miniatureList.addEventListener('click', (evt) => {
  const currentMiniatureNode = evt.target.closest('.picure');


  if (currentMiniatureNode) {
    openBigMiniature(currentMiniatureNode.dataset.photoID);
  }
});
