import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { getRandomAlphanumericInsensitive, getValidationTypes, isElementValid, getValueOfElement } from "rkallan-javascript-helpers";

import styles from "./resources/styles/select.module.scss";
import OptionGroup from "./OptionGroup";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ `../Icons`));

const Select = ({ label, attributes, optionGroup, variant, clearValue, defaultValue }) => {
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());
    const elementAttributes = { ...Select.defaultProps.attributes, ...attributes };
    const { disabled, readOnly } = elementAttributes;
    const initState = disabled || readOnly || !elementAttributes["data-required"] ? "isValid" : "isEmpty";
    const [validationTypes] = useState(getValidationTypes(elementAttributes["data-required"], elementAttributes["data-validation-types"]));
    const [containerState, setContainerState] = useState(initState);
    const [selectState, setSelectState] = useState(initState);
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [eventType, setEventType] = useState();
    const [previousEventType, setPreviousEventType] = useState();
    const containerVariant = [variant];

    if (elementAttributes.disabled) containerVariant.push("disabled");
    if (elementAttributes.readOnly) containerVariant.push("read-only");

    const selectEventHandler = (event) => {
        const currentEventType = event.type;

        if (currentEventType === "focus" && eventType === "blur") return;
        if (eventType !== currentEventType) setEventType(currentEventType);

        if (currentEventType === "focus") return;

        const element = event.currentTarget;
        const value = getValueOfElement.select(element);
        setCurrentValue(value);
    };

    const setToDefaultValue = useCallback(() => {
        const elementState = disabled || readOnly ? "isValid" : isElementValid(validationTypes, defaultValue);

        setContainerState(elementState);
        setSelectState(elementState);
        setCurrentValue(defaultValue);
    }, [disabled, readOnly, validationTypes, defaultValue]);

    useEffect(() => {
        if (eventType !== previousEventType) {
            const validationState = isElementValid(validationTypes, currentValue);
            setPreviousEventType(eventType);
            setSelectState(validationState);

            switch (eventType) {
                case "focus":
                case "change":
                case "click":
                case "keyup":
                    setContainerState("isFocussed");
                    break;
                case "blur":
                default:
                    setContainerState(validationState);
            }
        }
    }, [currentValue, eventType, previousEventType, validationTypes]);

    useEffect(() => {
        if (clearValue || defaultValue) setToDefaultValue();
    }, [clearValue, defaultValue, setToDefaultValue]);

    return (
        <div className={styles.container} state={containerState} variant={containerVariant.join(" ")}>
            <div className={styles.unit}>
                <label className={styles.label} htmlFor={`${label.for}-${randomAlphanumericInsensitive}`}>
                    <span className={styles.placeholder}>{label.text}</span>
                </label>
                <div className={styles["select-container"]}>
                    <select
                        id={`${label.for}-${randomAlphanumericInsensitive}`}
                        className={styles.select}
                        onBlur={selectEventHandler}
                        onFocus={selectEventHandler}
                        onChange={selectEventHandler}
                        onClick={selectEventHandler}
                        onKeyUp={selectEventHandler}
                        {...elementAttributes}
                        state={selectState}
                        value={currentValue}
                    >
                        {optionGroup.map((group) => {
                            const { id } = group;
                            return <OptionGroup key={id} {...group} />;
                        })}
                    </select>
                    {!elementAttributes.multiple && (
                        <div className={styles.carrot}>
                            <Icons icon="arrowDown" variant="small" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Select.defaultProps = {
    attributes: {
        multiple: false,
        "data-required": false,
        "data-validation-types": undefined,
        disabled: false,
        readOnly: false,
        autoFocus: false,
    },
    variant: "color-big-stone",
    clearValue: false,
    defaultValue: undefined,
};

Select.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        text: PropTypes.string,
    }).isRequired,
    optionGroup: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    text: PropTypes.string.isRequired,
                    attributes: PropTypes.shape({
                        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
                        disabled: PropTypes.bool,
                        hidden: PropTypes.bool,
                    }),
                })
            ).isRequired,
            map: PropTypes.func,
        })
    ).isRequired,
    attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        autoFocus: PropTypes.bool,
        "data-required": PropTypes.bool,
        "data-validation-types": PropTypes.string,
    }),
    variant: PropTypes.oneOf(["color-big-stone"]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
    clearValue: PropTypes.bool,
};

export default Select;
