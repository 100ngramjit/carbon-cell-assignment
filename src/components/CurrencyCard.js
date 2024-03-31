import React, { useState, useEffect } from "react";

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

  function convertUnicode(input) {
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-4xl font-bold mb-10 text-gray-800">Bitcoin Prices</h2>
      {priceData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
          {Object.entries(priceData).map(([currency, priceInfo]) => (
            <div
              key={currency}
              className="rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 shadow-xl"
            >
              <div className="bg-gradient-to-r from-blue-500 to-green-400 p-4 text-black rounded-t-2xl">
                <h2 className="text-2xl font-bold mb-2">{currency}</h2>
              </div>
              <div className="bg-gradient-to-r from-green-400 to-blue-500 to-blue-500 p-6 text-black">
                <p className="text-2xl font-semibold mb-4">
                  <span className="font-medium">{priceInfo.code}</span>:{" "}
                  {priceInfo.rate}{" "}
                  <span
                    dangerouslySetInnerHTML={{ __html: priceInfo.symbol }}
                  ></span>
                </p>
                <p className="text-gray-600 text-lg">{priceInfo.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default CryptoPriceCards;
