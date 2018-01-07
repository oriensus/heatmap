import React from 'react';

const con = console.log;

export default class PxScale extends React.Component{
    constructor(){
        super();
        this.buildScale = this.buildScale.bind(this);
        this.buildPx = this.buildPx.bind(this);
    }

    buildScale(){
        var scales = [];
        var yPos = 0;
        for(var i = 0; i < 20; i++ )
        {
            yPos += 5;
            scales.push( <line key={i} x1="1%" y1={yPos+"%"} x2="10%" y2={yPos+"%"} style={ {stroke: 'rgb(255,0,0)', strokeWidth: 2 } } /> );
        }
        return scales;
    }

    buildPx(){
        //con('min max range', this.props.minRange, this.props.maxRange, this.props.range);
        this.gridVal = (Number(this.props.range) / 20);
        var px = [];
        var yPos = 0;
        var val = Number(this.props.maxRange);
        for(var i = 0; i < 20; i++ )
        {
            yPos += 5;
            px.push( <text key={i} x="12%" y={yPos+"%"} style={ {fill: 'red'} }>{val.toFixed(2)}</text> );
            val -= this.gridVal;
        }
        return px;
    }



    render(){
        return(
            <svg id="pxscale" >
                <line x1="1%" y1="0" x2="1%" y2="100%" style={ {stroke: 'rgb(255,0,0)', strokeWidth: 2 } } />
                {this.buildScale()}
                {this.buildPx()}
            </svg>
        )
    }
}