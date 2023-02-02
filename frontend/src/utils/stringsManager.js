// function that given a string by parameter
// returns the string with all words which length is greater than 3
// with the first 3 letters and a dot
// example: "Hello World" -> "Hel. Wor."
export const getAbbString = (string) => {
  const words = string.split(" ");
  const newWords = words.map((word) => {
    if (word.length > 3) {
      return word.slice(0, 3) + ".";
    }
    return word;
  });
  return newWords.join(" ");
};
