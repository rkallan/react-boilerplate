import getValueOfElement from "../getValueOfElement";
import getType from "../getType";

const serializeForm = (form) => {
    const formData = {
        formName: form.getAttribute("name") || null,
        action: form.getAttribute("action") || null,
        postData: {},
    };
    formData.postData = Array.prototype.slice.call(form.elements).reduce((data, item) => {
        const { type, name, dataset } = item;
        const tempData = data;
        if (item && name) {
            const nodeName = item.nodeName.toLowerCase();
            if (!tempData[name]) {
                tempData[name] = {
                    type,
                    name,
                    elementType: nodeName,
                    required: dataset.required === "true",
                    validationTypes: dataset.validationTypes || { [type]: null },
                    valueKey: dataset.valueKey || 0,
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
                    } else if (dataset.valueKey) {
                        tempData[name].values[dataset.valueKey] = value;
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
