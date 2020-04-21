import getType from "../getType";

const ucFirst = (word) => {
    if (getType(word) !== "string") return undefined;

    return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
};

const convertToGivenSeperator = (value, seperator = " ") => {
    if (getType(value) !== "string") return undefined;

    const convertedValue = value
        .replace(/[^a-zA-Z0-9]+/g, seperator)
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/([0-9])([^0-9])/g, "$1-$2")
        .replace(/([^0-9])([0-9])/g, "$1-$2")
        .replace(/-+/g, seperator);

    return ucFirst(convertedValue);
};

const camelCase = (value) => {
    if (getType(value) !== "string") return undefined;

    const valueConvertedToSpace = convertToGivenSeperator(value);
    return valueConvertedToSpace
        .split(/\s/gi)
        .map((word, index) => {
            if (index === 0) return word.toLowerCase();
            return ucFirst(word);
        })
        .join("");
};

const capitalizeFirstLetterWord = (words) => {
    if (getType(words) !== "string") return undefined;

    const wordsConvertedToSpace = convertToGivenSeperator(words);

    return wordsConvertedToSpace
        .split(/\s/gi)
        .map((word) => ucFirst(word))
        .join(" ");
};

export { convertToGivenSeperator, camelCase, capitalizeFirstLetterWord, ucFirst };
