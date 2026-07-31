import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://app-python-xvxv0.apps.frk1.abrhapaas.com";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.toString();

  const url = query
    ? `${API_URL}/products?${query}`
    : `${API_URL}/products`;

  console.log("[Products API] Request URL:", url);

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    console.log("[Products API] Response Status:", response.status);

    if (!response.ok) {
      const text = await response.text();

      console.error("[Products API] Backend Error:", text);

      return NextResponse.json(
        {
          error: "خطا در دریافت محصولات",
          status: response.status,
          backend: text,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("[Products API] Fetch Failed:");
    console.error(error);

    return NextResponse.json(
      {
        error: "خطا در ارتباط با بک‌اند",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  }
}