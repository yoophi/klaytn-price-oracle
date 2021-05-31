import { useCallback, useEffect, useState } from "react";
import caver from "../klaytn/caver";

export function useKaikas() {
  const [network, setNetwork] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  const setAccountInfo = useCallback(async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    const account = klaytn.selectedAddress;
    const balance = await caver.klay.getBalance(account);
    setAccount(account);
    setBalance(caver.utils.fromPeb(balance, "KLAY"));
  }, []);

  const loadAccountInfo = useCallback(async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setAccountInfo(klaytn);
        klaytn.on("accountsChanged", () => setAccountInfo(klaytn));
      } catch (error) {
        console.log("User denied account access");
      }
    } else {
      console.log(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }
  }, [setAccountInfo]);


  const setNetworkInfo = useCallback(() => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    setNetwork(klaytn.networkVersion);
    klaytn.on("networkChanged", () => setNetworkInfo(klaytn.networkVersion));
  }, []);

  useEffect(() => {
    loadAccountInfo();
    setNetworkInfo();
  }, [loadAccountInfo, setNetworkInfo]);

  return { account, balance, network };
}
