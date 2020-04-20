import React from "react";
import PropTypes from "prop-types";

const Test = ({ text }) => {
    return <div>{`${text} hallo`}</div>;
};

Test.propTypes = {
    text: PropTypes.string,
};

Test.defaultProps = {
    text: "Stranger",
};

export default Test;
