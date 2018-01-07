import React, { Component } from 'react';
import axios from 'axios';

const con = console.log;

export default class SingleSecurity extends Component{
    constructor(){
        super();
        this.state = {
            quote: ''
        };
    }

    // componentDidMount(){
    //     axios('/api/getquote/' + this.props.symbol)
    //     .then((quote) => { this.setState(quote.data) } )
    //     .catch(err => con('get quote errorrrrrrrr', err) )

    //     setInterval(() => {
    //         axios('/api/getquote/' + this.props.symbol)
    //         .then((quote) => { 
    //             this.setState(quote.data) 
    //         } )
    //         .catch(err => con('get quote by symbol errorrrrrrrrr', err) )
    //     }, 3000);

    // }

    bgColor(pctChange){
        pctChange = Number(pctChange);
        if( pctChange > 11 ) return 'rgb(1,255,82)'
        else if( pctChange > 9 ) return 'rgb(32,255,82)'
        else if( pctChange > 7 ) return 'rgb(64,255,82)'
        else if( pctChange > 5 ) return 'rgb(96,255,82)'
        else if( pctChange > 3 ) return 'rgb(130,255,82)'
        else if( pctChange > 1 ) return 'rgb(160,255,82)'
        else if( pctChange > 0 ) return 'rgb(250,250,250)'
        else if( pctChange === 0 ) return 'rgb(255,255,255)'
        else if( pctChange < -4 ) return 'rgb(255,1,50)'
        else if( pctChange < -3 ) return 'rgb(255,1,70)'
        else if( pctChange < -2 ) return 'rgb(255,1,90)'
        else if( pctChange < -1 ) return 'rgb(255,1,110)'
        else if( pctChange < 0 ) return 'rgb(255,1,130)'
        else return 'rgb(1,1,255)'
    }

    render(){
        const diff = Number(this.state.quote) - Number(this.props.prevClose); //current quote minus previous close
        const pctChange = diff / Number(this.props.prevClose); //get percent 
        return(
            <div className='singleSecurity' onClick={this.props.openChart} style={{background: this.bgColor(this.props.pctChg)}}>
                <div>{this.props.symbol} </div>
                <div>Prev: {this.props.prevClose}</div>
                <div>Last: {this.props.lastPx}</div>
                <div>% chg: { this.props.pctChg }</div>
            </div>
        )
    }
}