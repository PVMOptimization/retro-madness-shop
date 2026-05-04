// Shopify Storefront API stub
// To activate: set NEXT_PUBLIC_SHOPIFY_DOMAIN and NEXT_PUBLIC_SHOPIFY_TOKEN in .env.local
// Then replace the mock functions below with real GraphQL calls.

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;

export function shopifyEnabled(): boolean {
  return Boolean(SHOPIFY_DOMAIN && STOREFRONT_TOKEN);
}

// Returns a checkout URL for a given Shopify variant ID.
// Falls back to the store homepage if no variant is mapped.
export async function getCheckoutUrl(variantId: string): Promise<string> {
  if (!shopifyEnabled()) {
    // Mock: redirect to store homepage placeholder
    return `https://${SHOPIFY_DOMAIN || "your-store.myshopify.com"}/cart`;
  }

  const query = `
    mutation cartCreate($variantId: ID!, $quantity: Int!) {
      cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) {
        cart { checkoutUrl }
        userErrors { field message }
      }
    }
  `;

  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables: { variantId, quantity: 1 } }),
  });

  const json = await res.json();
  return json.data?.cartCreate?.cart?.checkoutUrl ?? "/";
}

// Map device+issue → Shopify variant ID (fill these in once products are created)
export const VARIANT_MAP: Record<string, string> = {
  "ps5-hdmi": "gid://shopify/ProductVariant/REPLACE_ME",
  "ps5-power": "gid://shopify/ProductVariant/REPLACE_ME",
  "ps5-disc": "gid://shopify/ProductVariant/REPLACE_ME",
  "ps5-overheat": "gid://shopify/ProductVariant/REPLACE_ME",
  "ps5-controller": "gid://shopify/ProductVariant/REPLACE_ME",
  "xbox-hdmi": "gid://shopify/ProductVariant/REPLACE_ME",
  "xbox-power": "gid://shopify/ProductVariant/REPLACE_ME",
  "xbox-disc": "gid://shopify/ProductVariant/REPLACE_ME",
  "xbox-overheat": "gid://shopify/ProductVariant/REPLACE_ME",
  "switch-screen": "gid://shopify/ProductVariant/REPLACE_ME",
  "switch-charging": "gid://shopify/ProductVariant/REPLACE_ME",
  "switch-joycon": "gid://shopify/ProductVariant/REPLACE_ME",
  "switch-hdmi": "gid://shopify/ProductVariant/REPLACE_ME",
  "joycon-drift": "gid://shopify/ProductVariant/REPLACE_ME",
  "joycon-button": "gid://shopify/ProductVariant/REPLACE_ME",
  "joycon-charge": "gid://shopify/ProductVariant/REPLACE_ME",
};
