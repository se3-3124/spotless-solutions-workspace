import { useState } from "react";
import { FaRegCalendarMinus } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";

const SidePanel = () => {
  const [open, setOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("Schedules");

  const Menus = [
    {
      title: "Schedules",
      link: "/",
      icon: <FaRegCalendarMinus size={22} color="#7ac4ff" />,
    },
    {
      title: "History",
      link: "/History",
      icon: <FaHistory size={22} color="#7ac4ff" />,
    },
    {
      title: "Analytics",
      link: "/Analytics",
      icon: <IoMdAnalytics size={22} color="#7ac4ff" />,
    },
    {
      title: "Management ",
      link: "/Management",
      icon: <MdManageAccounts size={24} color="#7ac4ff" />,
    },
  ];

  const handleMenuClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-[#05132F] h-screen p-5  pt-8 relative duration-300 border-r-2 border-[#EDA15B]`}
      >
        <img
          src="./packages/client/public/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./packages/client/public/topdown_logo.png"
            className={`cursor-pointer duration-500 h-10 ${open}`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Topdown
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 mt-4 cursor-pointer hover:bg-slate-700 text-gray-300 text-sm items-center gap-x-4
              ${activeLink === Menu.title && "bg-slate-700"}`}
              onClick={() => handleMenuClick(Menu.title)}
            >
              {Menu.icon}
              <a
                href={Menu.link}
                className={`${!open && "hidden"} origin-left duration-200`}
              >
                {Menu.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SidePanel;
