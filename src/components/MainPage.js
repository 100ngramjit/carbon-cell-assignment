import React, { useEffect, useState } from "react";
import PopulationChart from "./PopulationChart";
import SideNavbar from "./SideNavBar";
import CryptoPriceCards from "./CurrencyCard";
import WalletConnector from "./WalletConnector";

const MainPage = () => {
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
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <SideNavbar />
      <main className="flex-1 p-2">
        <div className=" items-center h-full">
          {loading ? <p>Loading</p> : <PopulationChart populationData={data} />}
          <WalletConnector />
          <CryptoPriceCards />
        </div>
      </main>
    </div>
  );
};

export default MainPage;
