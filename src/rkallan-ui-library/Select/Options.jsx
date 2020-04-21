import React from "react";

const Options = (options) => {
    return Object.keys(options).map((key) => {
        const { id, text, attributes } = options[key];
        return (
            <option key={id} {...attributes}>
                {text}
            </option>
        );
    });
};

export default Options;
