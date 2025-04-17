import { sendData } from './api';
import { showSuccessMessage } from './submit-message';
import { showLoadingDataError } from './error';
import { initScale, resetScale } from './scale-control.js';
import { resetEffect, initEffect } from './effects-slider.js';
import { isEscapeKey } from './util.js';
import { initPristineValidation, pristine } from './validation-prestine.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const imgUploadSection = document.querySelector('.img-upload');
const imgUploadForm = imgUploadSection.querySelector('.img-upload__form');
const imgUploadInput = imgUploadSection.querySelector('.img-upload__input');
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');
const imgUploadOverlay = imgUploadSection.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancelButton = imgUploadSection.querySelector('.img-upload__cancel');
const textHashtag = imgUploadSection.querySelector('.text__hashtags');
const textDescription = imgUploadSection.querySelector('.text__description');
const submitButton = imgUploadSection.querySelector('.img-upload__submit');
const effectsPreview = imgUploadSection.querySelectorAll('.effects__preview');

function onDocumentEscKeydown (evt){
  if (!isEscapeKey(evt)) {
    return;
  }
  evt.preventDefault();
  const INPUT_FIELDS = [textHashtag, textDescription];
  if (INPUT_FIELDS.includes(document.activeElement)) {
    evt.stopPropagation();
    return;
  }
  closeUploadForm();
}

function onImgUploadInputChange () {
  const file = imgUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const url = URL.createObjectURL(file);
    imgUploadPreview.src = url;
    effectsPreview.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${url})`;
    });
  }
  openUploadForm();
}

function openUploadForm () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  imgUploadCancelButton.addEventListener('click', closeUploadForm);
  initScale();
  initEffect();
}

function closeUploadForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadCancelButton.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  imgUploadForm.reset();
  resetScale();
  resetEffect();
}

function blockSubmitButton (){
  submitButton.disabled = true;
}

function unblockSubmitButton () {
  submitButton.disabled = false;
}

const onImgUploadFormSubmit = (onSuccess) => (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  textHashtag.value = textHashtag.value.trim().replaceAll(/\s+/g, ' ');

  blockSubmitButton();

  sendData(new FormData(evt.target))
    .then(onSuccess)
    .then(showSuccessMessage)
    .catch(() => showLoadingDataError)
    .finally(unblockSubmitButton);

};

export function initImgUploadForm () {
  imgUploadInput.addEventListener('change', onImgUploadInputChange);
  imgUploadForm.addEventListener('submit', onImgUploadFormSubmit(closeUploadForm));
  initPristineValidation();
}
