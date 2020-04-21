import apiCall from "./apiCall";
import { convertToGivenSeperator, camelCase, capitalizeFirstLetterWord, ucFirst } from "./convertString";
import {
    replaceElementAttributeValue,
    getParentElementWithAttributeValue,
    getChildElementsWithState,
    setElementState,
    setStylesOnElement,
    setAttributesOnElement,
    getPaddingStylesFromElementAsObject,
    toggleStateOnConnectedElements,
    enableDisableElements,
    getSiblings,
} from "./element";
import { getApiUrlPath, getUrl } from "./getApiUrlPath";
import getLocalStorageItem from "./getDataFromLocalStorage";
import { flattenObject, flattenArray } from "./flattenObject";
import { getRandomInt, getRandomAlphanumericInsensitive } from "./getRandom";
import getType from "./getType";
import getValueOfElement from "./getValueOfElement";
import keyEvent from "./keyEvent";
import requestOptions from "./requestOptions";
import { roundNearest, roundDown, roundUp } from "./roundNumber";
import serializeForm from "./serializeForm";
import { validations, formPostValidation, getValidationTypes, isElementValid } from "./validations";

export {
    apiCall,
    convertToGivenSeperator,
    camelCase,
    capitalizeFirstLetterWord,
    ucFirst,
    replaceElementAttributeValue,
    getParentElementWithAttributeValue,
    getChildElementsWithState,
    setElementState,
    setStylesOnElement,
    setAttributesOnElement,
    getPaddingStylesFromElementAsObject,
    toggleStateOnConnectedElements,
    enableDisableElements,
    getSiblings,
    getApiUrlPath,
    getUrl,
    getLocalStorageItem,
    flattenObject,
    flattenArray,
    getType,
    getRandomInt,
    getRandomAlphanumericInsensitive,
    getValueOfElement,
    keyEvent,
    requestOptions,
    roundNearest,
    roundDown,
    roundUp,
    serializeForm,
    validations,
    formPostValidation,
    getValidationTypes,
    isElementValid,
};
