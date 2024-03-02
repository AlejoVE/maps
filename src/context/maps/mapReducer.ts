/* eslint import/no-webpack-loader-syntax: off */

import { MapState } from './MapProvider';
// @ts-ignore
import { Map, Marker } from '!mapbox-gl';
import { mapRoute } from '../../interfaces/directions';

type MapAction =
    | { type: 'SetMap', payload: Map }
    | { type: 'SetMarkets', payload: Marker[] }
    | { type: 'setRoute', payload: mapRoute }
    | { type: 'cleanRoute' }


export const mapReducer = (state: MapState, action: MapAction): MapState => {
    switch (action.type) {
        case 'SetMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        case 'SetMarkets':
            return {
                ...state,
                markers: action.payload
            }
        case "setRoute":
            return {
                ...state,
                route: action.payload
            }
        case 'cleanRoute':
            return {
                ...state,
                route: undefined
            }
        default:
            return state;
    }
}
