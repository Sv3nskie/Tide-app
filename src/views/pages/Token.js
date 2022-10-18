import React from 'react';
import {LightweightChart} from '../../components/chart';
import {tokenInfo, tokenMenu1, tokenMenu2} from '../../components/tokens';
import {timeConverter, numberFormat, truncateAddress} from "../../components/utils";
import {trades, change, pairListData} from '../../api'
import {io} from 'socket.io-client';
import Config from '../../components/config'
import {Helmet} from "react-helmet";
import {calcPrice} from '../../api/index'
// import Web3 from 'web3';


const {sock} = Config();
const SOCKET = sock.local;
const socket = io(SOCKET, {
    autoConnect: false,
    transports: ["websocket"]
});

// const web3 = new Web3(rpc);


function getWindowSize(){
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
};

function basePrice(){
    calcPrice('0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', (data)=>{
        console.log(data)
    })
}


class Token extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dropdown: false,
            token: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
            pair: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
            pairName: 'WBNB/BUSD',
            decimals: 18,
            base0: false,
            stable: false,
            input: '',
            tokens: {},
            trades: [],
            high: '0.00',
            low: '0.00',
            change: '0.00',
            past: '0.00',
            close: '0.00',
            supply: '0.00',
            marketcap: '0.00',
            menu: '',
            swap: '',
            isLoaded: false,
            changeLoaded: false,
            tradesLoaded: false,
            list: '',
            swapOption: 2,
            swapType: 0,
            fromAmount: '',
            toAmount: '',
            tokenMenu1: false,
            tokenMenu2: false,
            bottomOption: 1,
            fromBase: true,
            fromAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
            toAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
            fromSymbol: 'BNB',
            toSymbol: 'ETH',
            slider: 1.1,
            sliderLabel: 0,
            sliderState: 0,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.setToken = this.setToken.bind(this);
        this.search = React.createRef();
        this.searchButton = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleSocket = this.handleSocket.bind(this);
        this.chartLoaded = this.chartLoaded.bind(this);
        this.TradeSection = this.TradeSection.bind(this);
        this.getTokenListData = this.getTokenListData.bind(this);
        this.extraListInfo = this.extraListInfo.bind(this);
        this.handleSwapOptions = this.handleSwapOptions.bind(this);
        this.handleSwapType = this.handleSwapType.bind(this);
        this.handleTokenMenu1 = this.handleTokenMenu1.bind(this);
        this.handleTokenMenu2 = this.handleTokenMenu2.bind(this);
        this.handleFromAmount = this.handleFromAmount.bind(this);
        this.handleToAmount = this.handleToAmount.bind(this);
        this.swapTokenMenu1 = this.swapTokenMenu1.bind(this);
        this.swapTokenMenu2 = this.swapTokenMenu2.bind(this);
        this.slippageBox = this.slippageBox.bind(this);
        this.handlePriceUpdate = this.handlePriceUpdate.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    };


    handleSocket(){
        socket.connect();
        socket.on("connect", ()=>{
            socket.emit("pair", {'pairAddress': this.state.pair});
            
            socket.on('change', (data)=>{
                const {isLoaded, changeLoaded, tradesLoaded} = this.state;
                const {conversionRate} = data;
                const past = parseFloat(this.state.past);
                const current = parseFloat(conversionRate);
                const positive = current > past ? true : false;
                const percDiff = (100 * Math.abs((past - current) / ((past+current)/2))).toFixed(2);
                const change = positive ? `+${percDiff}%` : `-${percDiff}%`;
                const newLow = conversionRate < this.state.low ? conversionRate : this.state.low;
                const newHigh = conversionRate > this.state.high ? conversionRate : this.state.high;
                const price = numberFormat(conversionRate);
                const mcap = this.state.supply * conversionRate;

                if(isLoaded && changeLoaded && tradesLoaded){
                    this.setState({
                        high: newHigh,
                        low: numberFormat(newLow),
                        marketcap: numberFormat(mcap.toFixed(2)),
                        change: change,
                        trades: [data, ...this.state.trades],
                        price: price,
                        swap: data,
                        close: price,
                    });
                };
            });
        });
    };


    extraListInfo(pairAddress){
        const {list} = this.state;
        const pairInfo = list.find(({pair}) => pair === pairAddress);
        const past = parseFloat(pairInfo.open);
        const current = parseFloat(pairInfo.close);
        const positive = current > past ? true : false;
        const percDiff = (100 * Math.abs((past - current) / ( (past+current)/2 ))).toFixed(2);
        const change = positive ? `+${percDiff}%` : `-${percDiff}%`;

        return {change: change, price: numberFormat(pairInfo.close), positive: positive};
    };

    

    componentDidMount(){
        this.getTokenListData();
        this.setToken();
        document.addEventListener("mousedown", this.handleClickOutside);
    };


    componentWillUnmount(){
        document.removeEventListener("mousedown", this.handleClickOutside);
    };


    getTokenListData(){
        pairListData().then(res=>{
            this.setState({
                list: res,
                tokens: tokenInfo(),
            });
        });
    };


    handleSearch(){
        if(this.state.input === '') return;
        const address = tokenInfo().find(({address}) => address.toLowerCase().includes(this.state.input));
        const name = tokenInfo().find(({name}) => name.toLowerCase().includes(this.state.input));
        const symbol = tokenInfo().find(({symbol}) => symbol === this.state.input);
        let found = [];
        if(address) found.push(address);
        if(name) found.push(name);
        if(symbol) found.push(symbol);
        this.setState({
            tokens: found,
        });
    };


    setToken(){
        change({address: this.state.pair}).then(res=>{
            const {open, high, low, close, supply} = res;
            const mcap = (supply * close);
            const past = parseFloat(open);
            const current = parseFloat(close);
            const positive = current > past ? true : false;
            const percDiff = (100 * Math.abs( (past - current) / (past+current) / 2 )).toFixed(2);
            const change = positive ? `+${percDiff}%` : `-${percDiff}%`;
           
            this.setState({
                high: numberFormat(high.toString()),
                low: numberFormat(low.toString()),
                supply: supply,
                marketcap: numberFormat(mcap.toString()),
                change: change,
                past: past,
                close: numberFormat(close),
                changeLoaded: true,
            });
        });

        trades({address: this.state.pair}).then(res=>{
            this.setState({
                trades: res.market,
                tradesLoaded: true,
            });
        });
    };


    handleInput(e){
        this.setState({
            input: e.target.value.toLowerCase(),
        });

        clearTimeout(this.timeout);

        this.timeout = setTimeout(()=>{
            this.handleSearch();
        }, 1000);

        if(e.target.value === ''){
            this.setState({
                tokens: tokenInfo(),
            });
        };
    };


    handleToken(pair, token, pairName){
        socket.close();
        this.setState({
            token: token,
            pair: pair,
            pairName: pairName,
            dropdown: false,
        }, ()=>{
            this.setToken();
        });
    };


    handleClickOutside(e){
        if(this.searchButton.current.contains(e.target)){
            this.setState({
                dropdown: this.state.dropdown ? false : true,
            });
        } else if(!this.search.current.contains(e.target)){
            this.setState({
                dropdown: false,
            });
        };
        this.setState({
            tokenMenu1: false,
            tokenMenu2: false
        })
    };

    chartLoaded(){
        this.setState({
            isLoaded: true,
        });
        this.handleSocket();
    };

    handleSwapOptions(num){
        this.setState({
            swapOption: num
        });
    };

    handleSwapType(num){
        this.setState({
            swapType: num
        });
    };


    slippageBox(){
        return(
          <div className="slippage-box">
            
            <div className="slippage-box-inner">
                <div className="slippage-bog-head">
                    Settings 
                    <button onClick={()=> this.props.setSlippage(false)} className="close-wallet-box">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" font-size="20" class="Modal-close-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                    </button>
                </div>
                <div className="slippage-bog-content">
                    <label>Allowed Slippage</label>
                    <input className="slippage-input" type="number" value="0.3" />
                    <span className="percentage">%</span>
                    <label>
                        <input type="checkbox" />Display PnL after fees
                    </label>
                    
                    <label>
                        <input type="checkbox" />Include PnL in leverage display
                    </label>
                </div>
                <button className="slippage-box-button">Save</button>
            </div>
                
          </div>
        )
    };
    

    TradeSection(){
        const {pairName, trades} = this.state;
        return(
            <div className="trades">
                <div className="trades-menu">
                <span onClick={()=>this.setState({bottomOption:1})} className={this.state.bottomOption === 1 ? 'trades-menu-item active' : 'trades-menu-item'}>Trades</span>
                <span onClick={()=>this.setState({bottomOption:2})} className={this.state.bottomOption === 2 ? 'trades-menu-item active' : 'trades-menu-item'}>Positions</span>
                <span onClick={()=>this.setState({bottomOption:3})} className={this.state.bottomOption === 3 ? 'trades-menu-item active' : 'trades-menu-item'}>Orders</span>
                </div>
                <div className="trades-table">
                    {this.state.bottomOption === 1 &&
                        <>
                            {Object.keys(trades).map((i)=>{
                                return (
                                    <div key={trades[i].uniquePoint} className="box swap-item">
                                        <div className="swap-head">
                                            <span>{timeConverter(trades[i].timestamp)} - </span><span><a href={`https://bscscan.com/tx/${trades[i].txHash}`}>{getWindowSize().innerWidth < 600 ? truncateAddress(trades[i].txHash) : trades[i].txHash}</a></span>
                                        </div>
                                        <div className="swap-body">
                                            <span className={trades[i].type === 'Buy' ? 'positive': 'negative'}>{trades[i].type}</span> <span> - </span>
                                            <span>{pairName.split('/')[0]}: {numberFormat(trades[i].baseAmount)}</span> <span> For </span>
                                            <span>{pairName.split('/')[1]}: {numberFormat(trades[i].quoteAmount)}</span>
                                            <span> Price per {pairName.split('/')[0]}: {numberFormat(trades[i].conversionRate)}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    }
                    {this.state.bottomOption === 2 &&
                        <div className="trades-table">
                            <div className="box swap-item">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Position</td>
                                            <td>Net value</td>
                                            <td>Size</td>
                                            <td>Collateral</td>
                                            <td>Entry Price</td>
                                            <td>Liq. Price</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                    {this.state.bottomOption === 3 &&
                        <div className="trades-table">
                            <div className="box swap-item">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>Type</td>
                                            <td>Order</td>
                                            <td>Price</td>
                                            <td>Mark Price</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };

    swapTokenMenu1(){
        return (
            <div className="token-menu">
                {Object.keys(tokenMenu1).map((i)=>{
                    return (
                        <div className="token-menu-item">
                            <img alt={tokenMenu1[i].symbol} src={`./img/token/${tokenMenu1[i].address}.webp`}></img>
                            <div>
                                <span>{tokenMenu1[i].symbol}</span>
                                <span style={{fontSize: '12px', color: 'var(--text)'}}>{tokenMenu1[i].name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    };

    swapTokenMenu2(){
        return (
            <div className="token-menu">
                {Object.keys(tokenMenu2).map((i)=>{
                    return (
                        <div className="token-menu-item">
                            <img alt={tokenMenu2[i].symbol} src={`./img/token/${tokenMenu2[i].address}.webp`}></img>
                            <div>   
                                <span>{tokenMenu2[i].symbol}</span>
                                <span style={{fontSize: '12px', color: 'var(--text)'}}>{tokenMenu2[i].name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    };

    handleTokenMenu1(){
        this.setState({
            tokenMenu1: this.state.tokenMenu1 ? false : true
        });
    };

    handleTokenMenu2(){
        this.setState({
            tokenMenu2: this.state.tokenMenu2 ? false : true
        });
    };


    handlePriceUpdate(amount, callback){
        const {fromAddress, toAddress} = this.state;
        calcPrice(fromAddress, toAddress, amount, (data)=>{
            callback(data);
        })
    }

    handleFromAmount(e){
        this.setState({
            fromAmount: e.target.value
        }, ()=>{
            this.handlePriceUpdate(this.state.fromAmount, (data)=>{
                this.setState({
                    toAmount: data
                })
            })
        });
    }

    handleToAmount(e){
        this.setState({
            toAmount: e.target.value
        }, ()=>{
            this.handlePriceUpdate(this.state.toAmount, (data)=>{
                this.setState({
                    fromAmount: data
                })
            })
        });
    }

    handleSlider(e){
        this.setState({
            slider: e.target.value,
            sliderLabel: (e.target.value / 30) * 350
        })
    }

    handleSwitch(){
        const {fromBase, fromAmount, toAmount, fromAddress, toAddress, fromSymbol, toSymbol} = this.state
        this.setState({
            fromBase: fromBase ? false : true,
            fromAmount: toAmount,
            toAmount: fromAmount,
            fromAddress: toAddress,
            toAddress: fromAddress,
            fromSymbol: toSymbol,
            toSymbol: fromSymbol,
        })
    }

    render(){
        const {tokens, high, low, marketcap, pairName, isLoaded, change, close, changeLoaded, swapOption, swapType, fromSymbol, toSymbol, tokenMenu1, tokenMenu2, fromAmount, toAmount, fromBase} = this.state;

        return (
            <>
                <Helmet>
                    <title>{pairName} - {close}</title>
                    <meta name="description" content="Nested component" />
                </Helmet>
                {tokenMenu1 &&
                    this.swapTokenMenu1()
                }
                {tokenMenu2 &&
                    this.swapTokenMenu2()
                }
                {this.props.slippageMenu &&
                    this.slippageBox()
                }
                <div className="content flex flex-mobile">
                    <div className="left">
                        <div className="info box flex">
                            <div className="search-dropdown">
                                <button ref={this.searchButton} style={{display:"flex"}} className="drop-button">{pairName} 
                                    <svg width={15} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 330 330" fill="white" style={{enableBackground:"new 0 0 330 330"}} xmlSpace="preserve">
                                        <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                                        c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                                        s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                                    </svg>
                                </button>
                                <div ref={this.search} className="drop-menu box" style={this.state.dropdown ? {display: 'block'} : {display: 'none'}}>
                                    <ul>
                                        <li key="search-item">
                                            <input onChange={(e)=>{this.handleInput(e)}} placeholder='Name, Symbol, Address' className='header-input' type="text"></input>
                                        </li>
                                        <li key="first" className="list-head">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td>Symbols</td>
                                                        <td>Last Price</td>
                                                        <td>24h</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </li>
                                        {Object.keys(tokens).map((i)=>{
                                            return (
                                                <>
                                                    {i < 5 && 
                                                        <>
                                                            <li key={i.toString()} className="list-button" onClick={()=>{this.handleToken(tokens[i].pair[0].address, tokens[i].address, tokens[i].pair[0].name)}} >
                                                                <table>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>{tokens[i].pair[0].name}</td>
                                                                            <td>{this.extraListInfo(tokens[i].pair[0].address).price}</td>
                                                                            <td className={this.extraListInfo(tokens[i].pair[0].address).positive ? 'positive' : 'negative'}>{this.extraListInfo(tokens[i].pair[0].address).change}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </li>
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="base-info flex">
                                <div className="price">
                                    <span className="info-head">Price</span>
                                    {changeLoaded &&
                                        <div className="main-data">{close}</div>
                                    }
                                    {!changeLoaded &&
                                        <div className="main-data">-</div>
                                    }
                                </div>
                                <div className="marketcap hide-mobile">
                                    <span className="info-head">Marketcap</span>
                                    {changeLoaded &&
                                        <div className="main-data">{marketcap}</div>
                                    }
                                    {!changeLoaded &&
                                        <div className="main-data">-</div>
                                    }
                                </div>
                                <div className="change24">
                                    <span className="info-head">24h Change</span>
                                    {changeLoaded &&
                                        <div className={change.includes('-') ? 'main-data negative' : 'main-data positive'}>{change}</div>
                                    }
                                    {!changeLoaded &&
                                        <div className="main-data">-</div>
                                    }
                                </div>
                                <div className="high24  hide-mobile">
                                    <span className="info-head">24h Hight</span>
                                    {changeLoaded &&
                                        <div className="main-data">{high}</div>
                                    }
                                    {!changeLoaded &&
                                        <div className="main-data">-</div>
                                    }
                                </div>
                                <div className="low24  hide-mobile">
                                    <span className="info-head">24h Low</span>
                                    {changeLoaded &&
                                        <div className="main-data">{low}</div>
                                    }
                                    {!changeLoaded &&
                                        <div className="main-data">-</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="chart box">
                            {!isLoaded &&
                                <div className="lds-roller">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            }
                            <LightweightChart pair={this.state.pair} swap={this.state.swap} chartLoaded={this.chartLoaded}/>
                        </div>
                            {getWindowSize().innerWidth > 760 &&
                                <>
                                    <this.TradeSection/>
                                </>
                            }
                    </div>
                    <div className="right">
                        <div className="Exchange-swap-box-inner App-box-highlight">
                            <div>
                                <div className="Tab block Exchange-swap-option-tabs">
                                    <div onClick={()=>{this.handleSwapOptions(0)}} className={swapOption === 0 ? "Tab-option active" : "Tab-option muted"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="9.856" viewBox="0 0 15.704 9.856" width="15.704"><path d="m529-488.59v5.67l-2.113-2.109-5.326 5.319-2.924-2.921-3.9 3.9-1.444-1.448 5.341-5.341 2.924 2.924 3.882-3.882-2.113-2.109z" fill="#fff" transform="translate(-513.3 488.59)"/></svg>
                                        Long
                                    </div>
                                    <div onClick={()=>{this.handleSwapOptions(1)}} className={swapOption === 1 ? "Tab-option active" : "Tab-option muted"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="9.856" viewBox="0 0 15.704 9.856" width="15.704"><path d="m0 0v5.67l2.113-2.11 5.326 5.32 2.924-2.921 3.9 3.9 1.437-1.451-5.337-5.341-2.924 2.924-3.882-3.882 2.113-2.109z" fill="#fff" transform="matrix(-1 0 0 -1 15.704 9.856)"/></svg>
                                        Short
                                    </div>
                                    <div onClick={()=>{this.handleSwapOptions(2)}} className={swapOption === 2 ? "Tab-option active" : "Tab-option muted"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="11.77" viewBox="0 0 17.24 11.77" width="17.24"><path d="m1389.21-1599.04-4.21-3.62v2.48h-5.54v2.27h5.54v2.48zm-13.02 3.4v-2.48l-4.22 3.62 4.22 3.61v-2.47h5.54v-2.28z" fill="#fff" transform="translate(-1371.97 1602.66)"/></svg>
                                        Swap
                                    </div>
                                </div>


                                <div className="Tab inline Exchange-swap-order-type-tabs flex">
                                    <div onClick={()=>{this.handleSwapType(0)}} className={swapType === 0 ? "Tab-option muted active" : "Tab-option muted"}>Market</div>
                                    <div onClick={()=>{this.handleSwapType(1)}} className={swapType === 1 ? "Tab-option muted active" : "Tab-option muted"}>Limit</div>
                                    {swapOption !== 2 &&
                                        <div onClick={()=>{this.handleSwapType(2)}} className={swapType === 2 ? "Tab-option muted active" : "Tab-option muted"}>Trigger</div>
                                    }
                                </div>
                            </div>
                            {swapType === 2 &&
                                <div className="Exchange-swap-section Exchange-trigger-order-info">
                                    Take-profit and stop-loss orders can be set after opening a position. <br />
                                    <br />
                                    There will be a "Close" button on each position row, clicking this will display the option to set trigger orders. <br />
                                    <br />
                                    For screenshots and more information, please see the <a href="/" target="_blank" rel="noopener noreferrer">docs</a>.
                                </div>
                            }

                            {swapType !== 2 &&
                                <>
                                    <div className="Exchange-swap-section">
                                        <div className="Exchange-swap-section-top"><div className="muted">Pay</div></div>
                                        <div className="Exchange-swap-section-bottom">
                                            <div className="Exchange-swap-input-container">
                                                <input onChange={(e)=>{this.handleFromAmount(e)}} value={fromAmount} type="number" min="0" placeholder="0.0" className="Exchange-swap-input" />
                                            </div>
                                            <div>
                                                <div className="TokenSelector">
                                                    <div  onClick={(e)=>{this.handleTokenMenu1(e, true)}} className="TokenSelector-box">
                                                        {fromSymbol}
                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="TokenSelector-caret" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div onClick={()=>this.handleSwitch()} className="Exchange-swap-ball-container">
                                        <div className="Exchange-swap-ball">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="Exchange-swap-ball-icon" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M131.3 231.1L32 330.6l99.3 99.4v-74.6h174.5v-49.7H131.3v-74.6zM480 181.4L380.7 82v74.6H206.2v49.7h174.5v74.6l99.3-99.5z"></path>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="Exchange-swap-section">
                                        <div className="Exchange-swap-section-top">
                                            <div className="muted">{swapOption === 0 ? 'Long' : swapOption === 1 ? 'Short' : 'Receive'}</div>
                                            <div className="muted align-right">{swapOption === 2 ? '' : `Leverage: ${this.state.slider}x`}</div>
                                        </div>

                                        <div className="Exchange-swap-section-bottom">
                                            <div>
                                                <input onChange={(e)=>{this.handleToAmount(e)}} value={toAmount} type="number" min="0" placeholder="0.0" className="Exchange-swap-input" />
                                            </div>
                                            <div>
                                                <div className="TokenSelector">
                                                    <div onClick={()=>{this.handleTokenMenu2(false)}} className="TokenSelector-box">
                                                        {toSymbol}
                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="TokenSelector-caret" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {swapType === 1 &&
                                        <div className="Exchange-swap-section">
                                            <div className="Exchange-swap-section-top">
                                                <div className="muted">Price</div>
                                                <div className="muted align-right clickable">1501.5800</div>
                                            </div>
                                            <div className="Exchange-swap-section-bottom">
                                                <div className="Exchange-swap-input-container">
                                                    <input type="number" min="0" placeholder="0.0" className="Exchange-swap-input small" value="" />
                                                </div>
                                                <div className="PositionEditor-token-symbol">{fromSymbol} {toSymbol}</div>
                                            </div>
                                        </div>
                                    }
                                    {swapOption !== 2 &&
                                        <div className="Exchange-leverage-box">
                                            <div className="Exchange-leverage-slider-settings">
                                                <div className="Checkbox selected">
                                                    <span className="Checkbox-icon-wrapper">
                                                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" className="App-icon Checkbox-icon active" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M14 0h-12c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM7 12.414l-3.707-3.707 1.414-1.414 2.293 2.293 4.793-4.793 1.414 1.414-6.207 6.207z"></path>
                                                        </svg>
                                                    </span>
                                                    <span className="Checkbox-label"><span className="muted">Leverage slider</span></span>
                                                </div>
                                            </div>

                                            <div class="container">
                                                <div class="range-slider">
                                                    <span style={{left: this.state.sliderLabel ,display: this.state.sliderState === 0 ? 'none' : 'flex'}} id="rs-bullet" class="rs-label">{this.state.slider}</span>
                                                    <input onMouseDown={()=>this.setState({sliderState: 1})} onMouseUp={()=>this.setState({sliderState: 0})} onChange={(e)=>this.handleSlider(e)} id="rs-range-line" class="rs-range" type="range" value={this.state.slider} min="1.1" max="30" step="0.1" />
                                                </div>
                                                
                                                <div class="box-minmax">
                                                    <span>1.1</span><span>30</span>
                                                </div>
                                            </div>

                                            <div className="Exchange-info-row">
                                                <div className="Exchange-info-label">Profits In</div>
                                                <div className="align-right strong">{toSymbol}</div>
                                            </div>
                                            <div className="Exchange-info-row">
                                                <div className="Exchange-info-label">Leverage</div>
                                                <div className="align-right">{this.state.slider}</div>
                                            </div>
                                            <div className="Exchange-info-row">
                                                <div className="Exchange-info-label">Entry Price</div>
                                                <div className="align-right">-</div>
                                            </div>
                                            <div className="Exchange-info-row">
                                                <div className="Exchange-info-label">Liq. Price</div>
                                                <div className="align-right">-</div>
                                            </div>
                                            <div className="Exchange-info-row">
                                                <div className="Exchange-info-label">Fees</div>
                                                <div className="align-right"><div>-</div></div>
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                            <div className="Exchange-swap-button-container">
                                <button onClick={()=> this.props.active ? console.log('Wallet connected') : this.props.setOpenModal(true)} className="App-cta Exchange-swap-button">{swapType === 2 ? 'Open a position' : (this.props.active ? 'Swap' : 'Connect Wallet')}</button>
                            </div>
                        </div>

                        <div className="Exchange-swap-market-box App-box App-box-border">
                            <div className="Exchange-swap-market-box-title">Swap</div>
                            <div className="App-card-divider"></div>
                            <div className="Exchange-info-row">
                                <div className="Exchange-info-label">{fromSymbol} Price</div>
                                <div className="align-right">1,457.40 USD</div>
                            </div>
                            <div className="Exchange-info-row">
                                <div className="Exchange-info-label">{toSymbol} Price</div>
                                <div className="align-right">1.00 USD</div>
                            </div>
                            <div className="Exchange-info-row">
                                <div className="Exchange-info-label">Available Liquidity:</div>
                                <div className="align-right al-swap">
                                    <span className="Tooltip"><span className="Tooltip-handle">18,717,857.53 USD</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="Exchange-swap-market-box App-box App-box-border">
                            <div className="Exchange-swap-market-box-title">Useful Links</div>
                            <div className="App-card-divider"></div>
                            <div className="Exchange-info-row">
                                <div className="Exchange-info-label-button"><a href="/" target="_blank" rel="noopener noreferrer">Trading guide</a></div>
                            </div>
                            <div className="Exchange-info-row">
                                <div className="Exchange-info-label-button"><a href="/" target="_blank" rel="noopener noreferrer">Leaderboard</a></div>
                            </div>
                            <div className="Exchange-info-row">
                                <div className="Exchange-info-label-button"><a href="/" target="_blank" rel="noopener noreferrer">Speed up page loading</a></div>
                            </div>
                        </div>


                        {getWindowSize().innerWidth < 761 &&
                            <>
                                <this.TradeSection/>
                            </>
                        }
                    </div>
                </div>
            </>
        );
    };
};
  
export default Token;