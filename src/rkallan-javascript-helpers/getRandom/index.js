const getRandomInt = (minimal = 0, maximum = 1, maximumIncluded = false) => {
    const ceilMinimal = Math.ceil(minimal);
    const floorMaximum = Math.floor(maximum);
    const addToCalculate = Number(maximumIncluded);

    return Math.floor(Math.random() * (floorMaximum - ceilMinimal + addToCalculate)) + ceilMinimal;
};

const getRandomAlphanumericInsensitive = () => {
    return Math.random().toString(36).split(".").reverse()[0];
};

export { getRandomInt, getRandomAlphanumericInsensitive };
