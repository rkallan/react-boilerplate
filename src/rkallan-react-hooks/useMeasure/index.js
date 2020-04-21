import { useState, useLayoutEffect, useRef } from "react";
import ResizeObserver from "resize-observer-polyfill";

const useMeasure = () => {
    const ref = useRef();
    const [bounds, set] = useState({
        x: 0,
        y: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 0,
        height: 0,
    });

    const [ro] = useState(
        () =>
            new ResizeObserver(([entry]) => {
                set(entry.target.getBoundingClientRect());
            })
    );

    useLayoutEffect(() => {
        if (ref.current === null) {
            return;
        }

        if (ref && ref.current) {
            ro.observe(ref.current);
        }
        return () => ro.disconnect();
    }, [ref, ro]);

    return [{ ref }, bounds];
};

export default useMeasure;
