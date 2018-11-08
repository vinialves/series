//import seriesMock from '../../series.json';

import {SET_SERIES} from '../actions';

//export default function seriesReducer(state = seriesMock, action){
export default function seriesReducer(state = null, action){
    switch (action.type){
        case SET_SERIES:
            return action.series;
        default:
            return state; 
    }
}