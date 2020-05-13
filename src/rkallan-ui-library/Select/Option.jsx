import React from "react";
import PropTypes from "prop-types";

const Option = (props) => {
    const { text, attributes } = props;

    return (
        <option {...Option.defaultProps.attributes} {...attributes}>
            {text}
        </option>
    );
};

Option.defaultProps = {
    attributes: {
        disabled: false,
        hidden: false,
    },
};

Option.propTypes = {
    text: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
        disabled: PropTypes.bool,
        hidden: PropTypes.bool,
    }),
};

export default Option;
