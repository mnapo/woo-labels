type WooProductResponse = {
  id: number;
  name: string;
  price: string;
  barcode?: string;
};

export async function getWooProducts(
  query = "",
  limit = 10
): Promise<WooProductResponse[]> {
  const url = process.env.WOOCOMMERCE_URL;
  const consumerKey =
    process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret =
    process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (
    !url ||
    !consumerKey ||
    !consumerSecret
  ) {
    throw new Error(
      "WooCommerce environment variables are missing"
    );
  }

  const credentials = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64");

  const params = new URLSearchParams({
    per_page: limit.toString(),
    page: "1",
  });

  if (query) {
    params.set("search", query);
  }

  const response = await fetch(
    `${url}/wp-json/wc/v3/products?${params.toString()}`,
    {
      headers: {
        Authorization:
          `Basic ${credentials}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `WooCommerce error: ${response.status}`
    );
  }

  const products = await response.json();

  return products.map(
    (product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price,,
      barcode:
        product.sku || product.global_unique_id || undefined,
    })
  );
}
