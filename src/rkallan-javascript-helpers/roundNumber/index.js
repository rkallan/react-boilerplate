import { validations } from "../validations";

const round = (value, precision, type) => {
    if (!validations.number(value)) return undefined;

    const currentNumber = parseFloat(value);
    let roundType = "round";
    switch (type) {
        case "nearest":
            roundType = "round";
            break;
        case "up":
            roundType = "ceil";
            break;
        case "down":
            roundType = "floor";
            break;
        default:
            break;
    }

    return Math[roundType](currentNumber / precision) * precision;
};

const roundNearest = (value, precision = 1) => {
    return round(value, precision, "nearest");
};

const roundDown = (value, precision = 1) => {
    return round(value, precision, "down");
};

const roundUp = (value, precision = 1) => {
    return round(value, precision, "up");
};

export { roundNearest, roundDown, roundUp };
