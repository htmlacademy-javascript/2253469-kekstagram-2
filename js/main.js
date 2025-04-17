import { renderPictures } from './miniatures.js';
import { getData } from './api.js';
import './big-miniature-render.js';
import { initImgUploadForm } from './upload-photo-form.js';
import './form-filters.js';
import './effects-slider.js';
import './upload-photo-form.js';
import { showLoadingDataError } from './error.js';
import { createSlider } from './effects-slider.js';
import { fillPictures } from './big-miniature-render.js';

initImgUploadForm ();
createSlider();


getData()
  .then((photos) => {
    renderPictures(photos);
    fillPictures(photos);
  }
  )
  .catch(() => {
    showLoadingDataError();
  });
