import React, { useState } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { getType, getRandomAlphanumericInsensitive, keyEvent } from "rkallan-javascript-helpers";

import styles from "./resources/styles/sliderButton.module.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ "../Icons"));

const SliderButton = (props) => {
    const { content, variant, labelText, inputAttributes, attributes } = props;
    const elementInputAttributes = {
        ...SliderButton.defaultProps.inputAttributes,
        ...inputAttributes,
    };
    const elementAttributes = { ...SliderButton.defaultProps.attributes, ...attributes };
    const [randomInt] = useState(getRandomAlphanumericInsensitive());
    const [isEventClick, setIsEventClick] = useState(false);

    const handleOnChange = (event) => {
        if (inputAttributes && getType(elementInputAttributes.onChange) === "function") elementInputAttributes.onChange(event);
        if (isEventClick) event.currentTarget.blur();
    };

    const onClickHandler = () => {
        setIsEventClick(true);
    };

    const onKeyHandler = (event) => {
        if ([keyEvent.enter, keyEvent.spacebar].includes(event.key)) {
            setIsEventClick(false);
        }
    };

    return (
        <div className={styles.container} {...elementAttributes}>
            <input
                className={styles.checkbox}
                type="checkbox"
                id={`${elementInputAttributes.name}-${randomInt}`}
                {...inputAttributes}
                onChange={handleOnChange}
                onKeyDown={onKeyHandler}
                onClick={onClickHandler}
            />
            <label htmlFor={`${elementInputAttributes.name}-${randomInt}`}>
                {labelText && <span className={styles.labelText}>{labelText}</span>}
                <div className={styles.unit} variant={variant}>
                    {content.left && (
                        <div className={styles.content} variant="left">
                            {content.left.icon && (
                                <div className={styles.icon}>
                                    <Icons icon={content.left.icon} variant="full-width" />
                                </div>
                            )}
                            {content.left.text && <div className={styles.text}> {content.left.text}</div>}
                        </div>
                    )}
                    {content.right && (
                        <div className={styles.content} variant="right">
                            {content.right.text && <div className={styles.text}> {content.right.text}</div>}
                            {content.right.icon && (
                                <div className={styles.icon}>
                                    <Icons icon={content.right.icon} variant="full-width" />
                                </div>
                            )}
                        </div>
                    )}
                    <div className={styles.circle} />
                </div>
            </label>
        </div>
    );
};

SliderButton.defaultProps = {
    labelText: undefined,
    attributes: {
        variant: "no-content",
    },
    inputAttributes: {
        name: "slider",
        defaultChecked: false,
        disabled: false,
    },
    content: undefined,
    variant: "color-big-stone",
};

SliderButton.propTypes = {
    labelText: PropTypes.string,
    attributes: PropTypes.shape({
        variant: PropTypes.oneOf(["icon-text", "icon-only", "text-only", "no-content"]),
    }),
    inputAttributes: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
        defaultChecked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func,
    }),
    content: PropTypes.shape({
        left: PropTypes.shape({
            text: PropTypes.string,
            icon: PropTypes.string,
        }),
        right: PropTypes.shape({
            text: PropTypes.string,
            icon: PropTypes.string,
        }),
    }),
    variant: PropTypes.oneOf(["color-white", "color-sky-blue", "color-big-stone", "color-la-rioja", "color-lipstick"]),
};

export default SliderButton;
