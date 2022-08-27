import { Modal } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";

export default function SelectWalletModal({ isOpen, closeModal }) {
    const { activate } = useWeb3React();

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
            <div className="wallet-choose">
                <div className="wallet-box-header">
                    <span>Connect Wallet</span>
                    <button className="close-wallet-box" onClick={()=>{closeModal()}}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" fontSize="20" class="Modal-close-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </button>
                </div>
                <div className="devider"></div>
                <div className="wallet-box-menu">
                    <button className="wallet-box-item" onClick={() => { activate(connectors.coinbaseWallet); setProvider("coinbaseWallet"); closeModal();}} >
                        <img src="./img/cb.png" alt="Coinbase Wallet Logo" width={25} height={25} />
                        <p>Coinbase Wallet</p>
                    </button>

                    <button className="wallet-box-item" onClick={() => { activate(connectors.walletConnect); setProvider("walletConnect"); closeModal(); }} >
                        <img src="./img/wc.svg" alt="Wallet Connect Logo" width={26} height={26} />
                        <p>Wallet Connect</p>
                    </button>

                    <button className="wallet-box-item" onClick={() => { activate(connectors.injected); setProvider("injected"); closeModal(); }} >
                        <img src="./img/mm.png" alt="Metamask Logo" width={25} height={25} />
                        <p>Metamask</p>
                    </button>
                </div>
            </div>
        </Modal>
    );
}