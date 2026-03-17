import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations directly - NO JSON imports
const resources = {
  en: {
    translation: {
      welcome: "Welcome to my app",
      "change-language": "Change language",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a mi aplicación",
      "change-language": "Cambiar idioma",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue dans mon application",
      "change-language": "Changer la langue",
    },
  },
  de: {
    translation: {
      welcome: "Willkommen in meiner Anwendung",
      "change-language": "Sprache ändern",
    },
  },
};

// Initialize i18next directly
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const getSupportedLanguages = () => Object.keys(resources);

export default i18n;
