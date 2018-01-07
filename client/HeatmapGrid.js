import React from 'react';
import axios from 'axios';
import { setInterval } from 'timers';
import SingleSecurity from './SingleSecurity';
import Chart2 from './Chart2';
import store, {getBars, chartSymbol} from './store/store';

const con = console.log;
const rce = React.createElement;

export default class HeatmapGrid extends React.Component{
    constructor(){
        super();
        this.prevClosingPrices = [];
        this.state = {
            securities: []
        }
        this.modalChart = rce(Chart2, null, null);
        this.closeModalChart = rce('span', {id: 'closemodalchart', onClick: this.onClickCloseModalChart, style: {float: 'right', color: '#aaaaaa', fontSize: '28px'} }, 'X');
        this.onClickOpenModalChart = this.onClickOpenModalChart.bind(this);
    }

    onClickCloseModalChart(){
        document.getElementById('modalchartcontainer').style.display = 'none';
    }

    componentDidMount(){
        // axios.get('/api/textdata')
        // .then(response => this.setState(response.data) )
        // .catch(err => {console.log('/api/textdata error', err)})
        
        axios.get('/api/heatmap')
        .then(response => {
            let securities = response.data.securities.map((secObj) => {
                this.prevClosingPrices[secObj.symbol] = Number(secObj.prevClose);
                let obj = {};
                obj.symbol = secObj.symbol;
                obj.prevClose = secObj.prevClose;
                obj.last = 0;
                obj.pctChg = 0;
                return obj;
            });
            this.setState(response.data);
        })
        .then(() => axios.get('/api/getlastpx'))
        .then(response => {
            let securities = response.data.securities.map((sec) => {
                let diff = Number(sec.open) - Number(this.prevClosingPrices[sec.symbol]);
                let pctChange = diff / Number(this.prevClosingPrices[sec.symbol]);
                let obj = {};
                obj.symbol = sec.symbol;
                obj.prevClose = this.prevClosingPrices[sec.symbol];
                obj.last = sec.open;
                obj.pctChg = pctChange;
                return obj;
            });
            ///////sort the 'securities' array by pctChg
            securities.sort((objA, objB) => (objA.pctChg - objB.pctChg) * -1 );
            /////// set state using 'securities'
            this.setState({securities})
        })
        .then(() => {
            setInterval(() => {
                axios.get('/api/getlastpx')
                .then(response => {
                    let securities = response.data.securities.map((sec) => {
                        let diff = Number(sec.open) - Number(this.prevClosingPrices[sec.symbol]);
                        let pctChange = diff / Number(this.prevClosingPrices[sec.symbol]);
                        let obj = {};
                        obj.symbol = sec.symbol;
                        obj.prevClose = this.prevClosingPrices[sec.symbol];
                        obj.last = sec.open;
                        obj.pctChg = pctChange;
                        return obj;
                    });
                    ///////sort the 'securities' array by pctChg
                    securities.sort((objA, objB) => (objA.pctChg - objB.pctChg) * -1 );
                    /////// set state using 'securities'
                    this.setState({securities});
                })
            }, 4000);
        })
        .catch(err => console.log('heatmap errorrrrrrrrrr', err))
    }

    extractSymbol(symbol){
        return symbol.substring( symbol.indexOf('(') + 1, symbol.indexOf(')') )
    }

    onClickOpenModalChart(symbol){
        axios.get('/api/getchart/' + symbol)
        .then(response => store.dispatch( getBars(response.data) )  )
        .then(() => document.getElementById('modalchartcontainer').style.display = 'block' )
        .catch(err => con('getchart error in heatmap', err) );
    }

    render(){
        var securities = this.state.securities.map((security) => {
            return <SingleSecurity openChart={() => this.onClickOpenModalChart(security.symbol) } symbol={security.symbol} prevClose={security.prevClose} lastPx={security.last} pctChg={(security.pctChg*100).toFixed(2)} key={security.symbol} />
        });
        return(
            <div className='heatmapGrid' >
                {rce('div', {id: 'modalchartcontainer'}, this.closeModalChart, this.modalChart)}
                {securities}
            </div>
        )
    }
}