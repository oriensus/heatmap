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
        this.unsubscribeStore = store.subscribe(() => {
            this.setState(store.getState());
            var xPos = Number(this.state.left.substring(0, this.state.left.indexOf('p')));
            xPos = (xPos / 10).toFixed(0);
            const barIdx = (xPos.length === 1 ? xPos : xPos.charAt(0) + xPos.charAt(1) );
            this.currentBar = this.state.bars[barIdx];
        });
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }

    render(){
        return(
            <div id="barinfo">
                <div>Open: {this.currentBar.open}</div>
                <div>Low: {this.currentBar.low}</div>
                <div>High: {this.currentBar.high}</div>
                <div>Close: {this.currentBar.close}</div>
            </div>
        )
    }
}