import CryptoJS, { HmacSHA256 } from "crypto-js";
import getType from "../getType";
import base64Url from "../base64Url";

const createToken = (payloadData, secretKey = "") => {
    if (!payloadData || getType(payloadData) !== "object") return undefined;

    const header = {
        alg: "HS256",
        typ: "JWT",
    };

    const headerString = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    const headerEncoded = base64Url(headerString);

    const payloadString = CryptoJS.enc.Utf8.parse(JSON.stringify(payloadData));
    const payloadEncoded = base64Url(payloadString);

    const encodedString = `${headerEncoded}.${payloadEncoded}`;
    const signature = HmacSHA256(encodedString, secretKey);
    const signatureEncoded = base64Url(signature);

    return `${encodedString}.${signatureEncoded}`;
};

const decodeToken = (jwtToken) => {
    const getDataFromToken = (encodedAsBase64Url) => {
        if (!encodedAsBase64Url || getType(encodedAsBase64Url) !== "string") return undefined;

        return JSON.parse(atob(encodedAsBase64Url));
    };

    const [headerEncoded, payloadEncoded] = jwtToken.split(".");
    const [header, payload] = [headerEncoded, payloadEncoded].map(getDataFromToken);

    return {
        header,
        payload,
    };
};

export { createToken, decodeToken };
