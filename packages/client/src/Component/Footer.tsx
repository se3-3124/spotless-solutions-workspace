
import React from "react";
import { FiPhone } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer className="fixed bottom-0 w-screen font-sans">
      <div className="bg-[#EFA25D] text-white p-10">
        <div className="flex justify-between">
          <div className="flex items-center">
            <FiPhone size={35} className="mr-4"/>
            <div className="">
                <p className="text-xs">Call To Find Out More</p>
                <p className="text-lg font-bold">0917 129 2231</p>
            </div>
          </div>

          <div className="flex items-center">
            <GrLocation size={35} className="mr-4"/>
            <div>
                <p className="text-xs">We Are Located At</p>
                <p className="text-lg font-bold">Iloilo City, Philippines</p>
            </div>
          </div>

          <div className="flex">
            <a href="https://facebook.com/topdowncleaningilo" target="_blank" rel="noopener noreferrer" className="flex items-center cursor-pointer">
              <FaFacebookSquare size={35} className="mr-4"/>
              <div>
                  <p className="text-xs">Visit Our FB Page For More</p>
                  <p className="text-lg font-bold">facebook.com/</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div>
        <p className="flex justify-center text-sm bg-[#DCCCCC] py-4">
          Copyright Topdown CLeaning Services
        </p>
      </div>
    </footer>
  );
}

export default Footer;
