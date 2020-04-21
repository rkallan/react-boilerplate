import React from "react";
import PropTypes from "prop-types";

import styles from "./resources/styles/logo.module.scss";

import { ReactComponent as LogoContentGuru } from "./resources/svg/content-guru.svg";
import { ReactComponent as LogoStormm } from "./resources/svg/storm.svg";

const logoComponents = {
    contentGuru: <LogoContentGuru />,
    storm: <LogoStormm />,
};

const Logo = (props) => {
    const { variant, name } = props;

    return (
        <figure className={styles.container} variant={variant}>
            {logoComponents[name]}
        </figure>
    );
};

Logo.defaultProps = {
    variant: "sky-blue",
    name: "contentGuru",
};

Logo.propTypes = {
    variant: PropTypes.oneOf(["white", "sky-blue", "big-stone", "la-rioja", "lipstick"]),
    name: PropTypes.oneOf(["contentGuru", "storm"]),
};

export default Logo;
