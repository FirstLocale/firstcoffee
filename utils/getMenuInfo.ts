import { Drink, Food, MenuItem, ShopifyMetaobjectEdge } from "./types";

export async function GetMenuInfo(resolveImageUrls: boolean = false): Promise<{
  drinkData: Drink[];
  breakfastData: Food[];
  lunchData: Food[];
  pizzaData: Food[];
} | null> {
  try {
    //console.log("Fetching menu data from Shopify...");

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
            query GetMenuMetaobjects {
              metaobjects(first: 10, type: "menu_info") {
                edges {
                  node {
                    id
                    type
                    fields {
                      key
                      value
                      references(first: 50) {
                        edges {
                          node {
                            ... on Metaobject {
                              id
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
                                references(first: 50) {
                                  edges {
                                    node {
                                      ... on Metaobject {
                                        id
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
                    }
                  }
                }
              }
            }
          `,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("Shopify API Response for menu:", data);

    // Extract the metaobjects
    const metaobjects = data?.data?.metaobjects?.edges || [];

    let drinkData: Drink[] = [];
    let breakfastData: Food[] = [];
    let lunchData: Food[] = [];
    let pizzaData: Food[] = [];

    // Process menu_info metaobject to extract drinks and breakfasts
    for (const edge of metaobjects) {
      const menuInfoNode = edge.node;

      // Find drinks, breakfasts, lunches and pizzas fields
      for (const field of menuInfoNode.fields) {
        if (field.key === "drinks" && field.references) {
          drinkData = processMenuData<Drink>(
            field.references.edges,
            resolveImageUrls,
            "drink_menu"
          );
        } else if (field.key === "breakfasts" && field.references) {
          breakfastData = processMenuData<Food>(
            field.references.edges,
            resolveImageUrls,
            "breakfast_menu"
          );
        } else if (field.key === "lunch" && field.references) {
          lunchData = processMenuData<Food>(
            field.references.edges,
            resolveImageUrls,
            "lunches_menu"
          );
        } else if (field.key === "pizza" && field.references) {
          pizzaData = processMenuData<Food>(
            field.references.edges,
            resolveImageUrls,
            "pizzas_menu"
          );
        }
      }
    }

    return { drinkData, breakfastData, lunchData, pizzaData };
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return null;
  }
}

function processMenuData<T extends Drink | Food>(
  edges: ShopifyMetaobjectEdge[],
  resolveImageUrls: boolean,
  menuKey: string
): T[] {
  return edges.map((edge, index) => {
    const node = edge.node;
    let menu: MenuItem[] = [];
    let image = "";
    let alt = "";
    let height = 0;
    let width = 0;
    let item = "";
    let desc = ""; // Only used for food items

    // Process each field
    for (const field of node.fields) {
      switch (field.key) {
        case "item":
          item = field.value;
          break;
        case "desc":
          desc = field.value;
          break;
        case "img":
          if (resolveImageUrls && field.reference?.image?.url) {
            image = field.reference.image.url;
          }
          break;
        case "alt":
          alt = field.value;
          break;
        case "height":
          height = parseInt(field.value || "0");
          break;
        case "width":
          width = parseInt(field.value || "0");
          break;
        default:
          if (field.key === menuKey && field.references) {
            // Process menu items
            menu = field.references.edges.map((menuEdge, menuIndex) => {
              const menuNode = menuEdge.node;
              const menuItem: MenuItem = {
                id: menuIndex + 1,
                item: "",
                reg: "",
              };

              for (const menuField of menuNode.fields) {
                switch (menuField.key) {
                  case "item":
                    menuItem.item = menuField.value;
                    break;
                  case "opts":
                    menuItem.opts = menuField.value;
                    break;
                  case "reg":
                    menuItem.reg = isNaN(parseFloat(menuField.value))
                      ? menuField.value
                      : parseFloat(menuField.value);
                    break;
                  case "lrg":
                    menuItem.lrg = isNaN(parseFloat(menuField.value))
                      ? menuField.value
                      : parseFloat(menuField.value);
                    break;
                }
              }

              return menuItem;
            });
          }
      }
    }

    return {
      id: index + 1,
      item,
      ...(desc ? { desc } : {}), // Only include desc if it exists
      image,
      alt,
      height,
      width,
      menu,
    } as T;
  });
}
