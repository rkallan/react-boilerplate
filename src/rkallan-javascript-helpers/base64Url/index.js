import CryptoJS from "crypto-js";
import getType from "../getType";

const base64Url = (utf8WordArray) => {
    if ("words" in utf8WordArray && "sigBytes" in utf8WordArray && getType(utf8WordArray.words) === "array" && getType(utf8WordArray.sigBytes) === "number") {
        const base64Encoded = CryptoJS.enc.Base64.stringify(utf8WordArray);
        const base64UrlEncoded = base64Encoded.replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

        return base64UrlEncoded;
    }

    return undefined;
};

export default base64Url;
