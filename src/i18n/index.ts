import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import pt_BR from "./pt_BR.json";
import en_US from "./en_US.json";

//export const defaultNS = "en_US";
export const defaultNS = "en_US";
export const resources = {
  en_US,
  pt_BR,
} as const;


i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "pt_BR",
//  defaultNS,
  resources,
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
