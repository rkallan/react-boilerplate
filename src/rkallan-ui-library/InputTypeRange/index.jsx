import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMeasure } from "rkallan-react-hooks";
import { getRandomAlphanumericInsensitive } from "rkallan-javascript-helpers";
import styles from "./resources/styles/inputTypeRange.module.scss";

const InputTypeRange = ({ attributes, label, output, customEventHandler }) => {
    const { min, max, step, variant, disabled, readOnly } = attributes;
    const [unitRef, unitBounds] = useMeasure();
    const [thumbRef, thumbBounds] = useMeasure();
    const [randomValue] = useState(getRandomAlphanumericInsensitive);
    const [rangeCorrection, setRangeCorrection] = useState(undefined);
    const defaultValue = attributes.defaultValue && attributes.defaultValue <= max && attributes.defaultValue >= min ? attributes.defaultValue : min;
    const [currentValue, setCurrentValue] = useState(defaultValue && defaultValue <= max && defaultValue >= min ? defaultValue : min);
    const [range, setRange] = useState(undefined);
    const [thumbPosition, setThumbPosition] = useState(undefined);
    const [eventType, setEventType] = useState();
    const [previousEventType, setPreviousEventType] = useState();
    const [containerState, setContainerState] = useState("isValid");
    const cssProperty = variant === "vertical" ? "height" : "width";
    const cssPropertyThumb = variant === "vertical" ? "bottom" : "left";
    const containerVariant = [variant];

    if (disabled) containerVariant.push("disabled");
    if (readOnly) containerVariant.push("read-only");

    const inputEventHandler = (event) => {
        const { value } = event.currentTarget;

        setCurrentValue(Number(value));
        setEventType(event.type);

        if (customEventHandler) customEventHandler(event);

        if (event.type === "mouseup") event.currentTarget.blur();
    };

    useEffect(() => {
        if (range === undefined) {
            setRange(Math.abs(min - max));
        }
    }, [range, max, min]);

    useEffect(() => {
        if (unitBounds && thumbBounds) {
            const unitSize = unitBounds[cssProperty];
            const thumbSize = thumbBounds[cssProperty];

            setRangeCorrection((unitSize - thumbSize) / unitSize);
        }
    }, [unitBounds, thumbBounds, cssProperty]);

    useEffect(() => {
        if (currentValue) {
            const rangeValue = Math.abs(currentValue - min);
            setThumbPosition((rangeValue / range) * 100 * rangeCorrection);
        }
    }, [currentValue, min, range, rangeCorrection]);

    useEffect(() => {
        if (eventType !== previousEventType) {
            setPreviousEventType(eventType);

            switch (eventType) {
                case "focus":
                case "change":
                    setContainerState("isFocused");
                    break;
                case "blur":
                case "mouseup":
                    setContainerState("isValid");
                    break;
                default:
                    setContainerState("isValid");
            }
        }
    }, [eventType, previousEventType]);

    return (
        <div className={styles.container} variant={containerVariant.join(" ")} state={containerState}>
            {label && (label.text || label.icon) && (
                <div className={styles.label}>
                    <label htmlFor={`${label.for}-${randomValue}`}>{label.text}</label>
                </div>
            )}
            <div className={styles.unit} {...unitRef} variant={variant}>
                <input
                    id={`${label.for}-${randomValue}`}
                    className={styles.input}
                    type="range"
                    {...attributes}
                    defaultValue={defaultValue}
                    onChange={inputEventHandler}
                    onFocus={inputEventHandler}
                    onBlur={inputEventHandler}
                    onMouseUp={inputEventHandler}
                />
                <div className={styles.rangeTrack}>
                    <div className={styles.track} variant="background" />
                    <div className={styles.track} variant="progress" style={{ [cssProperty]: `calc(${thumbPosition}% + ${thumbBounds[cssProperty]}px)` }} />
                </div>
                <div className={styles.thumb} {...thumbRef} style={{ [cssPropertyThumb]: `${thumbPosition}%` }} />
            </div>
            {output && output.show && (
                <output className={styles.output}>
                    <div className={styles.text} variant={output.prefix ? "prefix" : null}>
                        <span className={styles.value} data-max-value={`${max + step * 2}`}>
                            <span>{output.fixedDecimals === undefined ? currentValue : currentValue.toFixed(output.fixedDecimals)}</span>
                        </span>
                        <span className={styles.unit}>{output.unit}</span>
                    </div>
                </output>
            )}
        </div>
    );
};

InputTypeRange.defaultProps = {
    label: {
        for: "input-range",
        icon: undefined,
        text: undefined,
    },
    attributes: {
        step: 1,
        orient: "horizontal",
        variant: "horizontal",
        disabled: false,
        readOnly: false,
    },
    output: {
        show: true,
        unit: undefined,
        prefix: false,
        fixedDecimals: undefined,
    },
    customEventHandler: undefined,
    clearValue: false,
};

InputTypeRange.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
    }),

    attributes: PropTypes.shape({
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        step: PropTypes.number,
        defaultValue: PropTypes.number,
        name: PropTypes.string.isRequired,
        orient: PropTypes.oneOf(["vertical", "horizontal"]),
        variant: PropTypes.oneOf(["vertical", "horizontal"]),
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
    }),

    output: PropTypes.shape({
        show: PropTypes.bool,
        unit: PropTypes.string,
        prefix: PropTypes.bool,
        fixedDecimals: PropTypes.number,
    }),
    customEventHandler: PropTypes.func,
    clearValue: PropTypes.bool,
};

export default InputTypeRange;
