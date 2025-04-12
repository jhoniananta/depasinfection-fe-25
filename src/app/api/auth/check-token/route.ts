import { baseURL } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("depas25_token");

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  try {
    const backendRes = await fetch(`${baseURL}/check?token=${token}`, {
      method: "GET",
      headers: {
        // 🔒 make safer
        "Referrer-Policy": "no-referrer",
      },
    });

    const result = await backendRes.text();

    if (result === "valid") {
      return NextResponse.json(
        { valid: true },
        {
          status: 200,
          headers: {
            // 🔒 make safer
            "Referrer-Policy": "no-referrer",
          },
        },
      );
    } else {
      return NextResponse.json(
        { valid: false },
        {
          status: 401,
          headers: {
            // 🔒 make safer
            "Referrer-Policy": "no-referrer",
          },
        },
      );
    }
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
