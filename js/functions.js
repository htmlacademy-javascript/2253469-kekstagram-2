function makeString (string, length) {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
}

makeString();

const ifPalindrom = (string) => {
  string = string.replaceAll(' ', '').toLoweCase();

  let reversedLine = '';

  for (let i = string.length - 1 ; i >= 0; i--) {
    reversedLine += string[i];
  }
  return string === reversedLine;
};

ifPalindrom();


