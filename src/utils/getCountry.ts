import { getName, registerLocale } from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

registerLocale(en);

const getCountry = (code: string) => {
  return getName(code, "en");
};

export default getCountry;
