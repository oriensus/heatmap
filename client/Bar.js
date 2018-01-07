import React from 'react';

let con = console.log;

export default class Bar extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="bar" style={{position: 'absolute', left: this.props.left, top: this.props.top, backgroundColor: 'white', height: this.props.barHeight}}>
            <div style={ {margin: 'auto', width: '20%', height: this.props.head, backgroundColor: this.props.bgcolor} }></div>
            <div style={ {height: this.props.body, backgroundColor: this.props.bgcolor} }></div>
            <div style={ {margin: 'auto', width: '20%', height: this.props.tail, backgroundColor: this.props.bgcolor} }></div>
            </div>
        )
    }
}