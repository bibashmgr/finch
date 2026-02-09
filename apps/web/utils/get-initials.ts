export function getInitials(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "UN";

  if (words.length === 1) {
    const initials = words[0]?.replace(/[^a-zA-Z]/g, "").slice(0, 2);
    return initials ? initials.toUpperCase() : "UN";
  }

  const initials = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return initials || "UN";
}
