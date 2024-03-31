import React, { useEffect, useState } from "react";
import {
  HiHome,
  HiInformationCircle,
  HiAdjustments,
  HiPhone,
  HiBookOpen,
  HiSearch,
} from "react-icons/hi";
import PopulationChart from "./PopulationChart";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(
          `https://datausa.io/api/data?drilldowns=Nation&measures=Population`
        );
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        console.log(postsData.data);
        setData(postsData.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForPosts();
  }, []);
  const navItems = [
    { id: 1, label: "Home", icon: HiHome },
    { id: 2, label: "About", icon: HiInformationCircle },
    { id: 3, label: "Services", icon: HiAdjustments },
    { id: 4, label: "Contact", icon: HiPhone },
    { id: 5, label: "Blog", icon: HiBookOpen },
  ];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item.label);
  };

  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <div className="md:w-64 bg-zinc-900 px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white font-bold text-3xl mr-10">Carbon Cell</h1>
          <button
            className="text-white hover:text-gray-400 focus:outline-none"
            onClick={toggleNavbar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className={`md:block ${isOpen ? "block" : "hidden"}`}>
          <div className="flex items-center mb-4">
            <div className="bg-gray-700 text-white rounded-full py-2 px-4 flex items-center">
              <HiSearch className="text-white mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none"
              />
            </div>
          </div>
          <ul className="ml-0 list-none">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center text-left py-2 px-4 rounded transition-colors duration-300 ${
                  activeItem === item.label ? "text-green-600" : "text-white"
                }`}
                onClick={() => handleItemClick(item)}
              >
                <item.icon className="mr-2" />
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <main className="flex-1 p-8">
        <div className=" items-center h-full">
          {activeItem && <h2 className="text-3xl font-bold">{activeItem}</h2>}
          {data && <PopulationChart populationData={data} />}
        </div>
      </main>
    </div>
  );
};

export default SideNavbar;
