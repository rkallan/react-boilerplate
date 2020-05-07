import getValueOfElement from "../getValueOfElement";
import getType from "../getType";

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
            const elementObject = formObjectData.elements.find((element) => element.attributes.name === name);
            const nodeName = item.nodeName.toLowerCase();
            const attributes = elementObject && elementObject.attributes ? elementObject.attributes : {};
            const required =
                attributes.disabled || attributes.readOnly || item.disabled || item.readOnly
                    ? false
                    : attributes["data-required"] === true || dataset.required === "true";
            const validationTypes = required ? attributes["data-validation-types"] || dataset.validationTypes : undefined;

            if (!tempData[name]) {
                tempData[name] = {
                    type,
                    name,
                    elementType: nodeName,
                    required,
                    validationTypes: validationTypes ? JSON.parse(validationTypes) : undefined,
                    valueKey: attributes["data-valueKey"] || dataset.valueKey || 0,
                    values: [],
                };
            } else if (getType(tempData[name].valueKey) === "number" && Math.floor(tempData[name].valueKey) === tempData[name].valueKey) {
                tempData[name].valueKey = +1;
            }

            if (getType(getValueOfElement[nodeName]) === "function") {
                const value = getValueOfElement[nodeName](item);

                if (value) {
                    if (nodeName === "select" && type === "select-multiple") {
                        tempData[name].values = value;
                    } else if (attributes["data-valueKey"]) {
                        tempData[name].values[attributes["data-valueKey"]] = value;
                    } else {
                        tempData[name].values.push(value);
                    }
                }
            }
        }
        return tempData;
    }, {});

    return formData;
};

export default serializeForm;
