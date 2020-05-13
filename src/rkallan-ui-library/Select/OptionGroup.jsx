import React from "react";
import PropTypes from "prop-types";
import Option from "./Option";

const Options = ({ options }) => {
    return Object.keys(options).map((key) => {
        const { id, ...attributes } = options[key];
        return <Option key={id} {...attributes} />;
    });
};

const OptionGroup = ({ title, options }) => {
    if (title) {
        return (
            <optgroup label={title}>
                <Options options={options} />
            </optgroup>
        );
    }

    return <Options options={options} />;
};

OptionGroup.defaultProps = {
    title: undefined,
};

OptionGroup.propTypes = {
    title: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string,
            attributes: PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
                disabled: PropTypes.bool,
                hidden: PropTypes.bool,
            }),
        })
    ).isRequired,
};

export default OptionGroup;
