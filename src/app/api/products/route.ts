export async function GET() {
  const response = await fetch(
    "https://nextcell.com.ar/wp-json/woo-labels/v1/ping",
    {
      cache: "no-store",
    }
  );

  const text = await response.text();

  return new Response(
    JSON.stringify({
      status: response.status,
      body: text,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
