/* eslint import/no-webpack-loader-syntax: off */

import { useContext, useEffect, useReducer } from 'react';
// @ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from '!mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';
import { directionsApi } from '../../apis';
import { DirectionsResponse, mapRoute } from '../../interfaces/directions';

export interface MapState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
	route?: mapRoute;
}

const INITIAL_STATE: MapState = {
	isMapReady: false,
	map: undefined,
	markers: [],
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
	const { places } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach((marker) => marker.remove());
		const newMarkers: Marker[] = [];

		for (const place of places) {
			const [lng, lat] = place.center;
			const popup = new Popup().setHTML(`
					<h6>${place.text_en}</h6>
					<p>${place.place_name_en}</p>
			`);

			const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!);
			newMarkers.push(newMarker);
		}

		dispatch({ type: 'SetMarkets', payload: newMarkers });
	}, [places]);

	useEffect(() => {
		// Clean existing polyline
		if (state.map?.getLayer('RouteString')) {
			state.map.removeLayer('RouteString');
			state.map.removeSource('RouteString');
		}
	}, [places]);

	const setMap = (map: Map) => {
		const myLocationPopup = new Popup().setHTML(`
			<h4>Here Im</h4>
			<p>In some place in the world</p>
		`);
		new Marker({ color: '#61DAFB' }).setLngLat(map.getCenter()).setPopup(myLocationPopup).addTo(map);
		dispatch({ type: 'SetMap', payload: map });
	};

	const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
		try {
			const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);

			const { distance, duration, geometry } = resp.data.routes[0];
			const { coordinates: coords } = geometry;

			let kms = distance / 1000;
			kms = Math.round(kms * 100);
			kms = kms / 100;

			const minutes = Math.floor(duration / 60);

			dispatch({
				type: 'setRoute',
				payload: {
					distance: kms,
					minutes,
				},
			});

			console.log({ kms, minutes });

			const bounds = new LngLatBounds(start, start);

			for (const coord of coords) {
				const newCoord: [number, number] = [coord[0], coord[1]];
				bounds.extend(newCoord);
			}

			state.map?.fitBounds(bounds, {
				padding: 200,
			});

			// Polyline
			const sourceData: AnySourceData = {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							properties: {},
							geometry: {
								type: 'LineString',
								coordinates: coords,
							},
						},
					],
				},
			};

			// Clean existing polyline
			if (state.map?.getLayer('RouteString')) {
				state.map.removeLayer('RouteString');
				state.map.removeSource('RouteString');
			}

			state.map?.addSource('RouteString', sourceData);

			state.map?.addLayer({
				id: 'RouteString',
				type: 'line',
				source: 'RouteString',
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					'line-color': 'white',
					'line-width': 3,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const cleanRoute = () => {
		dispatch({ type: 'cleanRoute' });
	};
	return (
		<MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints, cleanRoute }}>
			{children}
		</MapContext.Provider>
	);
};
