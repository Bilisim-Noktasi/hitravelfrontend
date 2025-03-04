import { MdCurrencyPound, MdDashboard, MdHotel, MdTour } from "react-icons/md";

const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: <MdDashboard size={24} />,
          label: "Dashboard",
          route: "/calendar",
        },
        {
          icon: <MdTour size={24} />,
          label: "Tour",
          route: "#",
          children: [
            { label: "Create Tour", route: "/admin/create-tour" },
            { label: "Tour List", route: "/admin" },
          ],
        },

        {
          icon: <MdHotel size={24} />,
          label: "Hotel",
          route: "#",
          children: [
            { label: "Tour", route: "/admin/create-tour" },
            { label: "Hotel", route: "/" },
          ],
        },
        {
          icon: <MdCurrencyPound size={24} />,
          label: "Kurlar",
          route: "/admin/kurlar",
        },
      ],
    },
  
  ];

export default menuGroups;