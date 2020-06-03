import React, { useState } from "react";
import PropTypes from "prop-types";
import { getRandomAlphanumericInsensitive, keyEvent } from "rkallan-javascript-helpers";

import styles from "./resources/styles/inputTypeRadio.module.scss";

const InputTypeRadio = (props) => {
    const { items, variant, customOnChangeHandler, attributes } = props;
    const [randomValue] = useState(getRandomAlphanumericInsensitive);
    const [usedKeyboard, setUsedKeyboard] = useState(false);

    const onChangeHandler = (event) => {
        if (customOnChangeHandler) customOnChangeHandler(event);
        if (usedKeyboard) return setUsedKeyboard(false);

        event.currentTarget.blur();
        return true;
    };

    const onKeyDownHandler = (event) => {
        const isArrowKey = [keyEvent.arrowLeft, keyEvent.arrowTop, keyEvent.arrowRight, keyEvent.arrowDown].includes(event.key);

        if (isArrowKey) setUsedKeyboard(true);
    };

    const radioItems = items.map((item) => {
        const { id, value, label } = item;
        const defaultChecked = attributes.defaultChecked === value;
        const disabled = attributes.disabled ? true : item.disabled || false;

        return (
            <div key={id} className={styles.unit}>
                <input
                    id={`${label.for}-${randomValue}`}
                    className={styles.input}
                    onChange={onChangeHandler}
                    onClick={onKeyDownHandler}
                    onKeyDown={onKeyDownHandler}
                    {...attributes}
                    value={value}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                />
                <label htmlFor={`${label.for}-${randomValue}`}>
                    <div className={styles.customRadio} />
                    <div className={styles.text}>{label.text}</div>
                </label>
            </div>
        );
    });

    return (
        <section className={styles.container} variant={variant} state="isValid">
            {radioItems}
        </section>
    );
};

InputTypeRadio.defaultProps = {
    attributes: {
        type: "radio",
        "data-required": false,
        "data-validation-types": undefined,
        disabled: false,
        readOnly: false,
        defaultChecked: undefined,
    },
    variant: "row",
    customOnChangeHandler: undefined,
};

InputTypeRadio.propTypes = {
    attributes: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["radio"]),
        "data-required": PropTypes.bool,
        "data-validation-types": PropTypes.string,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        defaultChecked: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    }),
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
            label: PropTypes.shape({
                for: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired,
            }),
            disabled: PropTypes.bool,
            map: PropTypes.func,
        })
    ).isRequired,
    variant: PropTypes.oneOf(["column", "row"]),
    customOnChangeHandler: PropTypes.func,
};

export default InputTypeRadio;
