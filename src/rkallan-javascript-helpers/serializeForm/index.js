import getValueOfElement from "../getValueOfElement";
import getType from "../getType";
import { validations } from "../validations";

const serializeForm = (form, formObjectData) => {
    const formData = {
        formName: formObjectData.attributes.name || null,
        action: formObjectData.attributes.action || null,
        postData: {},
    };

    formData.postData = Array.prototype.slice.call(form.elements).reduce((data, item) => {
        const { type, name, dataset } = item;
        const tempData = data;
        if (item && name && !["submit", "reset", "button"].includes(type)) {
            const elementObject = formObjectData.elements.find(
                (element) => element.attributes.name === name && element.label.for === item.id.split("-").slice(0, -1).join("-")
            );

            const hasSameNameItems = formObjectData.elements.filter((element) => element.attributes.name === name).length > 1;

            const nodeName = item.nodeName.toLowerCase();
            const attributes = elementObject && elementObject.attributes ? elementObject.attributes : {};
            const required =
                attributes.readOnly || item.disabled || item.readOnly ? false : attributes["data-required"] === true || dataset.required === "true";
            const validationTypes = required ? attributes["data-validation-types"] || dataset.validationTypes : undefined;

            if (tempData[name]) tempData[name].valueKey += 1;

            if (!tempData[name]) {
                tempData[name] = {
                    type,
                    name,
                    elementType: nodeName,
                    required,
                    validationTypes: validationTypes ? JSON.parse(validationTypes) : undefined,
                    valueKey: 1,
                    values: undefined,
                };

                if (hasSameNameItems) tempData[name].values = attributes["data-value-key"] || dataset.valueKey ? {} : [];
            }

            if (getType(getValueOfElement[nodeName]) === "function") {
                const elementValue = getValueOfElement[nodeName](item);
                const value = validations.isEmpty(elementValue) ? undefined : elementValue;

                if (["checkbox", "radio"].includes(type) && value === undefined) return tempData;

                if (nodeName === "select" && type === "select-multiple") {
                    tempData[name].values = value;
                    return tempData;
                }

                if (hasSameNameItems) {
                    if (getType(tempData[name].values) === "object") {
                        const valueKey = attributes["data-value-key"] || dataset.valueKey || tempData[name].valueKey;
                        tempData[name].values[valueKey] = value;
                    }

                    if (getType(tempData[name].values) === "array") tempData[name].values.push(value);

                    return tempData;
                }

                if (getType(tempData[name].values) === "undefined") tempData[name].values = value;
                return tempData;
            }
        }
        return tempData;
    }, {});

    return formData;
};

export default serializeForm;
