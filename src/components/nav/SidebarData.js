import React, { useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import * as Io5Icons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";

let userId = "";

const GetUserId = () => {
  userId = localStorage.getItem("bb_user");

  useEffect(() => {
    userId = GetUserId();
  }, []);
};

export const SidebarData = [
  {
    id: 1,
    title: "Home",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "side-text",
  },
  {
    id: 2,
    title: "User",
    path: `/users/${userId}`,
    icon: <FaIcons.FaUserCircle />,
    cName: "side-text",
  },
  {
    id: 3,
    title: "List",
    path: "/shoppinglist",
    icon: <FaIcons.FaListUl />,
    cName: "side-text",
  },
];

export const SidebarLogout = [
  {
    id: 1,
    title: "Logout",
    path: "/",
    icon: <Io5Icons.IoLogOut />,
    cName: "side-text",
  },
];
