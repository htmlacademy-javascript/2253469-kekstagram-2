export const getRandomInt = (photos, count) => {
  const availablePhotos = [...photos];
  const randomPhotos = [];
  while (randomPhotos.length < count && availablePhotos.length > 0) {
    const randomIndex = Math.floor(Math.random() * availablePhotos.length);
    randomPhotos.push(availablePhotos.splice(randomIndex, 1)[0]);
  }
  return randomPhotos;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export function debounce (callback, timeoutDelay){
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


