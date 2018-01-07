import React from 'react';

const con = console.log;

export default class Test extends React.Component{
    btnOnClick(){
        document.getElementById("testdiv2").style.display = 'block';
    }

    divOnclick(){
        document.getElementById('testdiv2').style.display = 'none';
    }

    render(){
        const c1 = React.createElement('div', {id: 'testdiv2', onClick: this.divOnclick, style: {display: 'none', width: '50px', height: '50px', backgroundColor: 'blue'}}, ' a child');
        const c2 = React.createElement('button', {onClick: this.btnOnClick}, "click");
        return React.createElement('div', {id: 'testdiv1'}, 'this is parent', c1, c2);
    }
}