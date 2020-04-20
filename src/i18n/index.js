import i18next from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const lang = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_LANGUAGE) || navigator.language.toLowerCase().split("_")[0];

i18next
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all optionxs read: https://www.i18next.com/overview/configuration-options
    .init({
        initImmediate: true,
        ns: "translation",
        defaultNS: "translation",
        backend: {
            loadPath(language, ns) {
                return `${process.env.PUBLIC_URL}/resources/locales/${lang}/${ns}.json`;
            },
        },
        detection: {
            lookupLocalStorage: process.env.REACT_APP_LOCAL_STORAGE_LANGUAGE,
        },
        saveMissing: true,
        saveMissingTo: "current",
        appendNamespaceToMissingKey: true,
        missingKeyHandler(lng, ns, key, fallbackValue) {
            const translation = {
                [ns]: {
                    key,
                    fallbackValue,
                },
            };
            return translation;
        },
        lng: lang,
        fallbackLng: "en",
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        react: {
            wait: true,
        },
    });

export default i18next;
