function checkStringLength (string, length) {
  return string.length <= length;
}

checkStringLength('hello world', 3);

const isPalindrom = (string) => {
  string = string.replaceAll(' ', '').toLoweCase();

  let reversedLine = '';

  for (let i = string.length - 1 ; i >= 0; i--) {
    reversedLine += string[i];
  }
  return string === reversedLine;
};

isPalindrom('hello');


