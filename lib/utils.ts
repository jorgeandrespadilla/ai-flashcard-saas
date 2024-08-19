export const tryParseJSON = (jsonString: string | null) => {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString);
  } catch {
    return null;
  }
}
