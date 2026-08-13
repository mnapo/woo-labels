import { NextResponse } from "next/server";

import { getWooCategories } from "@/lib/woocommerce";

export async function GET() {
  try {
    const categories = await getWooCategories();

    return NextResponse.json(categories);
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
