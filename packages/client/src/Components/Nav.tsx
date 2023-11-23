import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GoHome } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { MdCleaningServices } from "react-icons/md";
import { BsQuestionSquare } from "react-icons/bs";

const menuItems = [
  { title: "Home", link: "/Home" },
  { title: "About Us", link: "/AboutUs" },
  { title: "Services", link: "/Services" },
  { title: "FAQs", link: "/Faqs" },
];

const Nav = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
      <nav className="shadow-md py-8 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-lg">Logo</div>

          <ul className="hidden md:flex space-x-16">
            {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                      href={item.link}
                      className="hover:text-orange-500 hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
            ))}
          </ul>

          <button className="hidden md:flex bg-gray-900 text-[#EFA25D] px-4 py-1 rounded hover:bg-white hover:text-[#f68f34] transition duration-300 ease-in-out">
            Sign In
          </button>

          <div onClick={handleToggle} className="md:hidden flex">
            {!navbarOpen ? (
                <AiOutlineClose size={25} />
            ) : (
                <AiOutlineMenu size={25} />
            )}
            <div
                className={
                  !navbarOpen
                      ? "fixed left-0 top-0 w-[85%] h-full ease-in-out duration-500 bg-white"
                      : "fixed left-[-100%]"
                }
            >
              <nav className="shadow-md py-8 px-2">
                <div className="container mx-auto flex justify-between items-center ml-9">
                  <div className="font-bold text-lg">Logo</div>
                </div>
              </nav>

              <ul className="px-2 border-b border-l border-r-2 uppercase">
                <li className="p-4 border-b border-gray-300 flex items-center">
                  <GoHome size={20}/>
                  <a href="/Home" className="ml-4">
                    Home
                  </a>
                </li>
                <li className="p-4 border-b border-gray-300 flex items-center">
                  <MdGroups size={20}/>
                  <a href="/About" className="ml-4">                  About
                  </a>
                </li>
                <li className="p-4 border-b border-gray-300 flex items-center">
                  <MdCleaningServices size={20}/>
                  <a href="/Services" className="ml-4">                  Services
                  </a>
                </li>
                <li className="p-4 flex items-center">
                  <BsQuestionSquare size={20}/>
                  <a href="/Faqs" className=" ml-4">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Nav;