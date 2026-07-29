type WooProductResponse = {
  id: number;
  name: string;
  price: string;
};

export async function getWooProducts(
  query = ""
): Promise<WooProductResponse[]> {
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

  let products: WooProductResponse[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      per_page: "100",
      page: page.toString(),
    });

    if (query) {
      params.set("search", query);
    }

    const response = await fetch(
      `${url}/wp-json/wc/v3/products?${params.toString()}`,
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

    const data = await response.json();

    products = [
      ...products,
      ...data.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    ];

    hasMore = data.length === 100;
    page++;
  }

  return products;
}