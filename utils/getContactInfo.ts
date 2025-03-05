import { ShopifyContactInfoResponse } from "../utils/types";

export async function GetContactInfo(): Promise<ShopifyContactInfoResponse | null> {
  try {
    console.log("Fetching data from Shopify...");
    console.log("This is the URL:", process.env.SHOPIFY_STORE_DOMAIN);

    const response = await fetch(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
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
              metaobjects(first: 1, type: "contact_info") {
                edges {
                  node {
                    id
                    handle
                    type
                    fields {
                      key
                      value
                    }
                    field(key: "details") {
                      references(first: 50) {
                        edges {
                          node {
                            ... on Metaobject {
                              id
                              handle
                              type
                              fields {
                                key
                                value
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ShopifyContactInfoResponse = await response.json();
    console.log("Shopify API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
