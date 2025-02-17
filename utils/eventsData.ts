import { Events } from "./types";

export const eventsData: Events[] = [
  {
    id: 1,
    title: "Hosting an Event?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.jpg",
    alt: "placeholder text",
    height: 200,
    width: 500,
  },
  {
    id: 2,
    title: "Social. Days",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.jpg",
    alt: "placeholder text",
    height: 200,
    width: 500,
    dates: [
      {
        id: 1,
        date: "15 Mar 2025",
        desc: "NYC Hotdogs",
      },
      {
        id: 2,
        date: "20 Mar 2025",
        desc: "Pizza",
      },
      {
        id: 3,
        date: "01 Apr 2025",
        desc: "Pancakes",
      },
    ],
  },
  {
    id: 3,
    title: "Live Bands",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.jpg",
    alt: "placeholder text",
    height: 200,
    width: 500,
    dates: [
      {
        id: 1,
        date: "20 Mar 2025",
        desc: "Beatles",
      },
    ],
  },
  {
    id: 4,
    title: "Test Ride?",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/placeholder.jpg",
    alt: "placeholder text",
    height: 200,
    width: 500,
  },
];
