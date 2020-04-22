import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";

import { serializeForm, formPostValidation, apiCall, validations, getType } from "rkallan-javascript-helpers";
import { useDebounce } from "rkallan-react-hooks";
import Loading from "../Loading";

import styles from "./resources/styles/form.module.scss";

const InputTypeText = loadable(() => import(/* webpackChunkName: "InputTypeText" */ "../InputTypeText"), {
    fallback: <Loading />,
});

const Select = loadable(() => import(/* webpackChunkName: "Select" */ "../Select"), {
    fallback: <Loading />,
});

const Button = loadable(() => import(/* webpackChunkName: "Button" */ "../Button"), {
    fallback: <Loading />,
});

const Form = (props) => {
    const {
        attributes,
        customEventHandler,
        customSubmitHandler,
        fieldsets,
        disableForm,
        postFormWithApiCall,
        resetForm,
        submitButtonDisabled,
        buttonsAttributes,
    } = props;
    const [formElements, setFormElements] = useState([]);
    const [submitElements, setSubmitElements] = useState([]);
    const [currentValue, setCurrentValue] = useState();
    const [clearValue, setClearValue] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(submitButtonDisabled);

    const debouncedCurrentValue = useDebounce(currentValue, 150);

    const formValidation = useCallback(() => {
        let hasError = 0;

        if (!formElements.length) hasError += 1;

        formElements.forEach((element) => {
            if ((element && element.getAttribute("state") !== "isValid") || !element.hasAttribute("state")) {
                hasError += 1;
            }
        });

        if (clearValue) setSubmitDisabled(true);

        if (!clearValue && submitElements.length) setSubmitDisabled(!!hasError);
    }, [formElements, submitElements, clearValue]);

    const setElementsToState = (formObject, updateElements = false) => {
        if (formObject && (formElements.length + submitElements.length !== formObject.elements.length || updateElements)) {
            const tempFormElements = [];
            const tempSubmitElements = [];

            [...formObject.elements].forEach((element) => {
                const { type } = element;
                const tagName = element.tagName.toLowerCase();

                if (element && type === "submit") {
                    tempSubmitElements.push(element);
                }

                if (element && !["fieldset", "button"].includes(tagName) && !["submit", "reset", "button"].includes(type)) {
                    tempFormElements.push(element);
                }
            });

            setSubmitElements(tempSubmitElements);
            setFormElements(tempFormElements);

            formValidation();
        }
    };

    const onEventHandler = (event) => {
        event.preventDefault();
        const formElement = event.target;
        const formObject = formElement.form;
        const formElementValue = formElement.value || "";
        const updateElementsInState = getType(customEventHandler) === "function" ? customEventHandler(event) : false;

        if (clearValue) setClearValue(false);
        if (currentValue !== formElementValue) setCurrentValue(formElementValue);

        setElementsToState(formObject, updateElementsInState);
    };

    const setDisabledAttributeOnFieldsets = (disabled = true) => {
        fieldsets.map((fieldset) => {
            const currentFieldset = fieldset;
            currentFieldset.disabled = disabled;

            return disabled;
        });
    };

    const handleFormInValid = (errorMessages) => {
        const response = {
            ok: true,
            error: true,
            message: errorMessages,
        };

        setDisabledAttributeOnFieldsets(false);

        return response;
    };

    const convertDataForAPI = (postData) => {
        const data = Object.keys(postData).reduce((accumulator, key) => {
            const value = postData[key].values[0];

            accumulator[key] = validations.isJSONString(value) ? JSON.parse(value) : value;
            return accumulator;
        }, {});

        return data;
    };

    const formApiCall = async (formPostUrl, data, formDataAttributes) => {
        const response = await apiCall(formPostUrl, data);

        if (!response.ok) handleFormInValid(formDataAttributes, response);

        return response;
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        setSubmitDisabled(true);
        setDisabledAttributeOnFieldsets(true);

        document.activeElement.blur();

        const formObject = event.currentTarget || event.target;
        const formDataAttributes = formObject.dataset;
        const formData = serializeForm(formObject);
        const postData = { ...props.postData, ...formData.postData };
        let response;
        formData.postData = postData;

        const errorMessages = formPostValidation(postData);

        if (Object.keys(errorMessages).length) {
            response = handleFormInValid(errorMessages);

            if (customSubmitHandler) customSubmitHandler(response);
            return response;
        }

        const data = convertDataForAPI(postData);
        if (postFormWithApiCall) {
            const formPostUrl = formObject.action;
            response = formApiCall(formPostUrl, data, formDataAttributes);
        } else {
            response = {
                ok: true,
                status: 200,
                data,
            };
        }

        if (customSubmitHandler) {
            customSubmitHandler(response);
        }
        formObject.reset();
        setClearValue(true);
        setDisabledAttributeOnFieldsets(false);

        return true;
    };

    useEffect(() => {
        if ((debouncedCurrentValue || debouncedCurrentValue === "") && formElements) formValidation();
    }, [debouncedCurrentValue, formElements, formValidation]);

    useEffect(() => {
        if (formElements) formValidation();
    }, [formElements, formValidation]);

    useEffect(() => {
        setSubmitDisabled(submitButtonDisabled);
    }, [submitButtonDisabled]);

    useEffect(() => {
        if (resetForm) {
            setClearValue(true);
        }
    }, [resetForm]);

    return (
        <form {...attributes} onSubmit={onSubmitHandler} onChange={onEventHandler} onFocus={onEventHandler} onBlur={onEventHandler}>
            {fieldsets &&
                fieldsets.map((fieldset) => {
                    const { elements, disabled } = fieldset;
                    const disabledFieldset = disableForm || disabled || false;

                    return (
                        <fieldset key={fieldset.id} disabled={disabledFieldset}>
                            <div className={styles.container} variant={fieldset.variant || null}>
                                {Object.keys(elements).map((key) => {
                                    const { id, node, ...element } = elements[key];

                                    switch (node) {
                                        case "input":
                                            return <InputTypeText key={id} {...element} clearValue={clearValue} />;
                                        case "select":
                                            return <Select key={id} {...element} clearValue={clearValue} />;
                                        case "button":
                                            if (element.attributes.type === "submit") {
                                                element.attributes.disabled = submitDisabled;
                                            }

                                            if (buttonsAttributes[key]) {
                                                const buttonAttributes = element.attributes;
                                                element.attributes = { ...buttonAttributes, ...buttonsAttributes[key] };
                                            }

                                            return <Button key={id} {...element} />;
                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        </fieldset>
                    );
                })}
        </form>
    );
};

Form.defaultProps = {
    customEventHandler: undefined,
    customSubmitHandler: undefined,
    disableForm: false,
    postFormWithApiCall: true,
    resetForm: false,
    submitButtonDisabled: true,
    buttonsAttributes: {},
    postData: undefined,
};

Form.propTypes = {
    attributes: PropTypes.shape({}).isRequired,
    customEventHandler: PropTypes.func,
    customSubmitHandler: PropTypes.func,
    fieldsets: PropTypes.arrayOf(PropTypes.object).isRequired,
    disableForm: PropTypes.bool,
    postFormWithApiCall: PropTypes.bool,
    resetForm: PropTypes.bool,
    submitButtonDisabled: PropTypes.bool,
    buttonsAttributes: PropTypes.shape({}),
    postData: PropTypes.shape({}),
};

export default Form;
