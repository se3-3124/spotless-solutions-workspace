import './AdminPageContentCommons.css';
import {Link} from 'react-router-dom';
import tdLogo from '../assets/td_logo.jpg';
// import { Avatar, Dropdown, Navbar } from 'flowbite-react';


export default function AdminPageContentCommons() {
    return (
      <nav className="bg-midnightblue fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={tdLogo} className="h-16" alt="Topdown Logo" />
                </Link>
                <div className ="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div className='block py-2 px-3'>
                      <li className="block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black">
                        <a href="#" role="button" className="relative flex">
                          <svg className="flex-1 h-12 fill-white" viewBox="0 -960 960 960">
                            <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/>
                            </svg>
                            <span className="absolute right-0 top-0 rounded-full bg-fruityorange w-5 h-5 top right p-0 m-0 text-midnightblue text-sm leading-tight text-center">
                              <b>0</b>
                            </span>
                        </a>
                      </li>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <svg className="h-14 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                          <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
                        </svg>
                    </div>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium bg-midnightblue rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-fruityorange md:p-0">Home</Link>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-fruityorange md:p-0">About Us</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-fruityorange md:p-0">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-fruityorange md:p-0">FAQs</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
