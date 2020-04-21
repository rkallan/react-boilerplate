import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import loadable from "@loadable/component";
import { getValidationTypes, isElementValid, getType, getRandomAlphanumericInsensitive } from "rkallan-javascript-helpers";
import { useDebounce } from "rkallan-react-hooks";

import styles from "./resources/styles/inputTypeText.module.scss";
import exportedStyles from "../resources/styles/exports/_exports.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ `../Icons`));

const InputTypeText = (props) => {
    const { state, label, variant, clearValue, attributes } = props;
    const elementAttributes = { ...InputTypeText.defaultProps.attributes, attributes };
    const inputFieldRef = useRef(null);
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());

    const [currentValue, setCurrentValue] = useState();
    const [validationTypes] = useState(getValidationTypes(attributes["data-required"], attributes["data-validation-types"]));
    const [showPlaceholderLabel, setShowPlaceholderLabel] = useState(!!elementAttributes.defaultValue);
    const [containerState, setContainerState] = useState(
        elementAttributes.disabled || elementAttributes.defaultValue || !attributes["data-required"] ? "isValid" : state
    );
    const [inputfieldValid, setInputfieldValid] = useState();
    const [inputState, setInputState] = useState(elementAttributes.state);
    const [eventType, setEventType] = useState();
    const [previousEventType, setPreviousEventType] = useState();
    const [defaultValue, setDefaultValue] = useState(elementAttributes.defaultValue);

    const debouncedCurrentValue = useDebounce(currentValue, 100);

    const { animationPlaceholderLabel } = useSpring({
        from: { animationPlaceholderLabel: 0 },
        animationPlaceholderLabel: showPlaceholderLabel ? 1 : 0,
    });

    const { animationErrorState } = useSpring({
        from: { animationErrorState: 0 },
        animationErrorState: containerState === "inValid" ? 1 : 0,
    });

    const opacityValues = {
        from: elementAttributes.disabled ? 0.5 : 0.75,
        show: 1,
        hidden: 0,
    };

    const opacityAnimation = containerState === "inValid" ? animationErrorState : animationPlaceholderLabel;

    const inputEventHandler = (event) => {
        const inputElement = event.target;
        const inputElementValue = inputElement.value.trim();

        setCurrentValue(inputElementValue);
        setEventType(event.type);
    };

    const setInputValue = (value) => {
        const inputfieldElement = inputFieldRef.current;
        inputfieldElement.value = value;
    };

    useEffect(() => {
        if (defaultValue) {
            const inputfieldValidation = isElementValid(validationTypes, defaultValue);
            setInputValue(defaultValue);
            setInputfieldValid(inputfieldValidation);
            setContainerState(inputfieldValidation);
            setShowPlaceholderLabel(true);
        }
    }, [defaultValue, validationTypes]);

    useEffect(() => {
        if (debouncedCurrentValue || debouncedCurrentValue === "") {
            setInputfieldValid(isElementValid(validationTypes, currentValue));
        }
    }, [debouncedCurrentValue, validationTypes, currentValue]);

    useEffect(() => {
        if (eventType !== previousEventType) {
            const inputfield = inputFieldRef.current;
            const inputfieldValidity = inputfield.checkValidity();
            const validationState = inputfieldValidity ? isElementValid(validationTypes, currentValue) : "inValid";
            const isPlaceholderLabelVisible = inputfieldValidity ? currentValue && currentValue.length : true;
            setPreviousEventType(eventType);
            setInputfieldValid(validationState);

            switch (eventType) {
                case "focus":
                case "key":
                case "keyup":
                case "change":
                    setContainerState("isFocused");
                    setShowPlaceholderLabel(true);
                    break;
                case "blur":
                    setContainerState(validationState);
                    setInputState(validationState);
                    setShowPlaceholderLabel(isPlaceholderLabelVisible);
                    break;
                default:
                    setContainerState(validationState);
                    setShowPlaceholderLabel(isPlaceholderLabelVisible);
            }
        }
    }, [eventType, previousEventType, validationTypes, currentValue]);

    useEffect(() => {
        setInputState(inputfieldValid);
    }, [inputfieldValid]);

    useEffect(() => {
        setDefaultValue(elementAttributes.defaultValue);
    }, [elementAttributes.defaultValue]);

    useEffect(() => {
        if (clearValue) {
            const elementState = isElementValid(validationTypes, defaultValue);
            setInputValue(defaultValue);
            setContainerState(elementState);
            setInputState(elementState);
            setShowPlaceholderLabel(elementState !== "isEmpty");
        }
    }, [clearValue, validationTypes, defaultValue]);

    return (
        <div
            className={styles.container}
            data-is-form-element-container="true"
            state={containerState}
            variant={elementAttributes.disabled ? `${variant} disabled` : variant}
        >
            {getType(label.text) === "string" ||
                (label.icon && (
                    <animated.label
                        className={styles.label}
                        htmlFor={`${label.for}-${randomAlphanumericInsensitive}`}
                        style={{
                            opacity: opacityAnimation.interpolate({
                                output: [opacityValues.from, opacityValues.show],
                            }),
                            color: animationErrorState.interpolate({
                                output: [exportedStyles.colorWhite, exportedStyles.colorError],
                            }),
                        }}
                    >
                        {label.icon && <Icons icon={label.icon} />}
                        {getType(label.text) === "string" && <div className={styles.text}>{label.text}</div>}
                    </animated.label>
                ))}

            <div className={styles.inputContainer}>
                <animated.input
                    ref={inputFieldRef}
                    onChange={inputEventHandler}
                    onFocus={inputEventHandler}
                    onBlur={inputEventHandler}
                    {...attributes}
                    placeholder={elementAttributes.placeholder}
                    className={styles.input}
                    id={`${label.for}-${randomAlphanumericInsensitive}`}
                    state={inputState}
                    style={{
                        color: animationErrorState.interpolate({
                            output: [exportedStyles.colorBigStone, exportedStyles.colorError],
                        }),
                    }}
                />

                <animated.label
                    className={styles.placeholder}
                    htmlFor={`${label.for}-${randomAlphanumericInsensitive}`}
                    style={{
                        opacity: animationPlaceholderLabel.interpolate({
                            output: [opacityValues.hidden, opacityValues.show],
                        }),
                        top: animationPlaceholderLabel.interpolate({
                            range: [0, 0.15, 1],
                            output: ["-3.125rem", "-2rem", "-1.5rem"],
                        }),
                        color: animationErrorState.interpolate({
                            output: [exportedStyles.colorWhite, exportedStyles.colorError],
                        }),
                    }}
                >
                    {elementAttributes.placeholder}
                </animated.label>
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
    },
    variant: "color-white",
    clearValue: false,
};

InputTypeText.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        icon: PropTypes.string,
        text: PropTypes.string,
    }).isRequired,
    state: PropTypes.oneOf(["isEmpty", "isValid", "isFocused"]),
    attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["text", "password", "email", "number", "tel", "url", "date", "color"]).isRequired,
        className: PropTypes.string,
        autoComplete: PropTypes.string,
        // Needed for custom validation
        "data-required": PropTypes.bool,
        "data-validation-types": PropTypes.string,
        state: PropTypes.oneOf(["isEmpty", "isValid", "isFocused"]),
        readonly: PropTypes.bool,
        disabled: PropTypes.bool,
    }),
    variant: PropTypes.oneOf(["color-white", "color-sky-blue", "color-big-stone", "color-la-rioja", "color-lipstick"]),
    clearValue: PropTypes.bool,
};

export default InputTypeText;