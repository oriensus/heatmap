import React from 'react';
import store from './store/store';

export default class HorizontalHair extends React.Component{
    constructor(){
        super();
        this.state = store.getState();
    }

    componentDidMount(){
        this.unsubscribeStore = store.subscribe(() => {
            this.setState( store.getState() );
        });
    }

    componentWillUnmount(){
        this.unsubscribeStore();
    }

    render(){
            return(
                <div id='horizontalHair' className='hair' style={{top: store.getState().top}}></div>
            )
        }
}