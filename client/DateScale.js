import React from 'react';
import store from './store/store';

const con = console.log;
const JAN = "JAN";
const FEB = "FEB";
const MAR = "MAR";
const APR = "APR";
const MAY = "MAY";
const JUN = "JUN";
const JUL = "JUL";
const AUG = "AUG";
const SEP = "SEP";
const OCT = "OCT";
const NOV = "NOV";
const DEC = "DEC";


export default class DateScale extends React.Component{
    constructor(){
        super();
        this.state = store.getState();
        this.buildScale = this.buildScale.bind(this);
        this.buildScale = this.buildScale.bind(this);
        this.printMonth = this.printMonth.bind(this);
        this.currentMonth = "XXX";
    }

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    buildScale(){
        let scales = [];
        let xPos = 5;
        for(let i = 0; i < 100; i++)
        {
            scales.push(<line key={i} x1={xPos+"px"} y1="0px" x2={xPos+"px"} y2="15px" style={{stroke: 'rgb(0,0,0)', strokeWidth: 2}}></line>);
            xPos += 10;
        }
        return scales;
    }

    printMonth(month){
        switch(month){
            case "01":
                return JAN;
            case "02":
                return FEB;
            case "03":
                return MAR;
            case "04":
                return APR;
            case "05":
                return MAY;
            case "06":
                return JUN;
            case "07":
                return JUL;
            case "08":
                return AUG;
            case "09":
                return SEP;
            case "10":
                return OCT;
            case "11":
                return NOV;
            case "12":
                return DEC;
            default:
                return "XXX";
        }
    }

    buildDates(){
        //date: "2017-08-28"
        //volume: "7419544"
        //symbol: "MRK"
        //con('store', this.state.bars);
        let xPos = -5;
        let dates = this.state.bars.map((bar, idx) => {
            xPos += 10;
            let month = bar.date.substring(5,7);
            let day = bar.date.substring(8, 10);
            let monthStr;
            // if(this.currentMonth === "XXX" && (day === "01" || day === "02" || day === "03") )
            // {
            //     monthStr = this.printMonth(month);
            //     this.currentMonth = month;
            // }
            if( (month !== this.currentMonth) && idx !== 0 )
            {
                monthStr = this.printMonth(month);
            }
            this.currentMonth = month;
            return <text key={idx} x={xPos+"px"} y="28px" style={ {fill: 'blue'} }>{monthStr}</text>
        })
        return dates;
    }

    render(){
        return (
            <svg id="datescale">
                <line id="datehorizontalline" x1="0%" y1="0%" x2="100%" y2="0%" style={{stroke: 'rgb(0,0,0)', strokeWidth: 2}}></line>
                {this.buildScale()}
                {this.buildDates()}
            </svg>
        )
    }
}