import { mockPhotos } from './data.js';
import { renderPictures } from './miniatures.js';
import './miniature-render.js';
import { initUploadModal } from './upload-photo-form.js';

renderPictures(mockPhotos);
initUploadModal ();

