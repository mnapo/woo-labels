type WooProductResponse = {
  id: number;
  name: string;
  price: string;
  barcode?: string;
};

type WooCategoryResponse = {
  id: number;
  name: string;
};

function getWooCredentials() {
  const url = process.env.WOOCOMMERCE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!url || !consumerKey || !consumerSecret) {
    throw new Error("WooCommerce environment variables are missing");
  }

  return {
    url,
    credentials: Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64"),
  };
}

export async function getWooProducts(
  query = "",
  limit = 10,
  category = ""
): Promise<WooProductResponse[]> {
  const { url, credentials } = getWooCredentials();

  const params = new URLSearchParams({
    per_page: limit.toString(),
    page: "1",
  });

  if (query) {
    params.set("search", query);
  }

  if (category) {
    params.set("category", category);
  }

const endpoint = `${url}/wp-json/wc/v3/products?${params.toString()}`;

console.log("WooCommerce endpoint:", endpoint);

const response = await fetch(endpoint, {
  headers: {
    Authorization: `Basic ${credentials}`,
  },
  cache: "no-store",
});

console.log("WooCommerce status:", response.status);
console.log(
  "WooCommerce response headers:",
  Object.fromEntries(response.headers.entries())
);

if (!response.ok) {
  const body = await response.text();

  console.log("WooCommerce response body:", body);

  throw new Error(`WooCommerce error: ${response.status}`);
}

  const products = await response.json();

  return products.map((product: any) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    barcode:
      product.sku ||
      product.global_unique_id ||
      undefined,
  }));
}

export async function getWooCategories(): Promise<
  WooCategoryResponse[]
> {
  const { url, credentials } = getWooCredentials();

  const params = new URLSearchParams({
    per_page: "100",
    page: "1",
    hide_empty: "true",
  });

  const response = await fetch(
    `${url}/wp-json/wc/v3/products/categories?${params.toString()}`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`WooCommerce error: ${response.status}`);
  }

  const categories = await response.json();

  return categories.map((category: any) => ({
    id: category.id,
    name: category.name,
  }));
}
