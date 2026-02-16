type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
  countryCode: string;
};

export const languageOptions: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", countryCode: "us" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली", countryCode: "np" },
];
