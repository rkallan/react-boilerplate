import React from "react";
import PropTypes from "prop-types";
import { getType } from "rkallan-javascript-helpers";
import icons from "./icons";
import styles from "./resources/styles/icons.module.scss";

const Icons = ({ icon, svgProps, noContainer, variant }) => {
    const svgIcon = getType(icons[icon]) === "function" ? icons[icon](svgProps) : icons.fallback(svgProps);

    if (svgIcon) {
        if (noContainer) return icon;

        return (
            <div className={styles.container} variant={variant}>
                {svgIcon}
            </div>
        );
    }

    return null;
};

Icons.defaultProps = {
    variant: "normal",
    noContainer: false,
    svgProps: {},
};

Icons.propTypes = {
    icon: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(["smallest", "small", "normal", "large", "largest", "full-width"]),
    noContainer: PropTypes.bool,
    svgProps: PropTypes.shape({}),
};

export default Icons;
