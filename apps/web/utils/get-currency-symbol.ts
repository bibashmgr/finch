function getCurrencySymbol(currencyCode: string): string {
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
