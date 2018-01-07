import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
//import thunkMiddleware from 'redux-thunk';

const initialState = {
    left: '0px',
    top: '0px',
    bars: [],
    chartSymbol: 'JPM'
}

export const chartSymbol = (chartSymbol) => {
    return {type: 'chartSymbol', chartSymbol};
}

export const getBars = (bars) => {
    return {type: 'bars', bars};
}

const reducer = function(state = initialState, action){
    switch(action.type){
        case 'crossHairPos':
            return Object.assign({}, state, {left: action.left, top: action.top} );
        case 'bars':
            return Object.assign({}, state, {bars: action.bars} );
        case 'chartSymbol':
            return Object.assign({}, state, {chartSymbol: action.chartSymbol});
        default: return state;
    }
}

export default createStore(reducer);
//export default createStore(reducer, applyMiddleware(reduxLogger) );