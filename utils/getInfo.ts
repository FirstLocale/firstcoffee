import {
  ShopifyMetaobjectConnection,
  ShopifyMetaobjectEdge,
  ShopifyMetaobjectField,
} from "./types";

export async function GetInfo(
  metaobjectType: string,
  fieldKey?: string,
  resolveImageUrls: boolean = false // Default false
): Promise<ShopifyMetaobjectConnection | null> {
  try {
    //console.log("Fetching data from Shopify...");
    //console.log("Store Domain:", process.env.SHOPIFY_STORE_DOMAIN);

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
                query GetMetaobjects {
                  metaobjects(first: 250, type: "${metaobjectType}") {
                    edges {
                      node {
                        id
                        handle
                        type
                        fields {
                          key
                          value
                          ${
                            resolveImageUrls
                              ? `
                          reference {
                            ... on MediaImage {
                              id
                              image {
                                url
                              }
                            }
                          }`
                              : ""
                          }
                        }
                        ${
                          fieldKey
                            ? `field(key: "${fieldKey}") {
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
                                    ${
                                      resolveImageUrls
                                        ? `
                                    reference {
                                      ... on MediaImage {
                                        id
                                        image {
                                          url
                                        }
                                      }
                                    }`
                                        : ""
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }`
                            : ""
                        }
                      }
                    }
                  }
                }
              `,
        }),
      }
    );

    //console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("Shopify API Response:", data);

    const metaobjects = data?.data?.metaobjects || null;

    // Only process and replace image GIDs with actual URLs if resolveImageUrls is true
    if (resolveImageUrls && metaobjects) {
      metaobjects.edges.forEach((edge: ShopifyMetaobjectEdge) => {
        edge.node.fields.forEach((field: ShopifyMetaobjectField) => {
          if (field.reference?.image?.url) {
            field.value = field.reference.image.url;
          }
        });
      });
    }

    return metaobjects;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
