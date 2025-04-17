import { renderPhotoCards } from './miniatures';
import { getRandomInt, debounce } from './util';


const RANDOM_PHOTOS_NUMBER = 10;
const RERENDER_DELAY = 500;
const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const imgFilters = document.querySelector('.img-filters');
let photosData = [];

let currentFilter = FILTERS.default;

function compareCommentsNumbers (photoA, photoB){
  const photoAComments = photoA.comments.length;
  const photoBComments = photoB.comments.length;
  return photoBComments - photoAComments;
}

function getFilteredPhotos (filterType) {
  switch (filterType) {
    case FILTERS.random:
      return getRandomInt(photosData, RANDOM_PHOTOS_NUMBER);
    case FILTERS.discussed:
      return photosData.slice().sort(compareCommentsNumbers);
    case FILTERS.default:
    default:
      return photosData;
  }
}

const debouncedApplyFilter = debounce((filterType) => {
  const filteredPhotos = getFilteredPhotos(filterType);
  renderPhotoCards(filteredPhotos);
}, RERENDER_DELAY);

function onImgFiltersClick (evt){
  const clickedButton = evt.target.closest('.img-filters__button');
  if (!clickedButton || clickedButton.id === currentFilter) {
    return;
  }
  currentFilter = clickedButton.id;
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  clickedButton.classList.add('img-filters__button--active');
  debouncedApplyFilter(clickedButton.id);
}

export function initFilters (photos){
  photosData = photos;
  imgFilters.addEventListener('click', onImgFiltersClick);
  imgFilters.classList.remove('img-filters--inactive');
}
