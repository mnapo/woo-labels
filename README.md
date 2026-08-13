## Description

Woo Labels is a self-hosted application for creating and printing product label sheets from WooCommerce products.

The application allows users to load products from WooCommerce, assign them to labels, customize the label layout, and generate printable sheets.

## Installation

Install dependencies:

```bash
pnpm install
```

Configure environment variables:

```env
NEXT_PUBLIC_STORE_NAME="Woo Labels"

WOOCOMMERCE_URL=""
WOOCOMMERCE_CONSUMER_KEY=""
WOOCOMMERCE_CONSUMER_SECRET=""
```

## Execution

Run the development server:

```bash
pnpm dev
```

Build the application:

```bash
pnpm build

Alternatively you can: fork this repo and deploy by yourself in Vercel.
```

Start the production server:

```bash
pnpm start
```
