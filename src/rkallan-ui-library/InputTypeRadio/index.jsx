import React, { useState } from "react";
import PropTypes from "prop-types";
import { getRandomAlphanumericInsensitive, keyEvent } from "rkallan-javascript-helpers";

import styles from "./resources/styles/inputTypeRadio.module.scss";

const InputTypeRadio = (props) => {
    const { name, items, variant, customOnChangeHandler } = props;
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
        const defaultChecked = props.defaultValue === value ? true : item.checked || false;
        const disabled = props.disabled ? true : item.disabled || false;

        return (
            <div key={id} className={styles.unit}>
                <input
                    id={`${label.for}-${randomValue}`}
                    className={styles.input}
                    name={name}
                    type="radio"
                    value={value}
                    onChange={onChangeHandler}
                    onClick={onKeyDownHandler}
                    onKeyDown={onKeyDownHandler}
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
        <section className={styles.container} variant={variant}>
            {radioItems}
        </section>
    );
};

InputTypeRadio.defaultProps = {
    variant: "row",
    customOnChangeHandler: undefined,
    defaultValue: undefined,
    disabled: false,
};

InputTypeRadio.propTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
        label: PropTypes.shape({
            for: PropTypes.string,
            text: PropTypes.string,
        }),
        map: PropTypes.func,
    }).isRequired,
    variant: PropTypes.oneOf(["column", "row"]),
    customOnChangeHandler: PropTypes.func,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
};

export default InputTypeRadio;
