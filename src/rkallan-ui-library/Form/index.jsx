import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";

import { serializeForm, formPostValidation, apiCall, getType } from "rkallan-javascript-helpers";
import { useDebounce } from "rkallan-react-hooks";
import Loading from "../Loading";

import styles from "./resources/styles/form.module.scss";

const InputTypeText = loadable(() => import(/* webpackChunkName: "InputTypeText" */ "../InputTypeText"), {
    fallback: <Loading />,
});

const InputTypeCheckbox = loadable(() => import(/* webpackChunkName: "InputTypeText" */ "../InputTypeCheckbox"), {
    fallback: <Loading />,
});

const InputTypeRadio = loadable(() => import(/* webpackChunkName: "InputTypeText" */ "../InputTypeRadio"), {
    fallback: <Loading />,
});
const Textarea = loadable(() => import(/* webpackChunkName: "Textarea" */ "../Textarea"), {
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

    const formApiCall = async (formPostUrl, data, formDataAttributes) => {
        const response = await apiCall(formPostUrl, data);

        if (!response.ok) handleFormInValid(formDataAttributes, response);

        return response;
    };

    const getResponse = (formObject, data) => {
        if (postFormWithApiCall) {
            const formPostUrl = formObject.action;
            const formDataAttributes = formObject.dataset;
            const response = formApiCall(formPostUrl, data, formDataAttributes);

            return response;
        }

        return {
            ok: true,
            status: 200,
            data,
        };
    };

    const disableButtons = () => {
        setSubmitDisabled(true);
        setResetDisabled(true);
    };

    const resetFormElements = () => {
        setClearValue(true);
    };

    const onResetHandler = () => {
        disableButtons();
        resetFormElements();
    };

    const onEventHandler = (event) => {
        const formElement = event.target;
        const formObject = formElement.form;
        const formElementValue = formElement.value || "";
        const updateElementsInState = getType(customEventHandler) === "function" ? customEventHandler(event) : false;

        if (clearValue) setClearValue(false);
        if (currentValue !== formElementValue) setCurrentValue(formElementValue);

        if (resetDisabled && event.type === "change") setResetDisabled(false);

        setElementsToState(formObject, updateElementsInState);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        document.activeElement.blur();

        disableButtons();
        setDisabledAttributeOnFieldsets(true);

        const formObject = event.currentTarget || event.target;
        const formObjectData = serializeForm(formObject, formData);
        const postData = { ...props.postData, ...formObjectData.postData };

        formObjectData.postData = postData;

        const errorMessages = formPostValidation(postData);

        if (errorMessages) {
            const errorResponse = handleFormInValid(errorMessages);

            if (customSubmitHandler) customSubmitHandler(errorResponse);
            return errorResponse;
        }

        // const data = convertDataForAPI(postData);
        const response = getResponse(formObject, postData);

        if (customSubmitHandler) customSubmitHandler(response);

        formObject.reset();
        setDisabledAttributeOnFieldsets(false);
        setClearValue(true);

        return response;
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
            disableButtons();
            resetFormElements();
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
                                    if (disabledFieldset) element.attributes.disabled = disabledFieldset;

                                    switch (node) {
                                        case "input":
                                            return <InputTypeText key={id} {...element} clearValue={clearValue} />;
                                        case "radio":
                                            return <InputTypeRadio key={id} {...element} clearValue={clearValue} />;
                                        case "checkbox":
                                            return <InputTypeCheckbox key={id} {...element} clearValue={clearValue} />;
                                        case "textarea":
                                            return <Textarea key={id} {...element} clearValue={clearValue} />;
                                        case "select":
                                            return <Select key={id} {...element} clearValue={clearValue} />;
                                        case "button":
                                            if (element.attributes.type === "submit") element.attributes.disabled = submitDisabled;

                                            if (element.attributes.type === "reset") element.attributes.disabled = resetDisabled;

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
