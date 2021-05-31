import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import caver from "../klaytn/caver";

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const PriceOracle = () => {
  const { DEPLOYED_ABI, DEPLOYED_ADDRESS } = useMemo(() => {
    return {
      DEPLOYED_ABI: process.env.DEPLOYED_ABI,
      DEPLOYED_ADDRESS: process.env.DEPLOYED_ADDRESS,
    };
  }, []);
  const priceOracleContract = useMemo(() => {
    if (DEPLOYED_ABI && DEPLOYED_ADDRESS) {
      return new caver.klay.Contract(
        JSON.parse(DEPLOYED_ABI),
        DEPLOYED_ADDRESS
      );
    }
  }, [DEPLOYED_ABI, DEPLOYED_ADDRESS]);

  const [prices, setPrices] = useState([]);

  const intervalId = useRef(null);

  const getPrices = useCallback(async () => {
    const symbols = ["ETH", "KLAY", "BTC"];
    const prices = await Promise.all(
      symbols.map(async (symbol) => {
        const price = await priceOracleContract.methods.prices(symbol).call();
        return { symbol, price };
      })
    );
    setPrices([...prices]);
  }, [priceOracleContract.methods]);

  useEffect(() => {
    intervalId.current = setInterval(getPrices, 1000);

    return () => clearInterval(intervalId.current);
  }, [getPrices]);

  return (
    <div>
      {prices.map((el) => (
        <>
          <h1>{el.symbol}</h1>
          <p>
            <strong>PRICE:</strong> {formatNumber(el.price)}
          </p>
        </>
      ))}
    </div>
  );
};

export default PriceOracle;
