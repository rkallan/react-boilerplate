import { useState, useCallback } from "react";

const useBoolean = (booleanState) => {
    const [value, setValue] = useState(booleanState);

    const toggle = useCallback(() => setValue((prevValue) => !prevValue), []);

    const set = () => {
        setValue(booleanState);
    };

    const setTrue = () => {
        setValue(true);
    };

    const setFalse = () => {
        setValue(false);
    };

    return {
        ...value,
        ...set,
        ...toggle,
        ...setTrue,
        ...setFalse,
    };
};

export default useBoolean;
