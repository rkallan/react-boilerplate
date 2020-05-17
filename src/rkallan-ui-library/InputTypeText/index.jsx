import React, { useEffect, useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import loadable from "@loadable/component";
import { getValidationTypes, isElementValid, getType, getRandomAlphanumericInsensitive } from "rkallan-javascript-helpers";
import { useDebounce } from "rkallan-react-hooks";

import styles from "./resources/styles/inputTypeText.module.scss";
import exportedStyles from "../resources/styles/exports/_exports.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ `../Icons`));

const buttonTypes = ["button", "reset", "submit"];

const InputTypeText = ({ label, attributes, variant, clearValue, defaultValue }) => {
    const inputElementRef = useRef();
    const elementAttributes = { ...InputTypeText.defaultProps.attributes, ...attributes };
    const { disabled, readOnly } = elementAttributes;
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());
    const initState = disabled || readOnly || !elementAttributes["data-required"] ? "isValid" : "isEmpty";

    const [validationTypes] = useState(getValidationTypes(elementAttributes["data-required"], elementAttributes["data-validation-types"]));
    const [inputfieldValid, setInputfieldValid] = useState();
    const [containerState, setContainerState] = useState(initState);
    const [inputState, setInputState] = useState(initState);
    const [showPlaceholderLabel, setShowPlaceholderLabel] = useState(!!elementAttributes.defaultValue);
    const [eventType, setEventType] = useState();
    const [previousEventType, setPreviousEventType] = useState();
    const [currentValue, setCurrentValue] = useState(defaultValue);
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

        setEventType(event.type);
        setCurrentValue(elementValue);
    };

    const labelOnMouseDownHandler = (event) => event.preventDefault();

    const setToDefaultValue = useCallback(() => {
        const elementState = disabled || readOnly ? "isValid" : isElementValid(validationTypes, defaultValue);

        setCurrentValue(defaultValue);
        setInputfieldValid(elementState);
        setContainerState(elementState);
        setInputState(elementState);
        setShowPlaceholderLabel(!!defaultValue);
    }, [disabled, readOnly, validationTypes, defaultValue]);

    useEffect(() => {
        if (inputElementRef.current) setInputElement(inputElementRef.current);
    }, [inputElementRef]);

    useEffect(() => {
        if (debouncedCurrentValue || debouncedCurrentValue === "") {
            const elementState = disabled || readOnly ? "isValid" : isElementValid(validationTypes, currentValue);
            setInputfieldValid(elementState);
        }
    }, [debouncedCurrentValue, validationTypes, currentValue, disabled, readOnly]);

    useEffect(() => {
        if (eventType !== previousEventType) {
            const validationState = isElementValid(validationTypes, currentValue);
            const elementState = validationState === "isEmpty" && currentValue && currentValue.length ? "inValid" : validationState;
            setPreviousEventType(eventType);
            setInputState(validationState);

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
                    setShowPlaceholderLabel(!!(currentValue && currentValue.length));
            }
        }
    }, [eventType, previousEventType, validationTypes, currentValue, inputElement]);

    useEffect(() => {
        setInputState(inputfieldValid);
    }, [inputfieldValid]);

    useEffect(() => {
        if (clearValue || defaultValue) setToDefaultValue();
    }, [clearValue, defaultValue, setToDefaultValue]);

    return (
        <div className={styles.container} state={containerState} variant={containerVariant.join(" ")}>
            {(getType(label.text) === "string" || label.icon) && (
                <animated.label
                    className={styles.label}
                    htmlFor={`${label.for}-${randomAlphanumericInsensitive}`}
                    style={animationLabel}
                    onMouseDown={labelOnMouseDownHandler}
                >
                    {label.icon && <Icons icon={label.icon} />}
                    {getType(label.text) === "string" && <div className={styles.text}>{label.text}</div>}
                </animated.label>
            )}

            <div className={styles.inputContainer}>
                <animated.input
                    ref={inputElementRef}
                    id={`${label.for}-${randomAlphanumericInsensitive}`}
                    className={styles.input}
                    style={animationInput}
                    onChange={inputEventHandler}
                    onFocus={inputEventHandler}
                    onBlur={inputEventHandler}
                    {...elementAttributes}
                    state={inputState || containerState}
                    tabIndex={elementAttributes.disabled || elementAttributes.readOnly ? -1 : null}
                    value={buttonTypes.includes(elementAttributes.type) && currentValue === "" ? undefined : currentValue}
                />
                {!buttonTypes.includes(elementAttributes.type) && (
                    <animated.label
                        className={styles.placeholder}
                        htmlFor={`${label.for}-${randomAlphanumericInsensitive}`}
                        style={animationPlaceholderLabel}
                        onMouseDown={labelOnMouseDownHandler}
                    >
                        {elementAttributes.placeholder}
                    </animated.label>
                )}
            </div>
        </div>
    );
};

InputTypeText.defaultProps = {
    attributes: {
        type: "text",
        autoComplete: "off",
        autoFocus: false,
        "data-required": false,
        "data-validation-types": undefined,
        disabled: false,
        readOnly: false,
    },
    defaultValue: "",
    variant: "color-big-stone",
    clearValue: false,
};

InputTypeText.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
    }).isRequired,
    attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["text", "password", "email", "number", "tel", "url", "date", "button", "submit", "reset"]),
        autoComplete: PropTypes.string,
        autoFocus: PropTypes.bool,
        "data-required": PropTypes.bool,
        "data-validation-types": PropTypes.string,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
    }),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    variant: PropTypes.oneOf(["color-big-stone"]),
    clearValue: PropTypes.bool,
};

export default InputTypeText;
