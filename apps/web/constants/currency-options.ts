type CurrencyOption = {
  code: string;
  name: string;
  countryCode: string;
  symbol: string;
};

export const currencyOptions: CurrencyOption[] = [
  { code: "usd", name: "United State Dollar", countryCode: "us", symbol: "$" },
  { code: "aud", name: "Australian Dollar", countryCode: "au", symbol: "$" },
  { code: "npr", name: "Nepalese Rupee", countryCode: "np", symbol: "₹" },
];
