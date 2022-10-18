import React from 'react';
import WalletConnect from '../../components/walletConnect';
import { StrictMode } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";

const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
};

class Header extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            network: false,
            mobileClick: false,
            Ramp:false
        };
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.menuButton = React.createRef();
        this.handleMobileMenu = this.handleMobileMenu.bind(this);
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

    handleMobileMenu(){
        this.setState({
            mobileClick: this.state.mobileClick ? false : true,
        });
    };

    render(){
        return(
            <>
                <div className="menu-box hide-desktop" style={ this.state.mobileClick ? {left: '0'} : {left: '-100%'}}>
                    <div className="mobile-menu-head">
                        <button onClick={()=>this.handleMobileMenu()} className="mobile-menu-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 48 48">
                                <path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill="#3abab4" />
                                <path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill="#3abab4" />
                                <path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill="#3abab4" />
                            </svg>
                        </button>
                        <div className="logo">
                            <img height="25px" alt="Tide" src="./img/logo.svg"></img>
                        </div>
                    </div>
                    <div className="mobile-menu-items">
                        <div className="main-menu-item">Home</div>
                        <div className="main-menu-item">Contact</div>
                        <button className="ramp-button tooltip mobile">
                            <svg height={20} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}}>
                                <g><path d="M500.364,256c-6.982,0-11.636,4.655-11.636,11.636v139.636c0,5.818-2.327,11.636-6.982,16.291s-10.473,6.982-16.291,6.982    H46.545c-12.8,0-23.273-10.473-23.273-23.273V162.909h430.545c6.982,0,11.636-4.655,11.636-11.636    c0-6.982-4.655-11.636-11.636-11.636H11.636C4.655,139.636,0,144.291,0,151.273v256c0,25.6,20.945,46.545,46.545,46.545h418.909    c12.8,0,24.436-4.655,32.582-13.964c9.309-9.309,13.964-20.945,13.964-32.582V267.636C512,260.655,507.345,256,500.364,256z"/></g>
                                <g><path d="M139.636,360.727H58.182c-6.982,0-11.636,4.655-11.636,11.636S51.2,384,58.182,384h81.455    c6.982,0,11.636-4.655,11.636-11.636S146.618,360.727,139.636,360.727z" /></g>
                                <g><path d="M232.727,360.727h-46.545c-6.982,0-11.636,4.655-11.636,11.636S179.2,384,186.182,384h46.545    c6.982,0,11.636-4.655,11.636-11.636S239.709,360.727,232.727,360.727z" /></g>
                                <g><path d="M453.818,360.727h-46.545c-6.982,0-11.636,4.655-11.636,11.636S400.291,384,407.273,384h46.545    c6.982,0,11.636-4.655,11.636-11.636S460.8,360.727,453.818,360.727z" /></g>
                                <g><path d="M465.455,58.182H46.545C20.945,58.182,0,79.127,0,104.727c0,6.982,4.655,11.636,11.636,11.636s11.636-4.655,11.636-11.636    c0-12.8,10.473-23.273,23.273-23.273h418.909c12.8,0,23.273,10.473,23.273,23.273v104.727H58.182    c-6.982,0-11.636,4.655-11.636,11.636c0,6.982,4.655,11.636,11.636,11.636h442.182c6.982,0,11.636-4.655,11.636-11.636V104.727    C512,79.127,491.055,58.182,465.455,58.182z" /></g>
                            </svg>
                            On-Off Ramp
                            <span class="tooltiptext">No KYC</span>
                        </button>
                    </div>
                </div>
                
                
                <div className="header">
                    <div className="menu hide-mobile">
                        <div className="logo">
                            <img height="25px" alt="Tide" src="./img/logo.svg"></img>
                        </div>
                        <div className="main-menu-item">Home</div>
                        <div className="main-menu-item">Contact</div>
                        <button className="ramp-button tooltip">
                            <svg height={20} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}}>
                                <g><path d="M500.364,256c-6.982,0-11.636,4.655-11.636,11.636v139.636c0,5.818-2.327,11.636-6.982,16.291s-10.473,6.982-16.291,6.982    H46.545c-12.8,0-23.273-10.473-23.273-23.273V162.909h430.545c6.982,0,11.636-4.655,11.636-11.636    c0-6.982-4.655-11.636-11.636-11.636H11.636C4.655,139.636,0,144.291,0,151.273v256c0,25.6,20.945,46.545,46.545,46.545h418.909    c12.8,0,24.436-4.655,32.582-13.964c9.309-9.309,13.964-20.945,13.964-32.582V267.636C512,260.655,507.345,256,500.364,256z"/></g>
                                <g><path d="M139.636,360.727H58.182c-6.982,0-11.636,4.655-11.636,11.636S51.2,384,58.182,384h81.455    c6.982,0,11.636-4.655,11.636-11.636S146.618,360.727,139.636,360.727z" /></g>
                                <g><path d="M232.727,360.727h-46.545c-6.982,0-11.636,4.655-11.636,11.636S179.2,384,186.182,384h46.545    c6.982,0,11.636-4.655,11.636-11.636S239.709,360.727,232.727,360.727z" /></g>
                                <g><path d="M453.818,360.727h-46.545c-6.982,0-11.636,4.655-11.636,11.636S400.291,384,407.273,384h46.545    c6.982,0,11.636-4.655,11.636-11.636S460.8,360.727,453.818,360.727z" /></g>
                                <g><path d="M465.455,58.182H46.545C20.945,58.182,0,79.127,0,104.727c0,6.982,4.655,11.636,11.636,11.636s11.636-4.655,11.636-11.636    c0-12.8,10.473-23.273,23.273-23.273h418.909c12.8,0,23.273,10.473,23.273,23.273v104.727H58.182    c-6.982,0-11.636,4.655-11.636,11.636c0,6.982,4.655,11.636,11.636,11.636h442.182c6.982,0,11.636-4.655,11.636-11.636V104.727    C512,79.127,491.055,58.182,465.455,58.182z" /></g>
                            </svg>
                            On-Off Ramp
                            <span class="tooltiptext">No KYC</span>
                        </button>
                        
                    </div>

                    <div className="menu-mobile">
                        <button onClick={()=>this.handleMobileMenu()} className="mobile-menu-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 48 48">
                                <path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" fill="#3abab4" />
                                <path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" fill="#3abab4" />
                                <path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" fill="#3abab4" />
                            </svg>
                        </button>
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
                                <WalletConnect activeState={this.props.activeState} slippageMenu={this.props.slippageMenu} isOpenModal={this.props.isOpenModal} setOpenModal={this.props.setOpenModal}/>
                            </Web3ReactProvider>
                        </StrictMode>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;