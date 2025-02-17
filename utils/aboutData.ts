import { About } from "./types";

export const aboutData: About[] = [
  {
    id: 1,
    title: "Our Story",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    staff: [
      {
        id: 1,
        image: "/placeholder.jpg",
        alt: "placeholder text",
        height: 500,
        width: 500,
        name: "Georgia",
        rank: "Owner",
      },
      {
        id: 2,
        image: "/placeholder.jpg",
        alt: "placeholder text",
        height: 500,
        width: 500,
        name: "Matt",
        rank: "Owner",
      },
      {
        id: 3,
        image: "/placeholder.jpg",
        alt: "placeholder text",
        height: 500,
        width: 500,
        name: "Ollie",
        rank: "Chef",
      },
    ],
  },
];
