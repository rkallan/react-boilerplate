import React, { useState } from "react";
import PropTypes from "prop-types";
import { getRandomAlphanumericInsensitive } from "rkallan-javascript-helpers";

import styles from "./resources/styles/inputTypeRange.module.scss";

const InputTypeRange = (props) => {
    const { label, variant, attributes } = props;
    const elementAttributes = { ...InputTypeRange.defaultProps.attributes, ...attributes };
    const [rangeValue, setRangeValue] = useState(100);
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());

    const onChangeHandler = (event) => {
        event.preventDefault();
        const element = event.currentTarget;
        if (elementAttributes.onChange) elementAttributes.onChange(element);

        setRangeValue(element.value);
    };

    return (
        <div className={styles.container} variant={variant}>
            {label.text && (
                <label htmlFor={`${label.for}-${randomAlphanumericInsensitive}`} className={styles.label}>
                    {label.text}
                </label>
            )}
            <div className={styles.unit}>
                <input
                    className={styles.inputRange}
                    type="range"
                    id={`${label.for}-${randomAlphanumericInsensitive}`}
                    onChange={onChangeHandler}
                    defaultValue={elementAttributes.defaultValue}
                    min={elementAttributes.min}
                    max={elementAttributes.max}
                    step={elementAttributes.step}
                />
            </div>
            <output className={styles.value}>
                {rangeValue}
                {elementAttributes.unit && elementAttributes.unit}
            </output>
        </div>
    );
};

InputTypeRange.defaultProps = {
    attributes: {
        type: "range",
        state: "isValid",
        disabled: false,
        defaultValue: 0,
        min: 0,
        max: 100,
        step: 1,
        unit: null,
    },
    variant: "color-big-stone",
};

InputTypeRange.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
    }).isRequired,
    attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["range"]).isRequired,
        className: PropTypes.string,
        state: PropTypes.oneOf(["isEmpty", "isValid", "isFocused"]),
        readonly: PropTypes.bool,
        disabled: PropTypes.bool,
        defaultValue: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        unit: PropTypes.string,
        onChange: PropTypes.func,
    }),
    variant: PropTypes.oneOf(["color-white", "color-sky-blue", "color-big-stone", "color-la-rioja", "color-lipstick"]),
};

export default InputTypeRange;
