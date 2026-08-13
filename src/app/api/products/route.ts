import { NextResponse } from "next/server";

import { getWooProducts } from "@/lib/woocommerce";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const limit = Number(searchParams.get("limit") ?? "10");

  try {
    const products = await getWooProducts(
      query,
      limit,
      category
    );

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
