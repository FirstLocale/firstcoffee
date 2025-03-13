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
    console.log("Shopify API Response for menu:", data);

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
          drinkData = processDrinks(field.references.edges, resolveImageUrls);
        } else if (field.key === "breakfasts" && field.references) {
          breakfastData = processBreakfasts(
            field.references.edges,
            resolveImageUrls
          );
        } else if (field.key === "lunch" && field.references) {
          lunchData = processLunch(field.references.edges, resolveImageUrls);
        } else if (field.key === "pizza" && field.references) {
          pizzaData = processPizza(field.references.edges, resolveImageUrls);
        }
      }
    }

    return { drinkData, breakfastData, lunchData, pizzaData };
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return null;
  }
}

// Process drinks data
function processDrinks(
  drinksEdges: ShopifyMetaobjectEdge[],
  resolveImageUrls: boolean
): Drink[] {
  return drinksEdges.map((drinkEdge, index) => {
    const drinkNode = drinkEdge.node;
    let menu: MenuItem[] = [];
    let image = "";
    let alt = "";
    let height = 0;
    let width = 0;
    let item = "";

    // Process each field
    for (const field of drinkNode.fields) {
      if (field.key === "item") {
        item = field.value;
      } else if (
        field.key === "img" &&
        resolveImageUrls &&
        field.reference?.image?.url
      ) {
        image = field.reference.image.url;
      } else if (field.key === "alt") {
        alt = field.value;
      } else if (field.key === "height") {
        height = parseInt(field.value || "0");
      } else if (field.key === "width") {
        width = parseInt(field.value || "0");
      } else if (field.key === "drink_menu" && field.references) {
        // Process drink menu items
        menu = field.references.edges.map((menuEdge, menuIndex) => {
          const menuNode = menuEdge.node;
          const menuItem: MenuItem = { id: menuIndex + 1, item: "", reg: "" };

          for (const menuField of menuNode.fields) {
            if (menuField.key === "item") {
              menuItem.item = menuField.value;
            } else if (menuField.key === "opts") {
              menuItem.opts = menuField.value;
            } else if (menuField.key === "reg") {
              menuItem.reg = isNaN(parseFloat(menuField.value))
                ? menuField.value
                : parseFloat(menuField.value);
            } else if (menuField.key === "lrg") {
              menuItem.lrg = isNaN(parseFloat(menuField.value))
                ? menuField.value
                : parseFloat(menuField.value);
            }
          }

          return menuItem;
        });
      }
    }

    return {
      id: index + 1,
      item,
      image,
      alt,
      height,
      width,
      menu,
    };
  });
}

// Process breakfasts data
function processBreakfasts(
  breakfastsEdges: ShopifyMetaobjectEdge[],
  resolveImageUrls: boolean
): Food[] {
  return breakfastsEdges.map((breakfastEdge, index) => {
    const breakfastNode = breakfastEdge.node;
    let menu: MenuItem[] = [];
    let image = "";
    let alt = "";
    let height = 0;
    let width = 0;
    let item = "";
    let desc = "";

    // Process each field
    for (const field of breakfastNode.fields) {
      if (field.key === "item") {
        item = field.value;
      } else if (field.key === "desc") {
        desc = field.value;
      } else if (
        field.key === "img" &&
        resolveImageUrls &&
        field.reference?.image?.url
      ) {
        image = field.reference.image.url;
      } else if (field.key === "alt") {
        alt = field.value;
      } else if (field.key === "height") {
        height = parseInt(field.value || "0");
      } else if (field.key === "width") {
        width = parseInt(field.value || "0");
      } else if (field.key === "breakfast_menu" && field.references) {
        // Process breakfast menu items
        menu = field.references.edges.map((menuEdge, menuIndex) => {
          const menuNode = menuEdge.node;
          const menuItem: MenuItem = { id: menuIndex + 1, item: "", reg: "" };

          for (const menuField of menuNode.fields) {
            if (menuField.key === "item") {
              menuItem.item = menuField.value;
            } else if (menuField.key === "reg") {
              menuItem.reg = isNaN(parseFloat(menuField.value))
                ? menuField.value
                : parseFloat(menuField.value);
            }
          }

          return menuItem;
        });
      }
    }

    return {
      id: index + 1,
      item,
      desc,
      image,
      alt,
      height,
      width,
      menu,
    };
  });
}

// Process lunch data
function processLunch(
  lunchEdges: ShopifyMetaobjectEdge[],
  resolveImageUrls: boolean
): Food[] {
  return lunchEdges.map((lunchEdge, index) => {
    const lunchNode = lunchEdge.node;
    let menu: MenuItem[] = [];
    let image = "";
    let alt = "";
    let height = 0;
    let width = 0;
    let item = "";
    let desc = "";

    // Process each field
    for (const field of lunchNode.fields) {
      if (field.key === "item") {
        item = field.value;
      } else if (field.key === "desc") {
        desc = field.value;
      } else if (
        field.key === "img" &&
        resolveImageUrls &&
        field.reference?.image?.url
      ) {
        image = field.reference.image.url;
      } else if (field.key === "alt") {
        alt = field.value;
      } else if (field.key === "height") {
        height = parseInt(field.value || "0");
      } else if (field.key === "width") {
        width = parseInt(field.value || "0");
      } else if (field.key === "lunches_menu" && field.references) {
        // Process lunch menu items
        menu = field.references.edges.map((menuEdge, menuIndex) => {
          const menuNode = menuEdge.node;
          const menuItem: MenuItem = { id: menuIndex + 1, item: "", reg: "" };

          for (const menuField of menuNode.fields) {
            if (menuField.key === "item") {
              menuItem.item = menuField.value;
            } else if (menuField.key === "reg") {
              menuItem.reg = isNaN(parseFloat(menuField.value))
                ? menuField.value
                : parseFloat(menuField.value);
            }
          }

          return menuItem;
        });
      }
    }

    return {
      id: index + 1,
      item,
      desc,
      image,
      alt,
      height,
      width,
      menu,
    };
  });
}

// Process pizza data
function processPizza(
  pizzaEdges: ShopifyMetaobjectEdge[],
  resolveImageUrls: boolean
): Food[] {
  return pizzaEdges.map((pizzaEdge, index) => {
    const pizzaNode = pizzaEdge.node;
    let menu: MenuItem[] = [];
    let image = "";
    let alt = "";
    let height = 0;
    let width = 0;
    let item = "";
    let desc = "";

    // Process each field
    for (const field of pizzaNode.fields) {
      if (field.key === "item") {
        item = field.value;
      } else if (field.key === "desc") {
        desc = field.value;
      } else if (
        field.key === "img" &&
        resolveImageUrls &&
        field.reference?.image?.url
      ) {
        image = field.reference.image.url;
      } else if (field.key === "alt") {
        alt = field.value;
      } else if (field.key === "height") {
        height = parseInt(field.value || "0");
      } else if (field.key === "width") {
        width = parseInt(field.value || "0");
      } else if (field.key === "pizzas_menu" && field.references) {
        // Process pizza menu items
        menu = field.references.edges.map((menuEdge, menuIndex) => {
          const menuNode = menuEdge.node;
          const menuItem: MenuItem = { id: menuIndex + 1, item: "", reg: "" };

          for (const menuField of menuNode.fields) {
            if (menuField.key === "item") {
              menuItem.item = menuField.value;
            } else if (menuField.key === "reg") {
              menuItem.reg = isNaN(parseFloat(menuField.value))
                ? menuField.value
                : parseFloat(menuField.value);
            }
          }

          return menuItem;
        });
      }
    }

    return {
      id: index + 1,
      item,
      desc,
      image,
      alt,
      height,
      width,
      menu,
    };
  });
}
