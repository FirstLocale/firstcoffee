export type Home = {
  id: number;
  title: string;
  text: string;
  image: string;
  alt: string;
  height: number;
  width: number;
};

export type Drink = {
  id: number;
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
