export const getUserIdFromToken = (token) => {
  try {
    // Token ka payload hamesha 2nd part hota hai
    const base64Payload = token.split(".")[1];

    // Decode base64 -> string
    const payload = JSON.parse(atob(base64Payload));

    // Ab ID nikal lo (depends on JWT structure)
    return payload.id;
  } catch (error) {
    console.error("Token decode error:", error.message);
    return null;
  }
};
