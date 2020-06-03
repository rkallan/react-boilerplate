import React from "react";
import PropTypes from "prop-types";

import "../resources/styles/default/_default.scss";

const TemplateProvider = ({ children }) => {
    return <>{children}</>;
};

TemplateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TemplateProvider;
