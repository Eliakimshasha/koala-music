import { NextResponse } from "next/server";

import {
  createSetupToken,
  hasTemporaryAdminCredentials,
  verifyTemporaryAdminCredentials,
} from "@/lib/admin-auth";
import { getBackendApiUrl, getBackendConfigError } from "@/lib/backend-api";

async function parseErrorMessage(response, fallbackMessage) {
  try {
    const data = await response.json();

    if (typeof data?.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data?.detail)) {
      const first = data.detail[0];
      if (typeof first === "string") return first;
      if (typeof first?.msg === "string") return first.msg;
    }

    if (typeof data?.message === "string") {
      return data.message;
    }
  } catch {
    return fallbackMessage;
  }

  return fallbackMessage;
}

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { detail: "Email and password are required." },
        { status: 400 }
      );
    }

    if (
      hasTemporaryAdminCredentials() &&
      verifyTemporaryAdminCredentials(email, password)
    ) {
      return NextResponse.json({
        requiresSetup: true,
        setupToken: createSetupToken(email),
        message:
          "Temporary access verified. Create the permanent admin account to continue.",
      });
    }

    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    const apiUrl = getBackendApiUrl();

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      const message = await parseErrorMessage(
        response,
        "Wrong email or password. Please try again."
      );

      return NextResponse.json({ detail: message }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Admin login failed:", error);

    const configError = getBackendConfigError(error);
    if (configError) {
      return NextResponse.json(
        { detail: configError.detail },
        { status: configError.status }
      );
    }

    return NextResponse.json(
      { detail: "Unable to complete login right now. Please try again." },
      { status: 502 }
    );
  }
}
