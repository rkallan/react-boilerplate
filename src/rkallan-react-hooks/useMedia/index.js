import { useEffect, useState, useCallback } from "react";

const useMedia = (queries, values, defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    const mediaQueryLists = queries.map((query) => window.matchMedia(query));

    const getValue = useCallback(() => {
        const index = mediaQueryLists.findIndex((mediaQueryList) => mediaQueryList.matches);

        return typeof values[index] !== "undefined" ? values[index] : defaultValue;
    }, [mediaQueryLists, values, defaultValue]);

    useEffect(() => {
        setValue(getValue);
        const handler = () => setValue(getValue);

        mediaQueryLists.forEach((mediaQueryList) => mediaQueryList.addListener(handler));

        return () => mediaQueryLists.forEach((mediaQueryList) => mediaQueryList.removeListener(handler));
    }, [getValue, mediaQueryLists]);

    return value;
};

export default useMedia;
