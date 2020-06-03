import { useEffect, useState } from "react";

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

    useEffect(() => {
        const onMoveHandler = (event) => setMousePosition({ mouseX: event.clientX, mouseY: event.clientY });

        window.addEventListener("mousemove", onMoveHandler);
        window.addEventListener("touchmove", onMoveHandler);
        return () => {
            window.removeEventListener("mousemove", onMoveHandler);
            window.removeEventListener("touchmove", onMoveHandler);
        };
    }, []);

    return mousePosition;
};

export default useMousePosition;
