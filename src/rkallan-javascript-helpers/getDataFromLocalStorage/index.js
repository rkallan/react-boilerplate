import { validations } from "../validations";

const getLocalStorageItem = (key) => {
    const value = localStorage.getItem(key);

    if (!validations.isNotEmpty(value)) return undefined;

    const parseValue = validations.parseToJSON(value);

    return parseValue ? JSON.parse(value) : value;
};

export default getLocalStorageItem;
