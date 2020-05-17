import { validations } from "../validations";

const getValueOfElement = {
    input: (element) => {
        let valueAsString;
        if (element && element.type && ["radio", "checkbox"].includes(element.type)) {
            if (element.checked) {
                valueAsString = element.value.trim();
                return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
            }

            return undefined;
        }

        if (element && element.type) {
            valueAsString = element.value.trim();
            return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
        }

        return undefined;
    },

    textarea: (element) => {
        if (element) {
            const valueAsString = element.value.trim() || undefined;
            return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
        }

        return undefined;
    },

    select: (element) => {
        if (element && element.type && element.type === "select-one" && element.value) {
            const valueAsString = element.value;
            return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
        }
        if (element && element.type && element.type === "select-multiple") {
            const value = [];
            const selected = element.selectedOptions;

            selected.forEach((option) => {
                const optionValue = validations.isJSONString(option.value) ? JSON.parse(option.value) : option.value;
                value.push(optionValue);
            });

            return value;
        }

        return undefined;
    },

    button: (element) => {
        if (element) {
            const valueAsString = element.value.trim() || undefined;
            return validations.isJSONString(valueAsString) ? JSON.parse(valueAsString) : valueAsString;
        }
        return undefined;
    },
};

export default getValueOfElement;
