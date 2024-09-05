import { useEffect } from "react";
import { MenuItem } from "../../Types/Layout/SidebarType";


const user = JSON.parse(localStorage.getItem("login-user")!)?.user;
console.log("user isAdmin", user);

export const MasterMenuList: MenuItem[] = [{
  title: "Admin",
  lanClass: "lan-8",
  Items: [
    { 
      path: `${process.env.PUBLIC_URL}/masteradmin/dashboard/home`, 
      title: "Dashboard", 
      type: "link", 
      icon: "home",
    },
    {
      title: "Sports",
      id: 2,
      icon: "widget",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/cricket-api`, title: "Cricket API", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/football-api`, title: "Football API", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/basketball-api`, title: "Basketball API", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/user-api-key-manager-api`, title: "Users API Key Manager API", type: "link"},
      ],
    },
    {
      title: "Apps",
      id: 2,
      icon: "widget",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/tournament-calendar`, title: "Tournament Calendar", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/inbox`, title: "Inbox", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/invoice-manager`, title: "Invoice Manager", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/file-manager`, title: "File Manager", type: "link"},
      ],
    },
    {
      title: "Help",
      id: 2,
      icon: "widget",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/documentation`, title: "Documentation", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/changelog`, title: "Changelog", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/chat-supports`, title: "Chat Supports", type: "link"},
      ],
    },
    {
      title: "Pages",
      id: 2,
      icon: "widget",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/account-user`, title: "Account & User", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/authentication`, title: "Authentication", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/faqs`, title: "FAQs Update", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/pricing`, title: "Pricing", type: "link"},
      ],
    },
    { 
      path: `${process.env.PUBLIC_URL}/masteradmin/allusers`, 
      title: "All Users", 
      type: "link", 
      icon: "home",
    },
    { 
      path: `${process.env.PUBLIC_URL}/masteradmin/users-invoices`, 
      title: "Users Invoices", 
      type: "link", 
      icon: "home",
    },
    { 
      path: `${process.env.PUBLIC_URL}/masteradmin/plans`, 
      title: "Plans", 
      type: "link", 
      icon: "home",
    },
  ]
  },
]

export let MenuList: MenuItem[] =  [
  {
    title: "",
    lanClass: "lan-1",
    Items: [
      { path: `${process.env.PUBLIC_URL}/dashboard/home`, title: "Dashboard", type: "link", icon: "home" },
      { path: `${process.env.PUBLIC_URL}/dashboard/Analytics`, title: "Analytics", type: "link", icon: "charts" },
      {
        title: "Sports",
        id: 2,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/sports/cricket`, title: "Cricket", type: "link" },
        ],
      },
      { path: `${process.env.PUBLIC_URL}/dashboard/shop_widget`, title: "Shop Widget", type: "link", icon: "ecommerce" },
      { path: `${process.env.PUBLIC_URL}/dashboard/api_keyset`, title: "API Keyset", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/billing`, title: "Billing", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/pricing`, title: "Subscription", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/reffer`, title: "Reffer", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/setting`, title: "Setting", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/api/docs`, title: "API Doc", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/support`, title: "Support", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/logout`, title: "Logout", type: "link", icon: "ui-kits" },
    ],
  },
];

export default MenuList;
