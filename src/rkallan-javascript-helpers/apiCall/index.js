import requestOptions from "../requestOptions";
import handleResponse from "../handleResponse";

const apiCall = async (url, bodyOptions = {}, apiCallOptions = {}) => {
    const apiRequestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        cache: "default",
        mode: "same-origin",
        redirect: "follow",
        referrer: "no-referrer",
        ...apiCallOptions,
    };

    const apiResult = await fetch(url, requestOptions(bodyOptions, apiRequestOptions))
        .then(handleResponse)
        .then((response) => {
            if ([4, 5].includes(Array.from(String(response.status), Number)[0])) throw response;

            return response;
        })
        .catch((error) => {
            return error;
        });

    return apiResult;
};
export default apiCall;
