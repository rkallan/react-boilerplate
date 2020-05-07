import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { getRandomAlphanumericInsensitive, getValidationTypes, isElementValid } from "rkallan-javascript-helpers";

import styles from "./resources/styles/select.module.scss";
import OptionGroup from "./OptionGroup";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ `../Icons`));

const Select = (props) => {
    const { label, attributes, optionGroup, variant, clearValue } = props;
    const { defaultValue } = attributes;
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());
    const [validationTypes] = useState(getValidationTypes(attributes["data-required"], attributes["data-validation-types"]));
    const [initState] = useState(attributes.disabled || attributes.readOnly || defaultValue || !attributes["data-required"] ? "isValid" : "isEmpty");
    const [containerState, setContainerState] = useState(initState);
    const [selectState, setSelectState] = useState(initState);
    const [currentValue, setCurrentValue] = useState(defaultValue);
    const [eventType, setEventType] = useState();
    const [previousEventType, setPreviousEventType] = useState();

    const onChangeHandler = (event) => {
        const { value } = event.target;
        setEventType(event.type);

        setCurrentValue(value);
    };

    useEffect(() => {
        setCurrentValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (eventType !== previousEventType) {
            const validationState = isElementValid(validationTypes, currentValue);
            setPreviousEventType(eventType);
            setSelectState(validationState);

            switch (eventType) {
                case "focus":
                case "change":
                case "click":
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
            const elementState = initState;
            setContainerState(elementState);
            setSelectState(elementState);
            setCurrentValue(defaultValue);
        }
    }, [clearValue, defaultValue, initState]);

    return (
        <div
            className={styles.container}
            data-is-form-element-container="true"
            state={containerState}
            variant={attributes.disabled ? `${variant} disabled` : variant}
        >
            <div className={styles.unit}>
                <label className={styles.label} htmlFor={`${label.for}-${randomAlphanumericInsensitive}`}>
                    <span className={styles.placeholder}>{label.text}</span>
                </label>
                <div className={styles["select-container"]}>
                    <select
                        className={styles.select}
                        id={`${label.for}-${randomAlphanumericInsensitive}`}
                        {...attributes}
                        onChange={onChangeHandler}
                        onBlur={onChangeHandler}
                        onFocus={onChangeHandler}
                        onClick={onChangeHandler}
                        state={selectState}
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
    state: "isValid",
    attributes: {
        multiple: false,
        "data-required": false,
        state: "isValid",
        disabled: false,
        defaultValue: undefined,
    },
    variant: "color-big-stone",
    clearValue: false,
};

Select.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        text: PropTypes.string,
    }).isRequired,
    optionGroup: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    text: PropTypes.string,
                    attributes: PropTypes.shape({
                        value: PropTypes.any,
                    }),
                })
            ).isRequired,
            map: PropTypes.func,
        })
    ).isRequired,
    attributes: PropTypes.shape({
        name: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array]),
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        "data-required": PropTypes.bool,
        "data-validation-types": PropTypes.string,
        state: PropTypes.oneOf(["isEmpty", "isValid", "inValid"]),
    }),
    state: PropTypes.oneOf(["isEmpty", "isValid", "isFocussed"]),
    variant: PropTypes.oneOf(["color-white", "color-sky-blue", "color-big-stone", "color-la-rioja", "color-lipstick"]),
    clearValue: PropTypes.bool,
};

export default Select;
