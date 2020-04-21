import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";

import { getType } from "rkallan-javascript-helpers";

import styles from "./resources/styles/button.module.scss";

const Icons = loadable(() => import(/* webpackChunkName: "Icons" */ "rkallan-ui-library/Icons"));

const Button = (props) => {
    const { attributes, text, fullWidth, border, align, containerAttributes, className, borderColor, color, icon, iconSize, textAlign } = props;
    const containerVariant = [];
    const containerClassName = [styles.container];
    const unitVariant = [attributes.variant];

    if (align) containerVariant.push(`${align}`);
    if (fullWidth) containerVariant.push("full-width");
    if (border) containerVariant.push("border");
    if (color) containerVariant.push(color);
    if (attributes.disabled) containerVariant.push("disabled");
    if (className) containerClassName.push(className);
    if (borderColor) unitVariant.push(borderColor);

    const onClickHandler = (event) => {
        if (event.detail > 0 && !event.currentTarget.dataset.noBlur) window.document.activeElement.blur();

        if (props.onClickFunction) props.onClickFunction(event);
    };

    return (
        <div
            className={containerClassName.length ? containerClassName.join(" ") : null}
            variant={containerVariant.length ? containerVariant.join(" ") : null}
            {...containerAttributes}
        >
            <button
                type="button"
                className={styles.unit}
                onClick={onClickHandler}
                title={text}
                aria-label={text}
                {...attributes}
                variant={unitVariant.length ? unitVariant.join(" ") : null}
            >
                <div className={styles.content} variant={borderColor}>
                    {icon && getType(icon) === "string" && (
                        <div className={styles.icon}>
                            <Icons icon={icon} variant={iconSize} />
                        </div>
                    )}

                    {text && getType(text) === "string" && (
                        <div className={styles.title} variant={`text-${textAlign}`}>
                            <span>{text}</span>
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
};

Button.defaultProps = {
    className: undefined,
    containerAttributes: {},
    attributes: {
        disabled: false,
        type: "submit",
        variant: "text-only",
        draggable: false,
        tabIndex: null,
    },
    onClickFunction: undefined,
    icon: undefined,
    fullWidth: false,
    border: false,
    align: "start",
    iconSize: "small",
    removeFocusOnKeyEvent: false,
    borderColor: "default",
    color: "color-transparent",
    textAlign: "center",
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    containerAttributes: PropTypes.shape({}),
    attributes: PropTypes.shape({
        id: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.oneOf(["button", "reset", "submit"]).isRequired,
        variant: PropTypes.oneOf(["text-only", "icon-only", "icon-left", "icon-right", "icon-text-bottom", "icon-circle-outer-text"]),
        "data-no-blur": PropTypes.bool,
        "data-id": PropTypes.number,
        onMouseLeave: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,
        draggable: PropTypes.bool,
        tabIndex: PropTypes.oneOf([-1, null]),
    }),
    onClickFunction: PropTypes.func,
    icon: PropTypes.string,
    iconSize: PropTypes.oneOf(["smallest", "small", "normal", "large", "largest"]),
    fullWidth: PropTypes.bool,
    border: PropTypes.bool,
    align: PropTypes.oneOf(["start", "center", "end"]),
    removeFocusOnKeyEvent: PropTypes.bool,
    borderColor: PropTypes.string,
    color: PropTypes.oneOf(["color-big-stone", "color-grey", "color-transparent"]),
    textAlign: PropTypes.oneOf(["center", "left", "right"]),
};

export default Button;
