import React from 'react';
// import { NavLink } from 'react-router-dom';
import WalletConnect from '../../components/walletConnect';
import { StrictMode } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
};

class Header extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            network: false,
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.menuButton = React.createRef();
    };

    componentDidMount(){
        document.addEventListener("mousedown", this.handleClickOutside);
    };

    componentWillUnmount(){
        document.removeEventListener("mousedown", this.handleClickOutside);
    };

    handleClickOutside(e){
        if(this.menuButton.current.contains(e.target)){
            this.setState({
                network: this.state.network ? false : true,
            });
        } else {
            this.setState({
                network: false,
            });
        };
    };

    render(){
        return(
            <div className="header">
                <div className="menu">
                    <div className="logo">
                        <img height="25px" alt="Tide" src="./img/logo.svg"></img>
                    </div>
                </div>
                <div className="wallet">
                    <button ref={this.menuButton} className="network-button">
                        <svg className="bsc-logo" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 604 698" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M302.121 0.490234L116.898 107.311L184.995 146.774L302.121 79.4152L419.245 146.774L487.342 107.311L302.121 0.490234ZM419.245 202.566L487.342 242.028V320.953L370.215 388.311V523.029L302.121 562.492L234.024 523.029V388.311L116.898 320.953V242.028L184.995 202.566L302.121 269.923L419.245 202.566ZM487.342 376.745V455.67L419.245 495.134V416.206L487.342 376.745ZM418.564 550.923L535.692 483.565V348.848L603.786 309.387V523.029L418.564 629.848V550.923ZM535.692 214.132L467.594 174.67L535.692 135.207L603.786 174.67V253.595L535.692 293.058V214.132ZM234.024 658.426V579.501L302.121 618.962L370.215 579.501V658.426L302.121 697.887L234.024 658.426ZM184.995 495.134L116.898 455.67V376.745L184.995 416.206V495.134ZM302.121 214.132L234.024 174.67L302.121 135.207L370.215 174.67L302.121 214.132ZM136.646 174.67L68.5493 214.132V293.058L0.453125 253.595V174.67L68.5493 135.207L136.646 174.67ZM0.453125 309.387L68.5493 348.848V483.565L185.675 550.923V629.848L0.453125 523.029V309.387Z" fill="#F0B90B"/>
                        </svg>
                        <span className="network-text">BNB Chain</span>
                        <svg className="menu-arrow" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="m0 0h24v24h-24z" fill="none"/><path d="m3.575 15.811-3.4-3.689a.693.693 0 0 1 0-.922l.574-.6a.558.558 0 0 1 .426-.19.555.555 0 0 1 .425.19l2.4 2.6 2.4-2.6a.571.571 0 0 1 .851 0l.574.6a.693.693 0 0 1 0 .922l-3.4 3.689a.573.573 0 0 1 -.851 0zm2.85-10.411-2.425-2.607-2.4 2.607a.554.554 0 0 1 -.425.189.557.557 0 0 1 -.425-.189l-.574-.6a.692.692 0 0 1 0-.922l3.399-3.688a.571.571 0 0 1 .851 0l3.4 3.689a.693.693 0 0 1 0 .922l-.574.6a.556.556 0 0 1 -.425.189.484.484 0 0 1 -.402-.19z" fill="#fff" transform="translate(8 4)"/></svg>
                    </button>
                    <div style={this.state.network ? {display: 'block'} : {display: 'none'}} className="network-select">
                        <button className="network-button">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 46 46" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5655 0C10.1031 0 0 10.1031 0 22.5655C0 35.0279 10.1031 45.131 22.5655 45.131C35.0279 45.131 45.131 35.0279 45.131 22.5655C45.131 10.1031 35.0279 0 22.5655 0ZM20.6454 28.9553L20.6308 28.9821C20.1306 29.858 19.8769 30.3021 19.5255 30.6363C19.1425 31.0023 18.6838 31.2682 18.1788 31.417C17.7177 31.5439 17.2029 31.5439 16.1709 31.5439H11.7915C10.8717 31.5439 10.4154 31.5439 10.1397 31.3658C9.83963 31.1706 9.65664 30.851 9.63469 30.4948C9.61761 30.1679 9.84451 29.7677 10.3007 28.9699L21.1138 9.91282C21.575 9.10281 21.8067 8.69781 22.0995 8.54898C22.4142 8.38796 22.7924 8.38796 23.1096 8.54898C23.4024 8.69781 23.6366 9.10281 24.0953 9.91282L26.3179 13.7921L26.3301 13.8116C26.8278 14.6801 27.0791 15.1193 27.1889 15.5829C27.3109 16.0879 27.3109 16.6198 27.1889 17.1248C27.0791 17.5908 26.8278 18.0348 26.3228 18.9156L20.643 28.9553H20.6454ZM35.1743 31.3609C34.8962 31.5439 34.4326 31.5439 33.5055 31.5439H27.2304C26.3057 31.5439 25.8397 31.5439 25.5664 31.3658C25.2663 31.1706 25.0834 30.8437 25.0614 30.4899C25.0443 30.1654 25.2737 29.7702 25.7323 28.9772L25.7421 28.9577L28.8748 23.5805C29.3359 22.7875 29.5677 22.3947 29.8556 22.2435C30.1727 22.0824 30.5436 22.0824 30.8583 22.2435C31.1438 22.3898 31.3682 22.7656 31.8098 23.5146L31.8464 23.5756L34.9889 28.9529C35.0035 28.9797 35.0206 29.0041 35.0352 29.0309C35.4719 29.7824 35.694 30.1654 35.6769 30.4826C35.6598 30.8364 35.4719 31.1633 35.1718 31.3585L35.1743 31.3609Z" fill="black"/>
                            </svg> */}
                            <span className="network-text">Avax</span>
                        </button>
                        <button className="network-button">
                            <span className="network-text">Arbitrum</span>
                        </button>
                        <button className="network-button">
                            <span className="network-text">Optimism</span>
                        </button>
                        <button className="network-button">
                            <span className="network-text">Metis</span>
                        </button>
                        <button className="network-button">
                            <span className="network-text">Matic</span>
                        </button>
                        <button className="network-button">
                            <span className="network-text">ZkSync</span>
                        </button>
                    </div>
                    <StrictMode>
                        <Web3ReactProvider getLibrary={getLibrary}>
                            <WalletConnect/>
                        </Web3ReactProvider>
                    </StrictMode>
                </div>
            </div>
        )
    }
}

export default Header;