function getCurrencySymbol(currencyCode: string | undefined): string {
  if (!currencyCode) {
    return "";
  }

  switch (currencyCode) {
    case "usd":
      return "$";
    case "aud":
      return "$";
    case "npr":
      return "रू";
    default:
      return "$";
  }
}

export { getCurrencySymbol };
