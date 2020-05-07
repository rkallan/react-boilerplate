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

const InputTypeRadio = loadable(() => import(/* webpackChunkName: "InputTypeText" */ "../InputTypeRadio"), {
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
    const [buttonElements, setButtonElements] = useState([]);
    const [formData, setFormData] = useState([]);
    const [currentValue, setCurrentValue] = useState();
    const [clearValue, setClearValue] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(submitButtonDisabled);
    const [resetDisabled, setResetDisabled] = useState(true);

    const debouncedCurrentValue = useDebounce(currentValue, 150);

    const formValidation = useCallback(() => {
        let hasError = 0;

        if (!formElements.length) hasError += 1;

        formElements.forEach((element) => {
            if (element && element.hasAttribute("state") && element.getAttribute("state") !== "isValid") {
                hasError += 1;
            }
        });

        if (clearValue) setSubmitDisabled(true);

        if (!clearValue) setSubmitDisabled(!!hasError);
    }, [formElements, clearValue]);

    const setElementsToState = (formObject, updateElements = false) => {
        if (formObject && (formElements.length + buttonElements.length !== formObject.elements.length || updateElements)) {
            const tempFormElements = [];
            const tempButtons = [];

            [...formObject.elements].forEach((element) => {
                const { type } = element;
                const tagName = element.tagName.toLowerCase();

                if (element && (tagName === "button" || ["submit", "reset", "button"].includes(type))) tempButtons.push(element);

                if (element && !["fieldset", "button"].includes(tagName) && !["submit", "reset", "button"].includes(type)) tempFormElements.push(element);
            });

            const data = {
                attributes,
                elements: [],
            };
            fieldsets.forEach((fieldset) => {
                const { elements } = fieldset;
                Object.keys(elements).forEach((key) => {
                    data.elements.push(elements[key]);
                });
            });
            setFormData(data);

            setButtonElements(tempButtons);
            setFormElements(tempFormElements);

            formValidation();
        }
    };

    const onEventHandler = (event) => {
        // event.preventDefault();
        const formElement = event.target;
        const formObject = formElement.form;
        const formElementValue = formElement.value || "";
        const updateElementsInState = getType(customEventHandler) === "function" ? customEventHandler(event) : false;

        if (clearValue) setClearValue(false);
        if (currentValue !== formElementValue) setCurrentValue(formElementValue);

        if (event.type === "change") setResetDisabled(false);

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
            error: {
                message: errorMessages,
            },
        };

        setDisabledAttributeOnFieldsets(false);

        return response;
    };

    const convertDataForAPI = (postData) => {
        const data = Object.keys(postData).reduce((accumulator, key) => {
            const value = postData[key].values.length > 1 ? postData[key].values : postData[key].values[0];

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
        const formObjectData = serializeForm(formObject, formData);
        const postData = { ...props.postData, ...formObjectData.postData };

        let response;
        formObjectData.postData = postData;

        const errorMessages = formPostValidation(postData);

        if (errorMessages) {
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

    const onResetHandler = () => {
        setResetDisabled(true);
        setClearValue(true);
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
        <form {...attributes} onSubmit={onSubmitHandler} onReset={onResetHandler} onChange={onEventHandler} onFocus={onEventHandler} onBlur={onEventHandler}>
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
                                            if (clearValue) element.attributes.disabled = false;
                                            return <InputTypeText key={id} {...element} clearValue={clearValue} />;
                                        case "radio":
                                            return <InputTypeRadio key={id} {...element} clearValue={clearValue} />;
                                        case "select":
                                            return <Select key={id} {...element} clearValue={clearValue} />;
                                        case "button":
                                            if (element.attributes.type === "submit") {
                                                element.attributes.disabled = submitDisabled;
                                            }
                                            if (element.attributes.type === "reset") {
                                                element.attributes.disabled = resetDisabled;
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
