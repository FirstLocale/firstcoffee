// Shopify returns values as strings, even when defined as int
// ------ HOME -----

export type Home = {
  id: number | string;
  title: string;
  text: string;
  image: string;
  alt: string;
  height: number | string;
  width: number | string;
};

// ------ MENU -----

export type Drink = {
  id: number | string;
  item: string;
  image: string;
  alt: string;
  height: number;
  width: number;
  menu: MenuItem[];
};

export type MenuItem = {
  id: number;
  item: string;
  reg: number | string;
  lrg?: number | string;
  opts?: string;
};

export type Breakfast = {
  id: number;
  item: string;
  desc: string;
  image: string;
  alt: string;
  height: number;
  width: number;
  menu?: MenuItem[];
};

// ------ ABOUT -----

export type About = {
  id: number | string;
  title: string;
  text: string;
  staff: Staff[];
};

type Staff = {
  id: number | string;
  image: string;
  alt: string;
  height: number | string;
  width: number | string;
  name: string;
  rank: string;
};

// ------ CONTACT -----

export type Contact = {
  id: number | string;
  title: string;
  text: string;
  detail: Detail[];
};

export type Detail = {
  id: number | string;
  name: string;
  tel: string | number;
  email: string;
};

// ------ SHOPIFY QUERY -----

export type ShopifyMetaobjectField = {
  key: string;
  value: string;
  reference?: {
    image: {
      url: string;
    };
  };
  references?: {
    edges: ShopifyMetaobjectEdge[];
  };
};

export type ShopifyMetaobject = {
  id: string;
  handle: string;
  type: string;
  fields: ShopifyMetaobjectField[];
  field?: {
    references?: ShopifyMetaobjectConnection;
  };
};

export type ShopifyMetaobjectEdge = {
  node: ShopifyMetaobject;
};

export type ShopifyMetaobjectConnection = {
  edges: ShopifyMetaobjectEdge[];
};

export type ShopifyContactInfoResponse = {
  data: {
    metaobjects: ShopifyMetaobjectConnection;
  };
};

// ----- EVENTS -----

export type Events = {
  id: number | string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  height: number | string;
  width: number | string;
  dates?: Dates[];
};

type Dates = {
  id: number | string;
  date: string;
  desc: string;
};
