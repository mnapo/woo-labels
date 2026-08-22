type WooProductResponse = {
  id: number;
  name: string;
  price: string;
  sku?: string;
  barcode?: string;
  global_unique_id?: string;
};

type WooCategoryResponse = {
  id: number;
  name: string;
};

function getWooUrl() {
  const url = process.env.WOOCOMMERCE_URL;

  if (!url) {
    throw new Error(
      "WOOCOMMERCE_URL environment variable is missing"
    );
  }

  return url.replace(/\/$/, "");
}

export async function getWooProducts(
  query = "",
  limit = 10,
  category = ""
) {
  const baseUrl = getWooUrl();

  const params = new URLSearchParams({
    limit: String(Math.min(Math.max(limit, 1), 100)),
  });

  if (query) {
    params.set("q", query);
  }

  if (category) {
    params.set("category", category);
  }

  const response = await fetch(
    `${baseUrl}/wp-json/woo-labels/v1/products?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `WooCommerce error: ${response.status}${
        body ? `: ${body}` : ""
      }`
    );
  }

  const products: WooProductResponse[] =
    await response.json();

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    barcode:
      product.barcode ||
      product.sku ||
      product.global_unique_id ||
      undefined,
  }));
}

export async function getWooCategories() {
  const baseUrl = getWooUrl();

  const response = await fetch(
    `${baseUrl}/wp-json/woo-labels/v1/categories`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(
      `WooCommerce error: ${response.status}${
        body ? `: ${body}` : ""
      }`
    );
  }

  const categories: WooCategoryResponse[] =
    await response.json();

  return categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));
}
