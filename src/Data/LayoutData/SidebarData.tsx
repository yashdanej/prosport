import { useEffect } from "react";
import { MenuItem } from "../../Types/Layout/SidebarType";


const user = JSON.parse(localStorage.getItem("login-user")!)?.user;
console.log("user isAdmin", user);

// export const MasterMenuList: MenuItem[] = [{
//   title: "Admin",
//   lanClass: "lan-8",
//   Items: [
//     { 
//       path: `${process.env.PUBLIC_URL}/masteradmin/dashboard/home`, 
//       title: "Dashboard", 
//       type: "link", 
//       icon: "home",
//     },
//     {
//       title: "Sports",
//       id: 2,
//       icon: "widget",
//       type: "sub",
//       lanClass: "lan-6",
//       active: false,
//       children: [
//         { path: `${process.env.PUBLIC_URL}/masteradmin/cricket-api`, title: "Cricket API", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/football-api`, title: "Football API", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/basketball-api`, title: "Basketball API", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/user-api-key-manager-api`, title: "Users API Key Manager API", type: "link"},
//       ],
//     },
//     {
//       title: "Apps",
//       id: 2,
//       icon: "widget",
//       type: "sub",
//       lanClass: "lan-6",
//       active: false,
//       children: [
//         { path: `${process.env.PUBLIC_URL}/masteradmin/tournament-calendar`, title: "Tournament Calendar", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/inbox`, title: "Inbox", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/invoice-manager`, title: "Invoice Manager", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/file-manager`, title: "File Manager", type: "link"},
//       ],
//     },
//     {
//       title: "Help",
//       id: 2,
//       icon: "widget",
//       type: "sub",
//       lanClass: "lan-6",
//       active: false,
//       children: [
//         { path: `${process.env.PUBLIC_URL}/masteradmin/documentation`, title: "Documentation", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/changelog`, title: "Changelog", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/chat-supports`, title: "Chat Supports", type: "link"},
//       ],
//     },
//     {
//       title: "Pages",
//       id: 2,
//       icon: "widget",
//       type: "sub",
//       lanClass: "lan-6",
//       active: false,
//       children: [
//         { path: `${process.env.PUBLIC_URL}/masteradmin/account-user`, title: "Account & User", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/authentication`, title: "Authentication", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/faqs`, title: "FAQs Update", type: "link"},
//         { path: `${process.env.PUBLIC_URL}/masteradmin/pricing`, title: "Pricing", type: "link"},
//       ],
//     },
//     { 
//       path: `${process.env.PUBLIC_URL}/masteradmin/users-invoices`, 
//       title: "Users Invoices", 
//       type: "link", 
//       icon: "home",
//     },
//     { 
//       path: `${process.env.PUBLIC_URL}/masteradmin/plans`, 
//       title: "Plans", 
//       type: "link", 
//       icon: "home",
//     },
//   ]
//   },
// ]

export const MasterMenuList: MenuItem[] = [{
  title: "Admin",
  lanClass: "lan-8",
  Items: [
    { 
      path: `${process.env.PUBLIC_URL}/masteradmin/dashboard`, 
      title: "Dashboard", 
      type: "link", 
      icon: "home",
    },
    {
      title: "Sports Management",
      id: 2,
      icon: "activity",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/sports/cricket`, title: "Cricket", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/sports/football`, title: "Football", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/sports/basketball`, title: "Basketball", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/sports/add-sport`, title: "Add New Sport", type: "link"},
      ],
    },
    {
      title: "API Management",
      id: 3,
      icon: "server",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/api/overview`, title: "API Overview", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/api/keys`, title: "API Keys", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/api/usage`, title: "Usage Analytics", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/api/documentation`, title: "API Documentation", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/api/versioning`, title: "API Versioning", type: "link"},
      ],
    },
    {
      title: "User Management",
      id: 4,
      icon: "users",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/users/list`, title: "User List", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/users/roles`, title: "User Roles", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/users/permissions`, title: "Permissions", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/users/activity-logs`, title: "Activity Logs", type: "link"},
      ],
    },
    {
      title: "Clients Account & Security",
      id: 5,
      icon: "file-text",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        // { path: `${process.env.PUBLIC_URL}/masteradmin/client/account-security`, title: "Client List", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/client/list`, title: "Client List", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/content/blogs`, title: "Add / Edit Client", type: "link"},
      ],
    },
    {
      title: "Content Management",
      id: 6,
      icon: "file-text",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/content/news`, title: "News Management", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/content/blogs`, title: "Blog Posts", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/content/faqs`, title: "FAQs", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/content/static-pages`, title: "Static Pages", type: "link"},
      ],
    },
    {
      title: "Scoring & Data",
      id: 7,
      icon: "database",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/scoring/live`, title: "Live Scoring", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/scoring/manual`, title: "Manual Scoring", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/scoring/data-entry`, title: "Data Entry", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/scoring/validation`, title: "Data Validation", type: "link"},
      ],
    },
    {
      title: "Financial Management",
      id: 8,
      icon: "dollar-sign",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/finance/overview`, title: "Financial Overview", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/finance/invoices`, title: "Invoices", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/finance/subscriptions`, title: "Subscriptions", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/finance/pricing`, title: "Pricing Management", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/finance/reports`, title: "Financial Reports", type: "link"},
      ],
    },
    {
      title: "Analytics & Reporting",
      id: 9,
      icon: "bar-chart-2",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/analytics/overview`, title: "Analytics Overview", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/analytics/user-metrics`, title: "User Metrics", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/analytics/api-usage`, title: "API Usage Metrics", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/analytics/custom-reports`, title: "Custom Reports", type: "link"},
      ],
    },
    {
      title: "System Configuration",
      id: 10,
      icon: "settings",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/system/general-settings`, title: "General Settings", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/system/integrations`, title: "Integrations", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/system/security`, title: "Security Settings", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/system/backups`, title: "Backups & Maintenance", type: "link"},
      ],
    },
    {
      title: "Support & Help",
      id: 11,
      icon: "help-circle",
      type: "sub",
      lanClass: "lan-6",
      active: false,
      children: [
        { path: `${process.env.PUBLIC_URL}/masteradmin/support/tickets`, title: "Support Tickets", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/support/live-chat`, title: "Live Chat Management", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/support/knowledge-base`, title: "Knowledge Base", type: "link"},
        { path: `${process.env.PUBLIC_URL}/masteradmin/support/announcements`, title: "Announcements", type: "link"},
      ],
    },
    { 
      path: `${process.env.PUBLIC_URL}/masteradmin/audit-logs`, 
      title: "Audit Logs", 
      type: "link", 
      icon: "file",
    },
    { 
      path: `${process.env.PUBLIC_URL}/masteradmin/ai-management`, 
      title: "AI Management", 
      type: "link", 
      icon: "cpu",
    },
  ]
}];

export let MenuList: MenuItem[] =  [
  {
    title: "",
    lanClass: "lan-1",
    Items: [
      { path: `${process.env.PUBLIC_URL}/dashboard/home`, title: "Dashboard", type: "link", icon: "home" },
      { path: `${process.env.PUBLIC_URL}/dashboard/analytics`, title: "Analytics", type: "link", icon: "charts" },
      {
        title: "Sports",
        id: 2,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/dashboard/sports/cricket`, title: "Cricket", type: "link" },
          { path: `${process.env.PUBLIC_URL}/dashboard/sports/football`, title: "Football", type: "link" },
          { path: `${process.env.PUBLIC_URL}/dashboard/sports/basketball`, title: "Basketball", type: "link" },
        ],
      },
      { path: `${process.env.PUBLIC_URL}/dashboard/shop-widget`, title: "Shop Widget", type: "link", icon: "ecommerce" },
      { path: `${process.env.PUBLIC_URL}/dashboard/api-keys`, title: "API Keyset", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/billing`, title: "Billing", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/subscription`, title: "Subscription", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/referral`, title: "Reffer", type: "link", icon: "ui-kits" },
      // { path: `${process.env.PUBLIC_URL}/dashboard/settings`, title: "Setting", type: "link", icon: "ui-kits" },
      {
        title: "Settings",
        id: 9,
        icon: "ui-kits",
        type: "sub",
        lanClass: "lan-7",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/dashboard/settings/profile`, title: "Profile", type: "link" },
          { path: `${process.env.PUBLIC_URL}/dashboard/settings/security`, title: "Security", type: "link" },
          { path: `${process.env.PUBLIC_URL}/dashboard/settings/industry`, title: "Industry", type: "link" },
          { path: `${process.env.PUBLIC_URL}/dashboard/settings/change-log`, title: "Change Log", type: "link" },
          { path: `${process.env.PUBLIC_URL}/dashboard/settings/notifications`, title: "Notification", type: "link" },
        ],
      },
      { path: `${process.env.PUBLIC_URL}/dashboard/api-docs`, title: "API Doc", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/live-scoring-page`, title: "Live Scoring Page", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/ask-prosports-ai`, title: "Ask ProSports Ai", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/support`, title: "Support", type: "link", icon: "ui-kits" },
      { path: `${process.env.PUBLIC_URL}/dashboard/logout`, title: "Logout", type: "link", icon: "ui-kits" },
    ],
  },
];

export default MenuList;
