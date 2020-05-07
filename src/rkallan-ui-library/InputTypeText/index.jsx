import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import loadable from "@loadable/component";
import { getValidationTypes, isElementValid, getType, getRandomAlphanumericInsensitive } from "rkallan-javascript-helpers";
import { useDebounce } from "rkallan-react-hooks";

import styles from "./resources/styles/inputTypeText.module.scss";
import exportedStyles from "../resources/styles/exports/_exports.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ `../Icons`));

const buttonTypes = ["button", "reset", "submit"];

const InputTypeText = (props) => {
    const { label, attributes, variant, clearValue } = props;
    const elementAttributes = { ...InputTypeText.defaultProps.elementAttributes, ...attributes };
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());
    const initState = elementAttributes.disabled || elementAttributes.defaultValue || !elementAttributes["data-required"] ? "isValid" : "isEmpty";

    const [validationTypes] = useState(getValidationTypes(elementAttributes["data-required"], elementAttributes["data-validation-types"]));
    const [inputfieldValid, setInputfieldValid] = useState();
    const [containerState, setContainerState] = useState(initState);
    const [inputState, setInputState] = useState(initState);
    const [showPlaceholderLabel, setShowPlaceholderLabel] = useState(!!elementAttributes.defaultValue);
    const [eventType, setEventType] = useState();
    const [previousEventType, setPreviousEventType] = useState();
    const [defaultValue, setDefaultValue] = useState(elementAttributes.defaultValue || "");
    const [currentValue, setCurrentValue] = useState();
    const [inputElement, setInputElement] = useState();
    const containerVariant = [variant];

    if (elementAttributes.disabled) containerVariant.push("disabled");
    if (elementAttributes.readOnly) containerVariant.push("read-only");
    if (buttonTypes.includes(elementAttributes.type)) containerVariant.push("no-placeholder");

    const debouncedCurrentValue = useDebounce(currentValue, 100);
    const opacityValues = {
        from: elementAttributes.disabled || elementAttributes.readOnly ? 0.5 : 0.75,
        show: 1,
        hidden: 0,
    };

    const [animationPlaceholderLabel, setAnimationPlaceholderLabel] = useSpring(() => ({
        from: { opacity: opacityValues.hidden, top: "-3.375rem", color: exportedStyles.colorBigStone },
        to: { opacity: opacityValues.show, top: "-1.5rem", color: exportedStyles.colorBigStone },
    }));

    setAnimationPlaceholderLabel({
        top: showPlaceholderLabel ? "-1.5rem" : "-3.375rem",
        opacity: showPlaceholderLabel ? opacityValues.show : opacityValues.hidden,
        color: containerState === "inValid" ? exportedStyles.colorError : exportedStyles.colorBigStone,
    });

    const [animationInput, setAnimationInput] = useSpring(() => ({
        from: { color: exportedStyles.colorBigStone, opacity: opacityValues.from },
        to: { color: exportedStyles.colorError, opacity: opacityValues.show },
    }));

    setAnimationInput({
        color: containerState === "inValid" ? exportedStyles.colorError : exportedStyles.colorBigStone,
        opacity: containerState === "isEmpty" ? opacityValues.from : opacityValues.show,
    });

    const [animationLabel, setAnimationLabel] = useSpring(() => ({
        from: { opacity: opacityValues.from, color: exportedStyles.colorBigStone },
        to: { opacity: opacityValues.show, color: exportedStyles.colorError },
    }));

    setAnimationLabel({
        opacity: containerState === "inValid" || showPlaceholderLabel ? opacityValues.show : opacityValues.from,
        color: containerState === "inValid" ? exportedStyles.colorError : exportedStyles.colorBigStone,
    });

    const inputEventHandler = (event) => {
        const element = event.target;
        const elementType = element.type;
        const elementValue = elementType === "password" ? element.value : element.value.trim();

        if (!inputElement) setInputElement(element);

        setEventType(event.type);
        setCurrentValue(elementValue);
    };

    const setToDefaultValue = useCallback(() => {
        const { disabled, readOnly } = elementAttributes;
        const elementState = disabled || readOnly ? "isValid" : isElementValid(validationTypes, defaultValue);

        if (inputElement && !buttonTypes.includes(inputElement.type)) inputElement.value = defaultValue;

        setInputfieldValid(elementState);
        setContainerState(elementState);
        setInputState(elementState);
        setShowPlaceholderLabel(defaultValue.length);
    }, [defaultValue, validationTypes, inputElement, elementAttributes]);

    useEffect(() => {
        if (debouncedCurrentValue || debouncedCurrentValue === "") {
            setInputfieldValid(isElementValid(validationTypes, currentValue));
        }
    }, [debouncedCurrentValue, validationTypes, currentValue]);

    useEffect(() => {
        if (eventType !== previousEventType) {
            const validationState = isElementValid(validationTypes, currentValue);
            const isPlaceholderLabelVisible = !!(currentValue && currentValue.length);
            const elementState = validationState === "isEmpty" && currentValue && currentValue.length ? "inValid" : validationState;
            setPreviousEventType(eventType);
            setInputfieldValid(validationState);

            switch (eventType) {
                case "focus":
                case "change":
                    setContainerState("isFocussed");
                    setShowPlaceholderLabel(true);
                    break;
                case "blur":
                default:
                    if (validationState === "isEmpty" && inputElement.type !== "password") {
                        inputElement.value = ".";
                        inputElement.value = "";
                    }

                    setContainerState(elementState);
                    setInputState(elementState);
                    setShowPlaceholderLabel(isPlaceholderLabelVisible);
            }
        }
    }, [eventType, previousEventType, validationTypes, currentValue, inputElement]);

    useEffect(() => {
        setInputState(inputfieldValid);
    }, [inputfieldValid]);

    useEffect(() => {
        const value = elementAttributes.defaultValue || "";
        setDefaultValue(value);
    }, [elementAttributes.defaultValue]);

    useEffect(() => {
        if (defaultValue || clearValue) setToDefaultValue();
    }, [defaultValue, clearValue, setToDefaultValue]);

    return (
        <div className={styles.container} data-is-form-element-container="true" state={containerState} variant={containerVariant.join(" ")}>
            {(getType(label.text) === "string" || label.icon) && (
                <animated.label className={styles.label} htmlFor={`${label.for}-${randomAlphanumericInsensitive}`} style={animationLabel}>
                    {label.icon && <Icons icon={label.icon} />}
                    {getType(label.text) === "string" && <div className={styles.text}>{label.text}</div>}
                </animated.label>
            )}

            <div className={styles.inputContainer}>
                <animated.input
                    id={`${label.for}-${randomAlphanumericInsensitive}`}
                    className={styles.input}
                    onChange={inputEventHandler}
                    onFocus={inputEventHandler}
                    onBlur={inputEventHandler}
                    {...elementAttributes}
                    state={inputState || containerState}
                    style={animationInput}
                />
                {!buttonTypes.includes(elementAttributes.type) && (
                    <animated.label className={styles.placeholder} htmlFor={`${label.for}-${randomAlphanumericInsensitive}`} style={animationPlaceholderLabel}>
                        {elementAttributes.placeholder}
                    </animated.label>
                )}
            </div>
        </div>
    );
};

InputTypeText.defaultProps = {
    state: "isValid",
    attributes: {
        "data-required": false,
        type: "text",
        state: "isValid",
        disabled: false,
        readOnly: false,
        defaultValue: undefined,
    },
    variant: "color-big-stone",
    clearValue: false,
};

InputTypeText.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
    }).isRequired,
    state: PropTypes.oneOf(["isEmpty", "isValid", "isFocussed"]),
    attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["text", "password", "email", "number", "tel", "url", "date", "button", "submit", "reset"]).isRequired,
        autoComplete: PropTypes.string,
        "data-required": PropTypes.bool,
        "data-validation-types": PropTypes.string,
        state: PropTypes.oneOf(["isEmpty", "isValid", "isFocussed"]),
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
    }),
    variant: PropTypes.oneOf(["color-big-stone"]),
    clearValue: PropTypes.bool,
};

export default InputTypeText;
