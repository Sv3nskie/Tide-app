import { useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import { truncateAddress } from "./utils";

export default function Home(){
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  const refreshState = ()=>{
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = ()=>{
    refreshState();
    deactivate();
    window.localStorage.removeItem("provider");
  };

  useEffect(()=>{
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {!active ? (
        <button className="wallet-button" onClick={onOpen}>
          <svg className="wallet-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="rgba(255,255,255,0)" d="M0 0h24v24H0z"/><path data-name="Label" d="M18.162 7.464H7.446a.8.8 0 0 0-.8.8.8.8 0 0 0 .8.8h10.716a.8.8 0 0 1 .8.8v6.976a.8.8 0 0 1-.8.8H6.375a1.341 1.341 0 0 1-1.34-1.336V7.196a1.341 1.341 0 0 1 1.34-1.34h12.322a.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8H6.375a2.95 2.95 0 0 0-2.947 2.94v9.108a2.95 2.95 0 0 0 2.947 2.946h11.787a2.414 2.414 0 0 0 2.411-2.411V9.875a2.414 2.414 0 0 0-2.411-2.411Zm-.8 5.893a1.072 1.072 0 0 0-1.072-1.072 1.072 1.072 0 0 0-1.072 1.072 1.072 1.072 0 0 0 1.068 1.067 1.072 1.072 0 0 0 1.072-1.067Z" fill="#8b8ead"/></svg>
          Connect
        </button>
      ) : (
        <button className="wallet-button" onClick={disconnect}>
          <svg className="wallet-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="rgba(255,255,255,0)" d="M0 0h24v24H0z"/><path data-name="Label" d="M18.162 7.464H7.446a.8.8 0 0 0-.8.8.8.8 0 0 0 .8.8h10.716a.8.8 0 0 1 .8.8v6.976a.8.8 0 0 1-.8.8H6.375a1.341 1.341 0 0 1-1.34-1.336V7.196a1.341 1.341 0 0 1 1.34-1.34h12.322a.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8H6.375a2.95 2.95 0 0 0-2.947 2.94v9.108a2.95 2.95 0 0 0 2.947 2.946h11.787a2.414 2.414 0 0 0 2.411-2.411V9.875a2.414 2.414 0 0 0-2.411-2.411Zm-.8 5.893a1.072 1.072 0 0 0-1.072-1.072 1.072 1.072 0 0 0-1.072 1.072 1.072 1.072 0 0 0 1.068 1.067 1.072 1.072 0 0 0 1.072-1.067Z" fill="#8b8ead"/></svg>
          Disconnect
        </button>
      )}
      <p className="hide-mobile">
        Account: {active ? (
          <span>{`${truncateAddress(account)}`}</span>
        ) : (
          <span>{'Not connected'}</span>
        )}
      </p>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
};