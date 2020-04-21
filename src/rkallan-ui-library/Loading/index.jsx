import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./resources/styles/loading.module.scss";

const Loading = ({ delay }) => {
    const [showLoadingIndicator, setLoadingIndicatorVisibility] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoadingIndicatorVisibility(true), delay);

        return () => {
            clearTimeout(timer);
        };
    });

    if (showLoadingIndicator) return <div className={styles.container}>Loading...</div>;

    return null;
};

Loading.defaultProps = {
    delay: 200,
};

Loading.propTypes = {
    delay: PropTypes.number,
};

export default Loading;
