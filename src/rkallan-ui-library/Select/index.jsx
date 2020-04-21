import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { getRandomAlphanumericInsensitive, getValidationTypes, isElementValid } from "rkallan-javascript-helpers";

import styles from "./resources/styles/select.module.scss";
import OptionGroup from "./OptionGroup";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ `../Icons`));

const Select = (props) => {
    const { state, label, name, attributes, optionGroup, variant, clearValue, defaultValue } = props;
    const [randomAlphanumericInsensitive] = useState(getRandomAlphanumericInsensitive());
    const [validationTypes, setValidationTypes] = useState();
    const [containerState, setContainerState] = useState(attributes.disabled || defaultValue || !attributes["data-required"] ? "isValid" : state);
    const [selectState, setSelectState] = useState(attributes.state);
    const [currentValue, setCurrentValue] = useState(defaultValue);

    const onChangeHandler = (event) => {
        const { value } = event.target;
        const elementState = isElementValid(validationTypes, value);
        setContainerState(elementState);
        setSelectState(elementState);
        setCurrentValue(value);
    };

    useEffect(() => {
        if (attributes["data-required"] && !validationTypes) {
            setValidationTypes(getValidationTypes(attributes["data-required"], attributes["data-validation-types"]));
        }
    }, [attributes, validationTypes]);

    useEffect(() => {
        if (clearValue) {
            const elementState = isElementValid(validationTypes, defaultValue);
            setContainerState(elementState);
            setSelectState(elementState);
            setCurrentValue(defaultValue);
        }
    }, [clearValue, defaultValue, validationTypes]);

    useEffect(() => {
        setCurrentValue(defaultValue);
    }, [defaultValue]);

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
                    <div className={styles["select-container"]}>
                        <select
                            className={styles.select}
                            id={`${label.for}-${randomAlphanumericInsensitive}`}
                            name={name}
                            {...attributes}
                            value={currentValue}
                            onBlur={onChangeHandler}
                            state={selectState}
                        >
                            {optionGroup.map((group) => {
                                const { id } = group;
                                return <OptionGroup key={id} {...group} />;
                            })}
                        </select>
                        <div className={styles.carrot}>
                            <Icons icon="arrowDown" variant="small" />
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

Select.defaultProps = {
    state: "isValid",
    attributes: {
        "data-required": false,
        state: "isValid",
        disabled: false,
    },
    variant: "color-bigStone",
    clearValue: false,
    defaultValue: undefined,
};

Select.propTypes = {
    label: PropTypes.shape({
        for: PropTypes.string,
        text: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired,
    optionGroup: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        options: PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string,
            attributes: PropTypes.shape({
                value: PropTypes.any,
            }),
        }),
        map: PropTypes.func,
    }).isRequired,
    attributes: PropTypes.shape({
        disabled: PropTypes.bool,
        "data-required": PropTypes.string,
        state: PropTypes.oneOf(["isEmpty", "isValid", "isFocused"]),
        "data-validation-types": PropTypes.string,
    }),
    state: PropTypes.oneOf(["isEmpty", "isValid", "isFocused"]),
    variant: PropTypes.oneOf(["color-white", "color-sky-blue", "color-big-stone", "color-la-rioja", "color-lipstick"]),
    clearValue: PropTypes.bool,
    defaultValue: PropTypes.string,
};

export default Select;
