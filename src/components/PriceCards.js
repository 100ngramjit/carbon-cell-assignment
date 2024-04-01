const PriceCard = ({ currency, priceInfo }) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray- shadow-xl font-sans rounded-lg p-4 m-2 shadow-[rgba(52,134,134,1)] transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-110 duration-300">
      <div className="text-xl font-semibold">{currency}</div>

      <div className="text-2xl">
        {priceInfo.rate}{" "}
        <span
          className="text-2xl"
          dangerouslySetInnerHTML={{ __html: priceInfo.symbol }}
        ></span>
      </div>
      <div className="text-lg text-gray-600">{priceInfo.description}</div>
    </div>
  );
};
export default PriceCard;
