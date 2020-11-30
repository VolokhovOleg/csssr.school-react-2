const CUT_AMOUNT = 5;
let alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
const range = {
  cut: {
    MIN: 0,
    MAX: 28
  },
  paste: {
    MIN: 0,
    MAX: 28
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffleAlphabet() {
  const cutRangeMin = getRandomInt(range.cut.MIN, range.cut.MAX);
  const cutRangeMax = cutRangeMin + CUT_AMOUNT;

  let cut = alphabet.slice(cutRangeMin, cutRangeMax);
  let start = alphabet.slice(0, cutRangeMin);
  let end = alphabet.slice(cutRangeMax);

  let temp = start.concat(end);
  let startTemp = temp.slice(range.paste.MIN, range.paste.MAX);
  let endTemp = temp.slice(range.paste.MAX);

  alphabet = startTemp.concat(cut).concat(endTemp);
  return alphabet;
}

export {shuffleAlphabet};
