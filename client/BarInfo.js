import React from 'react';
import store from './store/store';

const con = console.log;

export default class BarInfo extends React.Component{
    constructor(){
        super();
        this.state = store.getState();
        this.currentBar = {open: '999', close: '999', low: '999', high: '999'};
    }

    componentDidMount(){
        con('props', this.props)
        this.unsubscribeStore = store.subscribe(() => {
            this.setState(store.getState());
            var xPos = Number(this.state.left.substring(0, this.state.left.indexOf('p')));
            if( xPos >= 1000 ) xPos = 1000;
            xPos = (xPos / 10).toFixed(2);
            const barIdx = (xPos.indexOf('.') > -1 ? xPos.substring(0, xPos.indexOf('.')) : xPos );
            if( this.state.bars[barIdx] ) this.currentBar = this.state.bars[barIdx];
        });
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }

    render(){
        return(
            <div id="barinfo">
                <div>{this.currentBar.symbol}</div>
                <div>Date: {this.currentBar.date}</div>
                <div>Open: {this.currentBar.open}</div>
                <div>Low: {this.currentBar.low}</div>
                <div>High: {this.currentBar.high}</div>
                <div>Close: {this.currentBar.close}</div>
            </div>
        )
    }
}