import { MenuItem } from "../../Types/Layout/SidebarType";


export const MenuList: MenuItem[] = [
  {
    title: "General",
    lanClass: "lan-1",
    Items: [
      {
        title: "Dashboards",
        id: 1,
        icon: "home",
        type: "sub",
        lanClass: "lan-3",
        children: [
          { path: `${process.env.PUBLIC_URL}/dashboard/default`, title: "Default", type: "link", lanClass: "lan-4" },
          { path: `${process.env.PUBLIC_URL}/dashboard/project`, title: "Project", type: "link", lanClass: "lan-5" },
          { path: `${process.env.PUBLIC_URL}/dashboard/ecommerce`, title: "Ecommerce", type: "link" },
          { path: `${process.env.PUBLIC_URL}/dashboard/education`, title: "Education", type: "link" },
        ],
      },
      {
        title: "Widgets",
        id: 2,
        icon: "widget",
        type: "sub",
        lanClass: "lan-6",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/widgets/general`, title: "General", type: "link" },
          { path: `${process.env.PUBLIC_URL}/widgets/chart`, title: "Chart", type: "link" },
        ],
      },
      {
        title: "Page layout",
        id: 3,
        icon: "layout",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/page_layout/hide_nav_scroll`, title: "Hide Nav Scroll", type: "link" }
        ],
      },
    ],
  },
  {
    title: "Applications",
    lanClass: "lan-8",
    Items: [
      {
        title: "Project",
        id: 3,
        icon: "project",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/project/project_list`, type: "link", title: "Project-List" },
          { path: `${process.env.PUBLIC_URL}/project/create_new`, type: "link", title: "Create New" },
        ],
      },
      { path: `${process.env.PUBLIC_URL}/app/file_manager`, icon: "file", title: "File Manager", type: "link" },
      {
        title: "Ecommerce",
        id: 6,
        icon: "ecommerce",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/ecommerce/add_product`, title: "Add Products", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/products`, title: "Products", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/product_page`, title: "Product Page", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/product_list`, title: "Product List", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/payment_details`, title: "Payment Detail", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/order_history`, title: "OrderHistory", type: "link" },
          {
            title: "Invoice",
            type: "sub",
            children: [
              { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice1`, title: "Invoice-1", type: "link" },
              { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice2`, title: "Invoice-2", type: "link" },
              { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice3`, title: "Invoice-3", type: "link" },
              { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice4`, title: "Invoice-4", type: "link" },
              { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice5`, title: "Invoice-5", type: "link" },
              { path: `${process.env.PUBLIC_URL}/ecommerce/invoice/invoice6`, title: "Invoice-6", type: "link" },
            ],
          },
          { path: `${process.env.PUBLIC_URL}/ecommerce/cart`, title: "Cart", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/wishlist`, title: "Wishlist", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/checkout`, title: "Checkout", type: "link" },
          { path: `${process.env.PUBLIC_URL}/ecommerce/pricing`, title: "Pricing", type: "link" },
        ],
      },
      { path: `${process.env.PUBLIC_URL}/email/letter_box`, icon: "email", title: "Letter Box", type: "link", id: 7 },
      {
        title: "Chat",
        id: 8,
        icon: "chat",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/chat/private_chat`, type: "link", title: "Private Chat" },
          { path: `${process.env.PUBLIC_URL}/chat/group_chat`, type: "link", title: "Group Chat" },
        ],
      },
      {
        title: "Users",
        icon: "user",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/users/user_profile`, type: "link", title: "User Profile" },
          { path: `${process.env.PUBLIC_URL}/users/user_edit`, type: "link", title: "User Edit" },
          { path: `${process.env.PUBLIC_URL}/users/cards`, type: "link", title: "User Cards" },
        ],
      },
      { path: `${process.env.PUBLIC_URL}/app/bookmark`, icon: "bookmark", type: "link", title: "Bookmark", id: 10 },
      { path: `${process.env.PUBLIC_URL}/app/contacts`, title: "Contact", icon: "contact", type: "link", id: 11, active: false },
      { path: `${process.env.PUBLIC_URL}/app/task`, icon: "task", type: "link", title: "Task" },
      { path: `${process.env.PUBLIC_URL}/app/calendar`, icon: "calendar", type: "link", title: "Calendar" },
      { path: `${process.env.PUBLIC_URL}/app/social_app`, icon: "social", type: "link", title: "Social App" },
      { path: `${process.env.PUBLIC_URL}/app/todo`, icon: "to-do", type: "link", title: "Todo" },
      { path: `${process.env.PUBLIC_URL}/app/search_result`, icon: "search", type: "link", title: "Search Result" },
    ],
  },
  {
    title: "Forms & Table",
    Items: [
      {
        title: "Forms",
        id: 17,
        icon: "form",
        type: "sub",
        active: false,
        children: [
          {
            title: "Form Controls",
            type: "sub",
            children: [
              { title: "Form Validation", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/form_validation`,bookmark: true },
              { title: "Base Inputs", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/base_input` },
              { title: "Checkbox & Radio", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/radio_checkbox` },
              { title: "Input Groups", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/input_groups` },
              { title: "Input Mask", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/input_mask` },
              { title: "Mega Option", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_controls/mega_option` },
            ],
          },
          {
            title: "Form Widget",
            type: "sub",
            children: [
              { title: "Datepicker", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/datepicker` },
              { title: "Touchspin", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/touchspin` },
              { title: "Switch", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/switch` },
              { title: "Typeahead", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/typeahead` },
              { title: "Clipboard", type: "link", path: `${process.env.PUBLIC_URL}/forms/forms_widget/clipboard` },
            ],
          },
          {
            title: "Form Layout",
            type: "sub",
            children: [
              { path: `${process.env.PUBLIC_URL}/forms/forms_layout/form_wizard_1`, title: "Form Wizard 1", type: "link" },
              { path: `${process.env.PUBLIC_URL}/forms/forms_layout/form_wizard_2`, title: "Form Wizard 2", type: "link" },
              { path: `${process.env.PUBLIC_URL}/forms/forms_layout/two_factor`, title: "Two factor", type: "link" },
            ],
          },
        ],
      },

      {
        title: "Table",
        icon: "table",
        id: 18,
        type: "sub",
        children: [
          {
            title: "Bootstrap Tables",
            type: "sub",
            children: [
              {
                title: "Basic Tables",
                type: "link",
                path: `${process.env.PUBLIC_URL}/table/reactstrap_table/basic_table`,
              
              },
              {
                title: "Table Components",
                type: "link",
                path: `${process.env.PUBLIC_URL}/table/reactstrap_table/table_component`,
              },
            ],
          },
          {
            title: "Data Tables",
            type: "sub",
            children: [
              { path: `${process.env.PUBLIC_URL}/table/data_table/basic_init`, title: "Basic Init", type: "link" },
              { path: `${process.env.PUBLIC_URL}/table/data_table/advance_init`, title: "Advance Init", type: "link" },
              { path: `${process.env.PUBLIC_URL}/table/data_table/api`, title: "API", type: "link" },
              { path: `${process.env.PUBLIC_URL}/table/data_table/data_sources`, title: "Data Source", type: "link" },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Components",
    Items: [
      {
        title: "Ui-Kits",
        icon: "ui-kits",
        id: 19,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/uikits/typography`, title: "Typography", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/avatars`, title: "Avatars", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/helperclass`, title: "Helper Classes", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/grid`, title: "Grid", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/tagpills`, title: "Tag & Pills", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/progress`, title: "Progress", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/modal`, title: "Modal", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/alert`, title: "Alert", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/popover`, title: "Popover", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/tooltip`, title: "Tooltip", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/dropdown`, title: "Dropdown", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/accordion`, title: "Accordion", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/tabs`, title: "Tabs", type: "link" },
          { path: `${process.env.PUBLIC_URL}/uikits/list`, title: "Lists", type: "link" },
        ],
      },

      {
        title: "Bonus-Ui",
        icon: "bonus-kit",
        id: 20,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/bonusui/scrollable`, title: "Scrollable", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/tree_view`, title: "Tree View", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/toasts`, title: "Toasts", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/rating`, title: "Rating", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/dropzone`, title: "Dropzone", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/tour`, title: "Tour ", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/sweet_alert2`, title: "SweetAlert2", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/owl_carousel`, title: "Owl Carousel", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/ribbons`, title: "Ribbons", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/pagination`, title: "Pagination", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/breadcrumb`, title: "Breadcrumb", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/range_slider`, title: "RangeSlider", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/image_cropper`, title: "ImageCropper", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/basic_cards`, title: "Basic Card", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/creative_cards`, title: "Creative Card", type: "link" },
          { path: `${process.env.PUBLIC_URL}/bonusui/timeline`, title: "Timeline", type: "link" },
        ],
      },

      {
        title: "Icons",
        icon: "icons",
        id: 21,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/icons/flag_icons`, title: "Flag Icon", type: "link" },
          { path: `${process.env.PUBLIC_URL}/icons/fontawesome_icon`, title: "Fontawesome Icon", type: "link" },
          { path: `${process.env.PUBLIC_URL}/icons/ico_icon`, title: "Ico Icon", type: "link" },
          { path: `${process.env.PUBLIC_URL}/icons/themify_icon`, title: "Themify Icon", type: "link" },
          { path: `${process.env.PUBLIC_URL}/icons/feather_icon`, title: "Feather Icon", type: "link" },
          { path: `${process.env.PUBLIC_URL}/icons/weather_icon`, title: "Weather Icon", type: "link" },
        ],
      },

      {
        title: "Buttons",
        icon: "button",
        id: 22,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/buttons/default_style`, title: "Default Style", type: "link" },
          { path: `${process.env.PUBLIC_URL}/buttons/flat_style`, title: "Flat Style", type: "link" },
          { path: `${process.env.PUBLIC_URL}/buttons/edge_style`, title: "Edge Style", type: "link" },
          { path: `${process.env.PUBLIC_URL}/buttons/raised_style`, title: "Raised Style", type: "link" },
          { path: `${process.env.PUBLIC_URL}/buttons/button_group`, title: "Button Group", type: "link" },
        ],
      },

      {
        title: "Charts",
        icon: "charts",
        type: "sub",
        id: 23,
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/charts/apex_chart`, type: "link", title: "Apex Chart" },
          { path: `${process.env.PUBLIC_URL}/charts/google_chart`, type: "link", title: "Google Chart" },
          { path: `${process.env.PUBLIC_URL}/charts/chartjs_chart`, type: "link", title: "Chartjs Chart" },
        ],
      },
    ],
  },
  {
    title: "Pages",
    Items: [
      {
        icon: "sample-page",
        id: 24,
        active: false,
        path: `${process.env.PUBLIC_URL}/pages/sample_page`,
        title: "Sample Page",
        type: "link",
      },
      {
        title: "Others",
        icon: "others",
        id: 25,
        type: "sub",
        children: [
          {
            title: "Error Pages",
            type: "sub",
            children: [
              { title: "Error 400", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_400` },
              { title: "Error 401", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_401` },
              { title: "Error 403", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_403` },
              { title: "Error 404", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_404` },
              { title: "Error 500", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_500` },
              { title: "Error 503", type: "link", path: `${process.env.PUBLIC_URL}/errors/error_503` },
            ],
          },
          {
            title: "Authentication",
            type: "sub",
            children: [
              { title: "Login Simple", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_simple` },
              { title: "Login with bg image", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_bg_image` },
              { title: "Login with image two", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_with_image_two` },
              { title: "Login with validation", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_validation` },
              { title: "Login with tooltip", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_tooltip` },
              { title: "Login with sweetalert", type: "link", path: `${process.env.PUBLIC_URL}/authentication/login_sweetalert` },
              { title: "Register Simple", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_simple` },
              { title: "Register with Bg Image", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_bg_image` },
              { title: "Register with Bg Two", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_with_image_two` },
              { title: "Register Wizard", type: "link", path: `${process.env.PUBLIC_URL}/authentication/register_wizard` },
              { title: "Unloack User", type: "link", path: `${process.env.PUBLIC_URL}/authentication/unlock_user` },
              { title: "Forget Password", type: "link", path: `${process.env.PUBLIC_URL}/authentication/forget_password` },
              { title: "Reset Password", type: "link", path: `${process.env.PUBLIC_URL}/authentication/reset_password` },
              { title: "Maintenance", type: "link", path: `${process.env.PUBLIC_URL}/authentication/maintenance` },
            ],
          },
          {
            title: "Coming Soon",
            type: "sub",
            children: [
              { title: "Coming Simple", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/coming_soon_simple` },
              { title: "Coming with Bg Video", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/coming_bg_video` },
              { title: "Coming with bg Image", type: "link", path: `${process.env.PUBLIC_URL}/comingsoon/coming_bg_img` },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Miscellaneous",
    Items: [
      {
        title: "Gallery",
        icon: "gallery",
        id: 26,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/gallery/gallery_grids`, title: "Gallery Grids", type: "link" },
          { path: `${process.env.PUBLIC_URL}/gallery/gallery_grid_desc`, title: "Gallery Grid Desc", type: "link" },
          { path: `${process.env.PUBLIC_URL}/gallery/masonry_gallery`, title: "Masonry Gallery", type: "link" },
          { path: `${process.env.PUBLIC_URL}/gallery/masonry_with_desc`, title: "Masonry With Desc", type: "link" },
          { path: `${process.env.PUBLIC_URL}/gallery/hover_effect`, title: "Hover Effect", type: "link" },
        ],
      },

      {
        title: "Blog",
        icon: "blog",
        id: 27,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/blog/blog_details`, title: "Blog Details", type: "link" },
          { path: `${process.env.PUBLIC_URL}/blog/blog_single`, title: "Blog Single", type: "link" },
          { path: `${process.env.PUBLIC_URL}/blog/add_post`, title: "Add Post", type: "link" },
        ],
      },
      { path: `${process.env.PUBLIC_URL}/fag/faq`, icon: "faq", type: "link", active: false, title: "FAQ" },
      {
        title: "JobSearch",
        icon: "job-search",
        id: 28,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/job_search/card_view`, title: "Cards View", type: "link" },
          { path: `${process.env.PUBLIC_URL}/job_search/list_view`, title: "List View", type: "link" },
          { path: `${process.env.PUBLIC_URL}/job_search/job_detail`, title: "Job Detail", type: "link" },
          { path: `${process.env.PUBLIC_URL}/job_search/apply`, title: "Apply", type: "link" },
        ],
      },
      {
        title: "Learning",
        icon: "learning",
        id: 29,
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/learning/learning_list`, title: "Learning List", type: "link" },
          { path: `${process.env.PUBLIC_URL}/learning/learning_course`, title: "Detailed Course", type: "link" },
        ],
      },
      {
        title: "Map",
        icon: "maps",
        type: "sub",
        id: 30,
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/map/google_map`, type: "link", title: "Google Map" },
          { path: `${process.env.PUBLIC_URL}/map/leaflet_map`, type: "link", title: "Leaflet Map" },
        ],
      },
      {
        title: "Editor",
        id: 31,
        icon: "editors",
        type: "sub",
        active: false,
        children: [
          { path: `${process.env.PUBLIC_URL}/editor/ck_editor`, type: "link", title: "CK Editor" },
          { path: `${process.env.PUBLIC_URL}/editor/mde_editor`, type: "link", title: "MDE Editor" },
          { path: `${process.env.PUBLIC_URL}/editor/ace_editor`, type: "link", title: "ACE Editor" },
        ],
      },

      { id: 32, path: `${process.env.PUBLIC_URL}/knowledgebase/knowledgebase`, icon: "knowledgebase", type: "link", active: false, title: "Knowledgebase" },
      { id: 33, path: `${process.env.PUBLIC_URL}/support_ticket/support_ticket`, icon: "support-tickets", type: "link", active: false, title: "SupportTicket" },
    ],
  },
];