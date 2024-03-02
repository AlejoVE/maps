/* eslint import/no-webpack-loader-syntax: off */
import { createContext } from 'react';
// @ts-ignore
import { Map } from '!mapbox-gl';
import { mapRoute } from '../../interfaces/directions';

interface MapProps {
	isMapReady: boolean;
	map?: Map;
	setMap: (map: Map) => void;
	getRouteBetweenPoints: (start: [number, number], end: [number, number]) => Promise<void>;
	route?: mapRoute;
	cleanRoute: () => void;
}

export const MapContext = createContext({} as MapProps);
