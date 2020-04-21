const getType = (value) => {
    const type = Object.prototype.toString.call(value).slice(1, -1).split(" ");

    return type && type[1].toLowerCase();
};

export default getType;
