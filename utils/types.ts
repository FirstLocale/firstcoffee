// ------ HOME -----

export type Home = {
  id: number;
  title: string;
  text: string;
  image: string;
  alt: string;
  height: number;
  width: number;
};

// ------ MENU -----

export type Drink = {
  id: number;
  item: string;
  image: string;
  alt: string;
  height: number;
  width: number;
  menu: MenuItem[];
};

type MenuItem = {
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
  id: number;
  title: string;
  text: string;
  staff: Staff[];
};

type Staff = {
  id: number;
  image: string;
  alt: string;
  height: number;
  width: number;
  name: string;
  rank: string;
};

// ------ CONTACT -----

export type Contact = {
  id: number;
  title: string;
  text: string;
  detail: Detail[];
};

export type Detail = {
  id: number;
  name: string;
  tel: string | number;
  email: string;
};

// ------ CONTACT SHOPIFY QUERY -----

export type ShopifyMetaobjectField = {
  key: string;
  value: string;
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
  id: number;
  title: string;
  desc: string;
  image: string;
  alt: string;
  height: number;
  width: number;
  dates?: Dates[];
};

type Dates = {
  id: number;
  date: string;
  desc: string;
};
