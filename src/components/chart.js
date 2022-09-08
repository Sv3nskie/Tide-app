import * as React from 'react';
import { createChart } from 'lightweight-charts';
import { getChart } from '../api';
import {numberFormat, timeConverter} from './utils';

let currentBar = {
    open: null,
    high: null,
    low: null,
    close: null,
    time: null,
    volume: null,
};

function getWindowSize(){
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export class LightweightChart extends React.PureComponent {

    constructor(props){
        super(props);
        this.chart = null;
        this.candleSeries = null;
        this.state = {
            tooltip: {open: '0.00', high: '0.00', low: '0.00', close: '0.00'},
            volume: {volume: '0.00'},
            resolution: 3600,
            pair: this.props.pair,
            data: [],
            isLoaded: false,
            swap: '',
            isPositive: false,
            windowSize: '',
            lastCandleTime: ''
        };
        this.setChart = this.setChart.bind(this);
        this.handleTooltip = this.handleTooltip.bind(this);
        this.handleResolution = this.handleResolution.bind(this);
        this.getChart = this.getChart.bind(this);
        this.tooltip = this.tooltip.bind(this);
        this.liveCandle = this.liveCandle.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
    };

    liveCandle(){
        const {data, resolution, swap, lastCandleTime} = this.state;
        const lastCandle = data[data.length - 1];
        const price = numberFormat(swap.conversionRate);

        if(currentBar.open === null){
            console.log('opt1')
            currentBar.open = lastCandle.open;
            currentBar.high = lastCandle.high > price ? lastCandle.high : price;
            currentBar.low = lastCandle.low < price ? lastCandle.low : price;
            currentBar.close = price;
            currentBar.time = lastCandle.time;
            currentBar.volume = (parseFloat(lastCandle.volume) + parseFloat(swap.baseAmount)).toFixed(2);

            data[data.length-1].volume = currentBar.volume

            this.setState({
                data,
            });
        } else if(swap.timestamp < lastCandleTime + resolution){
            console.log('opt2')
            currentBar.open = lastCandle.open;
            currentBar.high = currentBar.high > price ? currentBar.high : price;
            currentBar.low = currentBar.low < price ? currentBar.low : price;
            currentBar.close = price;
            currentBar.time = lastCandle.time;
            currentBar.volume = (parseFloat(lastCandle.volume) + parseFloat(swap.baseAmount)).toFixed(2);

            data[data.length-1].volume = currentBar.volume

            this.setState({
                data,
            });

        } else {
            console.log('opt3')
            currentBar.open = price;
            currentBar.high = price;
            currentBar.low = price;
            currentBar.close = price;
            currentBar.time = lastCandle.time + resolution;
            currentBar.volume = numberFormat(swap.baseAmount);

            this.setState({
                lastCandleTime: currentBar.time,
                data: [...data, currentBar],
            });
        };

        this.candleSeries.update(currentBar);
    };

    tooltip(d, e){
        return (
            <div className={this.state.isPositive ? "tooltip-value ExchangeChart-bottom-stats positive length-1" : "tooltip-value ExchangeChart-bottom-stats negative length-1"}>
                <span className="ExchangeChart-bottom-stats-label">O: </span>
                <span className="ExchangeChart-bottom-stats-value">{numberFormat(d.open)}</span>
                <span className="ExchangeChart-bottom-stats-label">H: </span>
                <span className="ExchangeChart-bottom-stats-value">{numberFormat(d.high)}</span>
                <span className="ExchangeChart-bottom-stats-label">L: </span>
                <span className="ExchangeChart-bottom-stats-value">{numberFormat(d.low)}</span>
                <span className="ExchangeChart-bottom-stats-label">C: </span>
                <span className="ExchangeChart-bottom-stats-value">{numberFormat(d.close)}</span>
                <span className="ExchangeChart-bottom-stats-label hide-mobile">Volume: </span>
                <span className="ExchangeChart-bottom-stats-value hide-mobile">{numberFormat(e.volume)}</span>
            </div>
        );
    };

    handleTooltip(data, bar){
        const timestamp = data.time;
        const candle = this.state.data.find(({time}) => time === timestamp);
        const isPos = parseFloat(bar.close) > parseFloat(bar.open) ? true : false;

        this.setState({
            tooltip: bar,
            volume: candle,
            isPositive: isPos
        });
    };

    handleResolution(num){
        this.setState({
            resolution: num
        }, ()=>{
            this.getChart();
        });
    };

    static defaultProps = {
		containerId: 'lightweight_chart_container',
	};

    handleWindowResize(){
        this.setState({
            windowSize: getWindowSize()
        });
    };

    componentDidMount(){
        this.setState({
            windowSize: getWindowSize()
        })

        this.getChart();
        window.addEventListener('resize', this.handleWindowResize);
    };

    componentDidUpdate(){
        if(this.props.swap !== this.state.swap && this.state.isLoaded){
            this.setState({
                swap: this.props.swap
            },()=>{
                this.liveCandle();
            });
        };

        if(this.props.pair !== this.state.pair){
            this.setState({
                pair: this.props.pair
            }, ()=>{
                this.getChart();
            });
        };
    };

    getChart(){
        getChart({address: this.state.pair, resolution: this.state.resolution}).then((res)=>{
            let charData = [];
            if(this.chart != null){
                this.chart.remove();
            };
            
            res.forEach(item=>{
                const {open, close, high, low, time, amount} = item;
                const temp = {
                    time: time,
                    open: numberFormat(open),
                    high: numberFormat(high),
                    low: numberFormat(low),
                    close: numberFormat(close),
                    volume: numberFormat(amount['$numberDecimal']),
                }
                charData.push(temp);
            });
            this.setState({
                data: charData
            }, ()=>{
                this.setChart();
            });
        });
    };

    setChart(){
        const {data} = this.state;
        const chart = createChart(this.props.containerId, {
            width: getWindowSize().innerWidth < 767 ? getWindowSize().innerWidth - 25 : (getWindowSize().innerWidth / 3) * 2 - 10,
            height: 450,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25,
                },
                borderVisible: false,
            },
            timeScale: {
                rightOffset: 12,
                barSpacing: 3,
                fixLeftEdge: true,
                lockVisibleTimeRangeOnResize: false,
                rightBarStaysOnScroll: true,
                borderVisible: false,
                visible: true,
                timeVisible: true,
                secondsVisible: true
            },
            localization: {
                timeFormatter: (timestamp) => {
                  return timeConverter(timestamp);
                },
            },
            layout: {
                backgroundColor: '#16182e',
                textColor: '#8b8ead',
            },
            grid: {
                vertLines: {
                  visible: true,
                  color: "rgba(35, 38, 59, 1)",
                  style: 2,
                },
                horzLines: {
                  visible: true,
                  color: "rgba(35, 38, 59, 1)",
                  style: 2,
                },
            },
        });

        this.chart = chart;
        
        const candleSeries = chart.addCandlestickSeries({
            upColor: '#3abab4',
            borderUpColor: '#3abab4',
            wickUpColor: '#3abab4',
            downColor: '#fb3c58',
            borderDownColor: '#fb3c58',
            wickDownColor: '#fb3c58',
        });
        
        candleSeries.setData(data);

        this.candleSeries = candleSeries;

        this.chart.subscribeCrosshairMove((param)=>{
            if(!param.time || !param.point){
                this.handleTooltip(data[data.length -1], data[data.length -1]);
            } else {
                const candlestick = param.seriesPrices.get(candleSeries);
                this.handleTooltip(param, candlestick);
            };
        });

        this.props.chartLoaded(true);
        this.handleTooltip(data[data.length -1], data[data.length -1]);

        this.setState({
            isLoaded: true,
            tooltip: data[data.length - 1],
            volume: data[data.length - 1],
            lastCandleTime: data[data.length - 1].time
        });
    };

	componentWillUnmount(){
        window.removeEventListener('resize', this.handleWindowResize);

		if (this.chart !== null) {
			this.chart.remove();
			this.chart = null;
		};
	};

    resolution(){
        return (
            <div className="time-select">
                <button className={this.state.resolution === 300 ? 'active' : ''} onClick={()=>{this.handleResolution(300)}}>5m</button>
                <button className={this.state.resolution === 900 ? 'active' : ''} onClick={()=>{this.handleResolution(900)}}>15m</button>
                <button className={this.state.resolution === 3600 ? 'active' : ''} onClick={()=>{this.handleResolution(3600)}}>1h</button>
                <button className={this.state.resolution === 14400 ? 'active' : ''} onClick={()=>{this.handleResolution(14400)}}>4h</button>
                <button className={this.state.resolution === 86400 ? 'active' : ''} onClick={()=>{this.handleResolution(86400)}}>1d</button>
            </div>
        );
    };

	render(){
        const {tooltip, volume, isLoaded} = this.state;
		return (
            <div className="chart-inner">
                <div className="chart-header">
                    {this.resolution()}
                    {isLoaded &&
                        <>
                            {this.tooltip(tooltip, volume)}
                        </>
                    }
                    
                </div>
                <div id={ this.props.containerId } className={ 'LightweightChart' } />
            </div>
		);
	};
};