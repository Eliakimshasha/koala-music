import { NextResponse } from "next/server";

import { verifySetupToken } from "@/lib/admin-auth";

const API_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
    const { email, password, confirmPassword, setupToken } = await request.json();

    if (!email || !password || !confirmPassword) {
      return NextResponse.json(
        { detail: "Email, password, and confirm password are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { detail: "Password and confirm password must match." },
        { status: 400 }
      );
    }

    const setupSession = verifySetupToken(setupToken);

    if (!setupSession) {
      return NextResponse.json(
        {
          detail:
            "Temporary access expired or is invalid. Log in with the temporary email and password again.",
        },
        { status: 401 }
      );
    }

    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!registerResponse.ok) {
      const message = await parseErrorMessage(
        registerResponse,
        "Account creation failed. Please check your details."
      );

      return NextResponse.json({ detail: message }, { status: registerResponse.status });
    }

    const loginBody = new URLSearchParams();
    loginBody.append("username", email);
    loginBody.append("password", password);

    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: loginBody,
      cache: "no-store",
    });

    if (!loginResponse.ok) {
      return NextResponse.json({
        created: true,
        requiresLogin: true,
        message: "Account created successfully. Please log in with the new email and password.",
      });
    }

    const loginData = await loginResponse.json();

    return NextResponse.json({
      ...loginData,
      created: true,
      message: "Account created successfully.",
    });
  } catch {
    return NextResponse.json(
      { detail: "Unable to create the account right now. Please try again." },
      { status: 500 }
    );
  }
}
