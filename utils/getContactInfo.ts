export async function GetContactInfo() {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        query: `
          query GetContactInfo {
            metaobject(handle: { namespace: "custom", key: "contact_info" }) {
              title
              text
              details {
                ... on Metaobject {
                  name
                  tel
                  email
                }
              }
            }
          }
        `,
      }),
    }
  );

  const data = await response.json();
  return data;
}
