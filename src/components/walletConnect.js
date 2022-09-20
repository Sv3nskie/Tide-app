import { useEffect, useState, useCallback, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import SelectWalletModal from "./Modal";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import { truncateAddress } from "./utils";

export default function Wallet({slippageMenu, activeState, isOpenModal, setOpenModal}){
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuOpen, setMenu] = useState(false);
  const walletMenu = useRef(null);
  const copy = useRef(null);
  const bscscan = useRef(null);
  const slippageMenuButton = useRef(null);
  const disconnectWallet = useRef(null);

  const {
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  useEffect(()=>{
    if(active){
      activeState(true)
      setOpenModal(false)
    } else {
      activeState(false)
    }
  },[active, activeState, setOpenModal]);

  useEffect(()=>{
    if(isOpenModal){
      onOpen()
    }
  },[isOpenModal, onOpen]);


  const refreshState = useCallback(()=>{
    window.localStorage.setItem("provider", undefined);
  }, []);

  const disconnect = useCallback(()=>{
    refreshState();
    deactivate();
    window.localStorage.removeItem("provider");
  }, [refreshState, deactivate]);

  const handleMenu = useCallback( event => {
    if(walletMenu.current && walletMenu.current.contains(event.target)){
      setMenu(menuOpen ? false : true);
    } else if(copy.current && copy.current.contains(event.target)){
      navigator.clipboard.writeText(account);
      setMenu(false);
    } else if(bscscan.current && bscscan.current.contains(event.target)){
      window.open(`https://bscscan.com/address/${account}`, "_blank");
      setMenu(false);
    } else if(slippageMenuButton.current && slippageMenuButton.current.contains(event.target)){
      slippageMenu(true);
      setMenu(false);
    } else if(disconnectWallet.current && disconnectWallet.current.contains(event.target)){
      disconnect();
      setMenu(false);
    } else if(walletMenu.current && !walletMenu.current.contains(event.target)){
      setMenu(false);
    };
    
  }, [menuOpen, disconnect, setMenu, account, slippageMenu]);

  useEffect(()=>{
    const provider = window.localStorage.getItem("provider");
    if(provider) {
      activate(connectors[provider])
    };
    // eslint-disable-next-line
  },[]);


  useEffect(()=>{
    document.addEventListener("mousedown", handleMenu);

    return ()=>{
      document.removeEventListener("mousedown", handleMenu);
    };
  },[handleMenu]);

  return (
    <>
      {!active ? (
        <button className="wallet-button" onClick={onOpen}>
          <svg className="wallet-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="rgba(255,255,255,0)" d="M0 0h24v24H0z"/><path data-name="Label" d="M18.162 7.464H7.446a.8.8 0 0 0-.8.8.8.8 0 0 0 .8.8h10.716a.8.8 0 0 1 .8.8v6.976a.8.8 0 0 1-.8.8H6.375a1.341 1.341 0 0 1-1.34-1.336V7.196a1.341 1.341 0 0 1 1.34-1.34h12.322a.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8H6.375a2.95 2.95 0 0 0-2.947 2.94v9.108a2.95 2.95 0 0 0 2.947 2.946h11.787a2.414 2.414 0 0 0 2.411-2.411V9.875a2.414 2.414 0 0 0-2.411-2.411Zm-.8 5.893a1.072 1.072 0 0 0-1.072-1.072 1.072 1.072 0 0 0-1.072 1.072 1.072 1.072 0 0 0 1.068 1.067 1.072 1.072 0 0 0 1.072-1.067Z" fill="#8b8ead"/></svg>
          Connect
        </button>
      ) : (

        <>
          <button ref={walletMenu} className="wallet-button">
            <svg className="wallet-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="rgba(255,255,255,0)" d="M0 0h24v24H0z"/><path data-name="Label" d="M18.162 7.464H7.446a.8.8 0 0 0-.8.8.8.8 0 0 0 .8.8h10.716a.8.8 0 0 1 .8.8v6.976a.8.8 0 0 1-.8.8H6.375a1.341 1.341 0 0 1-1.34-1.336V7.196a1.341 1.341 0 0 1 1.34-1.34h12.322a.8.8 0 0 0 .8-.8.8.8 0 0 0-.8-.8H6.375a2.95 2.95 0 0 0-2.947 2.94v9.108a2.95 2.95 0 0 0 2.947 2.946h11.787a2.414 2.414 0 0 0 2.411-2.411V9.875a2.414 2.414 0 0 0-2.411-2.411Zm-.8 5.893a1.072 1.072 0 0 0-1.072-1.072 1.072 1.072 0 0 0-1.072 1.072 1.072 1.072 0 0 0 1.068 1.067 1.072 1.072 0 0 0 1.072-1.067Z" fill="#8b8ead"/></svg>
            <span>{`${truncateAddress(account)}`}</span>
          </button>
          {menuOpen &&
            <div className="wallet-menu-dropdown">
              <button ref={copy} className="wallet-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <g id="ic_copy_16" transform="translate(-493.25 -330.75)">
                    <rect id="Rectangle_484" data-name="Rectangle 484" width="16" height="16" transform="translate(493.25 330.75)" fill="rgba(255,255,255,0)"/>
                    <g id="Group_329" data-name="Group 329" transform="translate(0 -0.5)">
                      <path id="Path_4411" data-name="Path 4411" d="M506.656,346.75h-6.312a2.1,2.1,0,0,1-2.094-2.094v-6.312a2.1,2.1,0,0,1,2.094-2.094h6.312a2.1,2.1,0,0,1,2.094,2.094v6.312A2.1,2.1,0,0,1,506.656,346.75Zm-6.312-9a.6.6,0,0,0-.594.594v6.312a.6.6,0,0,0,.594.594h6.312a.6.6,0,0,0,.594-.594v-6.312a.6.6,0,0,0-.594-.594Z" fill="#a0a3c4"/>
                      <path id="Path_4412" data-name="Path 4412" d="M496.344,342.75a2.1,2.1,0,0,1-2.094-2.094v-6.312a2.1,2.1,0,0,1,2.094-2.094h6.312a2.1,2.1,0,0,1,2.094,2.094.75.75,0,0,1-1.5,0,.6.6,0,0,0-.594-.594h-6.312a.6.6,0,0,0-.594.594v6.312a.6.6,0,0,0,.594.594.75.75,0,0,1,0,1.5Z" fill="#a0a3c4"/>
                    </g>
                  </g>
                </svg>
                <span>Copy Address</span>
              </button>
              <button ref={bscscan} className="wallet-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <g id="ic_new_link_16" transform="translate(-494.25 -348.25)">
                    <rect id="Rectangle_485" data-name="Rectangle 485" width="16" height="16" transform="translate(494.25 348.25)" fill="rgba(255,255,255,0)"/>
                    <g id="Group_331" data-name="Group 331" transform="translate(0 1)">
                      <path id="Path_4413" data-name="Path 4413" d="M504.656,361.75h-7.312a2.1,2.1,0,0,1-2.094-2.094v-7.312a2.1,2.1,0,0,1,2.094-2.094H501a.75.75,0,0,1,0,1.5h-3.656a.6.6,0,0,0-.594.594v7.312a.6.6,0,0,0,.594.594h7.312a.6.6,0,0,0,.594-.594V356a.75.75,0,0,1,1.5,0v3.656A2.1,2.1,0,0,1,504.656,361.75Z" fill="#a0a3c4"/>
                      <path id="Path_4414" data-name="Path 4414" d="M508,353.75a.75.75,0,0,1-.75-.75v-3.25H504a.75.75,0,0,1,0-1.5h4a.75.75,0,0,1,.75.75v4A.75.75,0,0,1,508,353.75Z" fill="#a0a3c4"/>
                      <path id="Path_4415" data-name="Path 4415" d="M500,357.75a.75.75,0,0,1-.53-1.28l8-8a.75.75,0,0,1,1.06,1.06l-8,8A.744.744,0,0,1,500,357.75Z" fill="#a0a3c4"/>
                    </g>
                  </g>
                </svg>
                <span>View in Explorer</span>
              </button>
              <button ref={slippageMenuButton} className="wallet-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <g id="ic_settings_16" transform="translate(-494.25 -372.25)">
                    <rect id="Rectangle_486" data-name="Rectangle 486" width="16" height="16" transform="translate(494.25 372.25)" fill="rgba(255,255,255,0)"/>
                    <path id="Path_4419" data-name="Path 4419" d="M6.788-3.61a.68.68,0,0,0-.338-.585l-.9-.519q.026-.267.026-.536t-.026-.536l.9-.519a.68.68,0,0,0,.338-.585c0-.582-1.349-3.5-2.311-3.5a.666.666,0,0,0-.338.092l-.9.519a5.333,5.333,0,0,0-.932-.54v-1.037a.673.673,0,0,0-.5-.653A7.016,7.016,0,0,0,0-12.25a7.046,7.046,0,0,0-1.808.236.673.673,0,0,0-.5.653v1.037a5.333,5.333,0,0,0-.932.54l-.9-.519a.666.666,0,0,0-.338-.092h0c-.888,0-2.311,2.782-2.311,3.5a.68.68,0,0,0,.338.585l.9.519q-.026.267-.026.536t.026.536l-.9.519a.68.68,0,0,0-.338.585c0,.582,1.349,3.5,2.311,3.5A.666.666,0,0,0-4.132-.2l.9-.519a5.333,5.333,0,0,0,.932.54V.862a.673.673,0,0,0,.5.653A7.017,7.017,0,0,0,0,1.75,7.046,7.046,0,0,0,1.81,1.514a.673.673,0,0,0,.5-.653V-.176a5.333,5.333,0,0,0,.932-.54l.9.519a.666.666,0,0,0,.338.092C5.365-.105,6.788-2.887,6.788-3.61ZM4.358-1.587,3.164-2.278A7.4,7.4,0,0,1,1-1.023V.351A5.746,5.746,0,0,1,0,.438,5.714,5.714,0,0,1-.992.351V-1.023A7.393,7.393,0,0,1-3.157-2.278l-1.193.691a5.671,5.671,0,0,1-1-1.726L-4.154-4c-.069-.7-.1-.975-.1-1.249s.035-.549.1-1.251l-1.192-.687a5.663,5.663,0,0,1,1-1.726l1.194.691A7.4,7.4,0,0,1-.992-9.477v-1.374a5.747,5.747,0,0,1,1-.087A5.714,5.714,0,0,1,1-10.851v1.374A7.393,7.393,0,0,1,3.164-8.222l1.193-.691a5.672,5.672,0,0,1,1,1.726L4.161-6.5c.069.7.1.975.1,1.249S4.231-4.7,4.161-4l1.192.687A5.663,5.663,0,0,1,4.358-1.587ZM0-7.875A2.63,2.63,0,0,0-2.621-5.25,2.63,2.63,0,0,0,0-2.625,2.63,2.63,0,0,0,2.629-5.25,2.63,2.63,0,0,0,0-7.875ZM0-3.937A1.314,1.314,0,0,1-1.309-5.25,1.314,1.314,0,0,1,0-6.562,1.314,1.314,0,0,1,1.316-5.25,1.314,1.314,0,0,1,0-3.937Z" transform="translate(502.25 385.25)" fill="#a0a3c4"/>
                  </g>
                </svg>
                <span>Settings</span>
              </button>
              <button ref={disconnectWallet} className="wallet-menu-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><g data-name="ic_sign out_16"><path data-name="Rectangle 486" fill="rgba(255,255,255,0)" d="M0 0h16v16H0z"/><g data-name="Group 334" fill="#a0a3c4"><path data-name="Path 4416" d="M13.016 14.5H7.484A1.486 1.486 0 0 1 6 13.016V10.75a.75.75 0 0 1 1.5 0v2.266L13.016 13 13 2.484 7.484 2.5 7.5 4.75a.75.75 0 0 1-1.5 0V2.484A1.486 1.486 0 0 1 7.484 1h5.532A1.486 1.486 0 0 1 14.5 2.484v10.532a1.486 1.486 0 0 1-1.484 1.484Z"/><path data-name="Union 15" d="M4.281 10.279a.75.75 0 0 0 0-1.061l-.72-.721h7.193a.75.75 0 0 0 0-1.5H3.561l.721-.721a.75.75 0 0 0-1.061-1.057l-2 2a.754.754 0 0 0 0 1.061l2 2a.743.743 0 0 0 .531.217.729.729 0 0 0 .529-.218Z" stroke="rgba(0,0,0,0)"/></g></g></svg>
                <span>Disconnect</span>
              </button>
            </div>
          }
          
        </>
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} setOpenModal={setOpenModal}/>
    </>
  );
};