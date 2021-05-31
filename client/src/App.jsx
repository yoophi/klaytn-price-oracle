import "./App.scss";

import React, { useCallback, useEffect, useRef } from "react";

import BlockNumber from "./components/BlockNumber";
import PriceOracle from './components/PriceOracle'

const App = ({ children }) => {
  const { klaytn } = window;

  const timer = useRef();
  const checkPlugin = useCallback(() => {
    if (klaytn) {
      return clearInterval(timer.current);
    }
    return false;
  }, [klaytn]);

  useEffect(() => {
    timer.current = setInterval(checkPlugin, 1000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [checkPlugin]);

  return (
    <div className="App">
      {klaytn ? (
        <>
          <BlockNumber />
          {children}
        </>
      ) : (
        <a
          href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?utm_source=chrome-ntp-icon"
          target="_blank"
          rel="noreferrer"
        >
          Kaikas 플러그인을 설치하고 새로고침하기
        </a>
      )}
      <PriceOracle />
    </div>
  );
};

export default App;
