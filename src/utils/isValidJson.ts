export default function isValidJson(body: string) {
  try {
    return JSON.parse(body);
  } catch {
    return false;
  }
}
