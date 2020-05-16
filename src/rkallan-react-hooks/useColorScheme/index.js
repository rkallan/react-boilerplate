import { useEffect, useState } from "react";
import useLocalStorage from "../useLocalStorage";
import useMedia from "../useMedia";

const usePrefersColorScheme = () => {
    return useMedia(["(prefers-color-scheme: dark)"], ["dark-mode"], "light-mode");
};

const useColorScheme = () => {
    const [getColorScheme, setColorScheme] = useLocalStorage("colorScheme");
    const [prefersColorScheme] = useState(usePrefersColorScheme());

    useEffect(() => {
        if (getColorScheme === undefined) setColorScheme(prefersColorScheme);
    }, [getColorScheme, prefersColorScheme, setColorScheme]);

    return [getColorScheme, setColorScheme];
};

export default useColorScheme;
