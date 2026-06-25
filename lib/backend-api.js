const LOCAL_BACKEND_URL = "http://localhost:8000";

export function getBackendApiUrl() {
  const configuredUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  if (!configuredUrl && process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing API_URL or NEXT_PUBLIC_API_URL for the backend service."
    );
  }

  return (configuredUrl || LOCAL_BACKEND_URL).replace(/\/+$/, "");
}

export function getBackendConfigError(error) {
  if (error instanceof Error && error.message.includes("API_URL")) {
    return {
      detail:
        "Backend API URL is not configured. Set API_URL to your deployed FastAPI backend URL.",
      status: 503,
    };
  }

  return null;
}
