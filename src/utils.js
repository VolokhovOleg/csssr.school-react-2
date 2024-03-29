const CUT_AMOUNT = 5;
let alphabet = [
  `а`,
  `б`,
  `в`,
  `г`,
  `д`,
  `е`,
  `ё`,
  `ж`,
  `з`,
  `и`,
  `й`,
  `к`,
  `л`,
  `м`,
  `н`,
  `о`,
  `п`,
  `р`,
  `с`,
  `т`,
  `у`,
  `ф`,
  `х`,
  `ц`,
  `ч`,
  `ш`,
  `щ`,
  `ь`,
  `ы`,
  `ъ`,
  `э`,
  `ю`,
  `я`
];
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

function shuffleByUser(string) {
  const stringByUser = string.replace(/([^а-яё])/gi, "").toLowerCase();
  alphabet = [...stringByUser, ...alphabet];
  alphabet = [...new Set(alphabet)];
  return alphabet;
}

function shuffleAlphabet() {
  const cutRangeMin = getRandomInt(range.cut.MIN, range.cut.MAX);
  const cutRangeMax = cutRangeMin + CUT_AMOUNT;

  const cut = alphabet.slice(cutRangeMin, cutRangeMax);
  const start = alphabet.slice(0, cutRangeMin);
  const end = alphabet.slice(cutRangeMax);

  const temp = start.concat(end);
  const startTemp = temp.slice(range.paste.MIN, range.paste.MAX);
  const endTemp = temp.slice(range.paste.MAX);

  alphabet = startTemp.concat(cut).concat(endTemp);
  return alphabet;
}

const shallowEqual = (objA, objB) => {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);
  const len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (let i = 0; i < len; i += 1) {
    const key = aKeys[i];
    if (objA[key].length === 0 && objB[key].length === 0) {
      return true;
    }
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};

export { shallowEqual, shuffleAlphabet, shuffleByUser };
