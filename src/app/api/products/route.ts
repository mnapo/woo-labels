import { NextResponse } from "next/server";
import { getWooProducts } from "@/lib/woocommerce";

export async function GET() {
  try {
    const products = await getWooProducts();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}