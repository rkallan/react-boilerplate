import React from "react";
import PropTypes from "prop-types";
import Options from "./Options";

const OptionGroup = (props) => {
    const { title, options } = props;
    if (title) {
        return (
            <optgroup label={title}>
                <Options {...options} />
            </optgroup>
        );
    }

    return <Options {...options} />;
};

OptionGroup.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        attributes: PropTypes.shape({
            value: PropTypes.any,
        }),
    }).isRequired,
};

export default OptionGroup;
