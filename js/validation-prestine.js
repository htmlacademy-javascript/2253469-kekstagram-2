const MAX_TEXT_DESCRIPTION_LENGTH = 140;
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
let errorMessage = '';

export const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateTextDescription = () => textDescription.value.length <= MAX_TEXT_DESCRIPTION_LENGTH;

const getErrorMessage = () => errorMessage;

const validateHashtags = () => {
  const MAX_SYMBOLS = 20;
  const MAX_HASHTAGS = 5;
  const hashtags = textHashtags.value.toLowerCase().trim().split(/\s+/);
  errorMessage = '';
  const rules = [
    {
      check: hashtags.some((hashtag) => hashtag === '#'),
      errorMessage: 'Хэштэг не может состоять только из одной решётки'
    },
    {
      check: hashtags.some((hashtag) => hashtag[0] !== '#'),
      errorMessage: 'Хэштэг должен начинаться с решётки'
    },
    {
      check: hashtags.some((hashtag) => hashtag.slice(1).includes('#')),
      errorMessage: 'Хэштэги должны разделяться пробелами'
    },
    {
      check: hashtags.some((hashtag) => hashtag.length > MAX_SYMBOLS),
      errorMessage: `Хэштэг не может быть длинее ${MAX_SYMBOLS} символов, включая решётку`
    },
    {
      check: hashtags.length > MAX_HASHTAGS,
      errorMessage: `Хэштэгов не может быть больше ${MAX_HASHTAGS}`
    },
    {
      check: hashtags.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(hashtag)),
      errorMessage: 'Хэштэг содержит недопустимые символы'
    },
    {
      check: hashtags.some((hashtag, index, hashtagsArray) => hashtagsArray.includes(hashtag, index + 1)),
      errorMessage: 'Хэштэги не могут повторяться'
    },
  ];

  if (textHashtags.value.length === 0) {
    return true;
  }

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.errorMessage;
    }
    return !isInvalid;
  });
};

export function initPristineValidation (){
  pristine.addValidator(textHashtags, validateHashtags, getErrorMessage);
  pristine.addValidator(textDescription, validateTextDescription, `длина комментария не может быть больше ${MAX_TEXT_DESCRIPTION_LENGTH} символов`);
}
