import getType from "../getType";

const flattenArray = (dataObject, depth = Infinity) =>
    (["object", "array"].includes(getType(dataObject)) &&
        Object.keys(dataObject).reduce((accumulator, currentValue) => {
            if (["object", "array"].includes(getType(dataObject[currentValue])) && depth > 0) {
                return accumulator.concat(flattenArray(dataObject[currentValue], depth - 1));
            }

            accumulator.push(dataObject[currentValue]);

            return accumulator;
        }, [])) ||
    undefined;

const flattenObject = (dataObject, depth = Infinity, prefix = undefined) =>
    (["object"].includes(getType(dataObject)) &&
        Object.keys(dataObject).reduce((accumulator, currentValue) => {
            const key = prefix ? `${prefix}.${currentValue}` : currentValue;
            if (getType(dataObject[currentValue]) === "object" && depth > 0) {
                return Object.assign(accumulator, flattenObject(dataObject[currentValue], depth - 1, key));
            }

            accumulator[key] = dataObject[currentValue];

            return accumulator;
        }, {})) ||
    undefined;

export { flattenObject, flattenArray };
