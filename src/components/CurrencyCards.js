import React, { useState, useEffect } from "react";
import PriceCard from "./PriceCards";

const CryptoPriceCards = () => {
  const [priceData, setPriceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        const data = await response.json();
        setPriceData(data.bpi);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-4xl font-bold mb-10 text-gray-800">Bitcoin Prices</h2>
      {priceData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {Object.entries(priceData).map(([currency, priceInfo]) => (
            <PriceCard currency={currency} priceInfo={priceInfo} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default CryptoPriceCards;
