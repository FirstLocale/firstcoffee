import { Drink, Food } from "./types";

// -------- COFFEE ---------

export const drinkData: Drink[] = [
  {
    id: 1,
    item: "Coffee.",
    image: "/coffee.avif",
    alt: "birds eye view of a premium coffee",
    height: 200,
    width: 500,
    menu: [
      {
        id: 1,
        item: "Espresso",
        reg: 2.4,
        lrg: "0",
      },
      {
        id: 2,
        item: "Long Black",
        reg: 2.5,
        lrg: "0",
      },
      {
        id: 3,
        item: "Americano",
        reg: 2.6,
        lrg: 3.1,
      },
      {
        id: 4,
        item: "Cortado",
        reg: 2.7,
        lrg: "0",
      },
      {
        id: 5,
        item: "Flat White",
        reg: 3.0,
        lrg: "0",
      },
      {
        id: 6,
        item: "Latte",
        reg: 3.2,
        lrg: 3.7,
      },
      {
        id: 7,
        item: "Cappuccino",
        reg: 3.2,
        lrg: 3.7,
      },
      {
        id: 8,
        item: "Mocha",
        reg: 3.6,
        lrg: 4.1,
      },
      {
        id: 9,
        item: "Guest Coffee",
        reg: "+ 0.50",
        lrg: "0",
      },
      {
        id: 10,
        item: "Oat | Coconut",
        reg: "+ 0.50",
        lrg: "0",
      },
    ],
  },
  {
    id: 2,
    item: "Coffee on the Rocks.",
    image: "/icedCoffee.avif",
    alt: "glass of iced coffee with a milky mix",
    height: 200,
    width: 500,
    menu: [
      {
        id: 1,
        item: "Iced Espresso Tonic",
        reg: 3.9,
        lrg: "0",
      },
      {
        id: 2,
        item: "Iced Americano",
        reg: 3.3,
        lrg: "0",
      },
      {
        id: 3,
        item: "Iced Latte",
        reg: 3.5,
        lrg: "0",
      },
      {
        id: 4,
        item: "Iced Tea",
        reg: 2.95,
        lrg: "0",
      },
    ],
  },
  {
    id: 3,
    item: "Not Coffee.",
    image: "/hotChoc.avif",
    alt: "a rustic hot chocolate with marshmallows",
    height: 200,
    width: 500,
    menu: [
      {
        id: 1,
        item: "Infused Latte",
        opts: `Chai | Matcha | Turmeric | Beetroot |
          Make it dirty + 1.00`,
        reg: 3.2,
        lrg: "0",
      },
      {
        id: 2,
        item: "Hot Chocolate",
        opts: "White | Milk | Dark",
        reg: 3.2,
        lrg: 3.7,
      },
      {
        id: 3,
        item: "Loaded Hot Chocolate",
        opts: `White | Milk | Dark | Cream | 
          Marshmallows`,
        reg: 4.2,
        lrg: 4.7,
      },
      {
        id: 4,
        item: "Tea",
        opts: `Decaf | Breakfast | Green | Peppermint
          | Red Berry | Camomile`,
        reg: 2.5,
        lrg: "0",
      },
    ],
  },
];

// -------- BREAKFAST ---------

export const breakfastData: Food[] = [
  {
    id: 1,
    item: "BYO Breakfast Baps.",
    desc: `Pick your own fillings and we will serve them
        in a wood fired, enriched dough Spud bun from
        Acre Farm starting from 6`,
    image: "/breakfastRoll.avif",
    alt: "a breakfast roll",
    height: 200,
    width: 500,
    menu: [
      {
        id: 1,
        item: "Bacon",
        reg: 1.5,
      },
      {
        id: 2,
        item: "Sausage",
        reg: 1.5,
      },
      {
        id: 3,
        item: "Fried Egg",
        reg: 1.0,
      },
      {
        id: 4,
        item: "Avacado",
        reg: 1.5,
      },
      {
        id: 5,
        item: "Halloumi",
        reg: 1.5,
      },
      {
        id: 6,
        item: "Sliced Cheese",
        reg: 1.0,
      },
      {
        id: 7,
        item: "Spinach",
        reg: 1.0,
      },
      {
        id: 8,
        item: "Hash Brown",
        reg: 1.5,
      },
      {
        id: 9,
        item: "Beans",
        reg: 1.0,
      },
    ],
  },
  {
    id: 2,
    item: "Waffles.",
    desc: "Belgian sugar waffles topped with either: - Bacon & maple syrup - Fresh berries, yogurt, honey & granola",
    image: "/waffles.avif",
    alt: "plate of waffles with strawberries and blueberries on top",
    height: 200,
    width: 500,
  },
  {
    id: 3,
    item: "Smashed Avacado on Toast.",
    desc: "Seasoned avacado on sourdough toast with whipped feta, sunflower seeds and crispy chilli oil",
    image: "/avoToast.jpeg",
    alt: "smashed avocado on toast",
    height: 200,
    width: 500,
  },
  {
    id: 4,
    item: "Naughty Mash.",
    desc: "The smashed avacado and all its goodnes with added bacon and a fried egg",
    image: "/mashPotato.avif",
    alt: "a potato being mashed",
    height: 200,
    width: 500,
  },
];
