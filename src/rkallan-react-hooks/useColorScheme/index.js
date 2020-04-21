import { useEffect, useMemo } from "react";
import useLocalStorage from "../useLocalStorage";
import useMedia from "../useMedia";

const usePrefersColorScheme = () => {
    return useMedia(["(prefers-color-scheme: dark)"], ["dark-mode"], "light-mode");
};

const useColorScheme = () => {
    const [getColorScheme, setColorScheme] = useLocalStorage("colorScheme");
    const prefersColorScheme = usePrefersColorScheme();

    const colorScheme = useMemo(() => (getColorScheme === undefined ? prefersColorScheme : getColorScheme), [getColorScheme, prefersColorScheme]);

    useEffect(() => {
        if (getColorScheme === undefined) setColorScheme(colorScheme);
    }, [getColorScheme, colorScheme, setColorScheme]);

    return useMemo(() => [colorScheme, setColorScheme], [colorScheme, setColorScheme]);
};

export default useColorScheme;
