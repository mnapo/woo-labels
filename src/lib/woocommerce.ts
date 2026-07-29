type WooProductResponse = {
  id: number;
  name: string;
  price: string;
};

export async function getWooProducts(): Promise<WooProductResponse[]> {
  const url = process.env.WOOCOMMERCE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      "WooCommerce environment variables are missing"
    );
  }

  const credentials = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64");

  const response = await fetch(
    `${url}/wp-json/wc/v3/products`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
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

  return products.map((product: any) => ({
    id: product.id,
    name: product.name,
    price: product.price,
  }));
}