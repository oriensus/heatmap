import React from 'react';
import axios from 'axios';
import Bar from './Bar';
import VerticalHair from './VerticalHair';
import HorizontalHair from './HorizontalHair';
import PxScale from './PxScale';
import BarInfo from './BarInfo';
import TestComponent from './Test';
import store from './store/store';

const con = console.log;

export default class Chart extends React.Component{
    constructor(){
        super();
        this.minRange = -1;
        this.maxRange = -99;
        this.range = 0;
        this.state = store.getState();
        this.moveCrossHair = this.moveCrossHair.bind(this);
        this.getMinMaxRange = this.getMinMaxRange.bind(this);
        this.getPct = this.getPct.bind(this);
        this.getPct2 = this.getPct2.bind(this);
    }

    componentDidMount(){
        // axios.get('/api/getchart/jpm')
        // .then(response => {
        //     store.dispatch( {type: 'bars', bars: response.data} );
        // })
        // .catch(err => con('getchart errorrrrrrrrrrrr', err) );

        this.unsubscribeStore = store.subscribe(() => {
                this.minRange = -1;
                this.maxRange = -99;
                this.setState( this.setState(store.getState()) )
            }
        );
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }

    moveCrossHair(event){
        var left = Number(event.pageX) - 72;
        var top = Number(event.pageY) - 78;
        store.dispatch( {type: 'crossHairPos', left: left+'px', top: top+'px'} );
    }

    getMinMaxRange(){
        this.state.bars.forEach(bar => {
            if( this.minRange === -1) 
                this.minRange = Number(bar.low);
            else
            {
                if(this.minRange > Number(bar.low))
                    this.minRange = Number(bar.low);
            }

            if( this.maxRange === -99) 
                this.maxRange = Number(bar.high);
            else
            {
                if(this.maxRange < Number(bar.high))
                    this.maxRange = Number(bar.high);
            }
        });
        this.range = this.maxRange - this.minRange;
    }

    getPct(px1, px2){
        const diff = Number(px1) - Number(px2);
        return ((1 - (diff / this.range)) * 100).toFixed(0);
    }

    getPct2(px1, px2){
        const diff = Number(px1) - Number(px2);
        return ((diff / this.range) * 100).toFixed(2);
    }

    getData(){
        axios.get('/api/getchart/' + store.getState().chartSymbol)
        .then(response => {
            store.dispatch( {type: 'bars', bars: response.data} );
        })
        .catch(err => con('getchart errorrrrrrrrrrrr', err) );
    }

    render(){
        this.getMinMaxRange();
        //con('min -- max == range', this.minRange, this.maxRange, this.range);
        var barLeftPos = -10;
        const bars = this.state.bars.map((bar, idx) => {
            barLeftPos += 10;
            const topPos = this.getPct(bar.high, this.minRange); //position of top of the bar
            const barHeight = this.getPct(bar.low, this.minRange) - topPos; //height of the overall bar including head, body, tail
            var isPositive = true;
            if( (bar.close - bar.open) < 0 ) isPositive = false;
            var head =  isPositive ? this.getPct2(bar.high, bar.close) : this.getPct2(bar.high, bar.open);
            var body =  isPositive ? this.getPct2(bar.close, bar.open) : this.getPct2(bar.open, bar.close);      
            var tail =  isPositive ? this.getPct2(bar.open, bar.low) : this.getPct2(bar.close, bar.low);
            var bgcolor = isPositive ? 'green' : 'red';
            head = ((head / barHeight) * 100).toFixed(2);
            body = ((body / barHeight) * 100).toFixed(2);
            tail = ((tail / barHeight) * 100).toFixed(2);
            //con('head body tail min max range', head, body, tail, this.minRange, this.maxRange, this.range )
            return <Bar key={idx} left={barLeftPos+'px'} top={topPos+'%'} bgcolor={bgcolor} barHeight={barHeight+'%'} head={head+'%'} body={body+'%'} tail={tail+'%'}/>
        });
        //con('bars.....', bars);
        return(
            <div id='chart' onMouseMove={this.moveCrossHair}>
                <VerticalHair />
                <HorizontalHair />
                <PxScale minRange={this.minRange} maxRange={this.maxRange} range={this.range} />
                <BarInfo />
                {bars}
            </div>
        )
    }
}