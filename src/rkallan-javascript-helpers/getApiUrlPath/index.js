import getType from "../getType";
import getLocalStorageItem from "../getDataFromLocalStorage";

const getApiUrlPath = (url = "") => {
    const isMockData = getLocalStorageItem(process.env.REACT_APP_COOKIE_MOCK_DATA);

    const domain = isMockData && getType(isMockData) === "boolean" ? process.env.PUBLIC_URL : process.env.REACT_APP_SKY_BRIDGE_API;

    return `${domain}${url.trim()}`;
};

const getUrl = (url = "") => {
    return process.env.PUBLIC_URL + url;
};

export { getApiUrlPath, getUrl };
