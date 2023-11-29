import './home-page.css';
import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-midnightblue fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="../../assets/td_logo.jpg" className="h-16" alt="Topdown Logo" />
                </Link>
                <div className ="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link to="/LogIn" className='block py-2 px-3 text-white'>Log In</Link>
                    <Link to="/SignUp" type="button" className="text-midnightblue bg-fruityorange hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-fruityorange dark:hover:bg-white dark:focus:ring-blue-800">Sign Up</Link>
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium bg-midnightblue rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <Link to="/" className="block py-2 px-3 text-white bg-fruityorange rounded md:bg-transparent md:text-fruityorange md:p-0 md:dark:text-fruityorange" aria-current="page">Home</Link>
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
    )
}