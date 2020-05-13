import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { getRandomAlphanumericInsensitive, getValidationTypes, isElementValid, getValueOfElement } from "rkallan-javascript-helpers";

import styles from "./resources/styles/select.module.scss";
import OptionGroup from "./OptionGroup";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ `../Icons`));

const Select = ({ label, attributes, optionGroup, variant, clearValue, defaultValue }) => {
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());
    const [validationTypes] = useState(getValidationTypes(attributes["data-required"], attributes["data-validation-types"]));
    const initState = attributes.disabled || attributes.readOnly || defaultValue || !attributes["data-required"] ? "isValid" : "isEmpty";
    const [containerState, setContainerState] = useState(initState);
    const [selectState, setSelectState] = useState(initState);
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [eventType, setEventType] = useState();
    const [previousEventType, setPreviousEventType] = useState();
    const containerVariant = [variant];

    if (attributes.disabled) containerVariant.push("disabled");
    if (attributes.readOnly) containerVariant.push("read-only");

    const selectEventHandler = (event) => {
        const currentEventType = event.type;

        if (currentEventType === "focus" && eventType === "blur") return;
        if (eventType !== currentEventType) setEventType(currentEventType);

        if (currentEventType === "focus") return;

        const element = event.currentTarget;
        const value = getValueOfElement.select(element);
        setCurrentValue(value);
    };

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
        if (clearValue || defaultValue) {
            const elementState = defaultValue ? isElementValid(validationTypes, defaultValue) : "isEmpty";
            setContainerState(elementState);
            setSelectState(elementState);

            if (clearValue) setCurrentValue(defaultValue);
        }
    }, [clearValue, defaultValue, validationTypes]);

    return (
        <div className={styles.container} data-is-form-element-container="true" state={containerState} variant={containerVariant.join(" ")}>
            <div className={styles.unit}>
                <label className={styles.label} htmlFor={`${label.for}-${randomAlphanumericInsensitive}`}>
                    <span className={styles.placeholder}>{label.text}</span>
                </label>
                <div className={styles["select-container"]}>
                    <select
                        className={styles.select}
                        id={`${label.for}-${randomAlphanumericInsensitive}`}
                        {...attributes}
                        onBlur={selectEventHandler}
                        onFocus={selectEventHandler}
                        onChange={selectEventHandler}
                        onClick={selectEventHandler}
                        onKeyUp={selectEventHandler}
                        state={selectState}
                        value={currentValue}
                    >
                        {optionGroup.map((group) => {
                            const { id } = group;
                            return <OptionGroup key={id} {...group} />;
                        })}
                    </select>
                    {!attributes.multiple && (
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
        "data-required": PropTypes.bool,
        "data-validation-types": PropTypes.string,
    }),
    variant: PropTypes.oneOf(["color-big-stone"]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
    clearValue: PropTypes.bool,
};

export default Select;
