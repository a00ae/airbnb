import { RiQuestionLine } from "@remixicon/react";



export interface MenuList {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  titles?: string[];
}



export const menu: MenuList[] = [
  {
    icon: <RiQuestionLine />,
    title: "help center",
  },
  {
    title: "become a host",
    description: "it's easy to start hosting and earn extra income",
  },
  {
    titles: ["rever a host", "find a co-host", "gift cards"],
  },
  {
    title: "log in or sign up",
  },
];