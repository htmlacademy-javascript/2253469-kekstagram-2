import { mockPhotos } from './data.js';
import { renderPictures } from './miniatures.js';
import './miniature-render.js';
import { initUploadModal } from './upload-photo-form.js';
import './form-filters.js';
import './effects-slider.js';
import './upload-photo-form.js';

renderPictures(mockPhotos);
initUploadModal ();

