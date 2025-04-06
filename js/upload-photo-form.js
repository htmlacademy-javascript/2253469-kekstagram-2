import { sendData } from './api';
import { showSuccessMessage } from './submit-message';
import { showLoadingDataError } from './error';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text-hashtags');
const commentInput = uploadForm.querySelector('.text-description');
const submitButton = document.querySelector('#upload-submit');

function onPhotoEditorResetBtnClick () {
  closePhotoEditor();
}

function onEscKeydown (evt) {
  if (evt.ket === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
}

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  photoEditorResetBtn.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

export function initUploadModal () {
  uploadFileControl.addEventListener ('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown' , onEscKeydown);
  });
}

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(hashtagInput, (value) => {
  const hashtag = /^#[a-zа-я0-9]{1,19}$/i.test(value);
  return hashtag;
});

pristine.addValidator(commentInput, (value) => {
  const comment = /[a-zа-я0-9]{0,140}$/i.test(value);
  return comment;
});

function blockSubmitButton () {
  submitButton.disabled = true;
}

function unblockSubmitButton () {
  submitButton.disabled = false;
}

blockSubmitButton();

const setImgUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(!pristine.validate()) {
      return;
    }
    hashtagInput.value = hashtagInput.value.trim().replaceAll(/\s+/g, ' ');

    blockSubmitButton();

    sendData(new FormData(evt.target))
      .then(onSuccess)
      .then(showSuccessMessage)
      .catch(() => {
        showLoadingDataError();
      })
      .finally(unblockSubmitButton);
  });
};

setImgUploadFormSubmit(closePhotoEditor);

uploadFileControl.addEventListener('change', initUploadModal);

