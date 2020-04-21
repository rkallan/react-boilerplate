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
        if (item && name) {
            const nodeName = item.nodeName.toLowerCase();
            if (!data[name]) {
                data[name] = {
                    type: type,
                    name: name,
                    elementType: nodeName,
                    required: dataset.required === "true",
                    validationTypes: dataset.validationTypes || { [type]: null },
                    valueKey: dataset.valueKey || 0,
                    values: [],
                };
            } else if (getType(data[name].valueKey) === "number" && Math.floor(data[name].valueKey) === data[name].valueKey) {
                data[name].valueKey = +1;
            }

            if (getType(getValueOfElement[nodeName]) === "function") {
                const value = getValueOfElement[nodeName](item);

                if (value && nodeName === "select" && type === "select-multiple") {
                    data[name].values = value;
                } else if (value) {
                    if (dataset.valueKey) {
                        data[name].values[dataset.valueKey] = getValueOfElement[nodeName](item);
                    } else {
                        data[name].values.push(value);
                    }
                }
            }
        }
        return data;
    }, {});

    return formData;
};

export default serializeForm;
