import { useState } from "react";
import { useLocation } from "react-router-dom";

const useQueryParam = () => {
    const covertQueryParamsToObject = (location) => {
        let paramsAsString = location.search.replace(/^\?+/g, "");
        if (paramsAsString.endsWith("&") === true) {
            paramsAsString = paramsAsString.slice(0, -1);
        }

        const params = paramsAsString.split("&");
        const queryParamsAsObject = {};
        params.forEach((param) => {
            const paramSplitted = param.split("=");
            queryParamsAsObject[paramSplitted[0]] = { ...paramSplitted[1] };
        });
        return queryParamsAsObject;
    };

    const queryParamsAsObject = (location) => {
        return covertQueryParamsToObject(location);
    };

    const location = useLocation();
    const [queryParams, setQueryParams] = useState(queryParamsAsObject(location));

    const getQueryParam = (key) => {
        return queryParams[key];
    };

    const setQueryParam = (paramsObject) => {
        const currentParamsObject = queryParams;
        const newSourceParamsobject = paramsObject;
        setQueryParams(Object.assign(currentParamsObject, newSourceParamsobject));
    };

    return { queryParams, getQueryParam, setQueryParam };
};

export default useQueryParam;
