import React from "react";
import * as AiIcons from "react-icons/ai";
import * as Io5Icons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "side-text",
  },
  {
    title: "User",
    path: "/users/:userId(d+)",
    icon: <FaIcons.FaUserCircle />,
    cName: "side-text",
  },
  {
    title: "List",
    path: "/shoppinglist",
    icon: <FaIcons.FaListUl />,
    cName: "side-text",
  },
];

export const SidebarLogout = [
  {
    title: "Logout",
    path: "/",
    icon: <Io5Icons.IoLogOut />,
    cName: "side-text",
  },
];
