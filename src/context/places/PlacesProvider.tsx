import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../apis';
import { Feature, PlacesResponse } from '../../interfaces/PlacesInterface';

export interface PlacesState {
	isLoading: boolean;
	userLocation?: [number, number];
	isLoadingPlaces: boolean;
	places: Feature[];
}

const INITIAL_STATE: PlacesState = {
	isLoading: true,
	userLocation: undefined,
	isLoadingPlaces: false,
	places: [],
};

interface Props {
	children: JSX.Element | JSX.Element[];
}
export const PlacesProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

	useEffect(() => {
		getUserLocation().then((coords) => dispatch({ type: 'setUserLocation', payload: coords }));
	}, []);

	const searchPlacesByTerm = async (query: string): Promise<Feature[] | undefined> => {
		if (query.length === 0) {
			dispatch({ type: 'SetPlaces', payload: [] });
			return [];
		}
		if (!state.userLocation) throw new Error('User location not found');

		dispatch({ type: 'setLoadingPlaces' });

		try {
			const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
				params: {
					proximity: state.userLocation.join(','),
				},
			});

			dispatch({ type: 'SetPlaces', payload: resp.data.features });

			return resp.data.features;
		} catch (error) {
			console.log(error);
		}
	};

	return <PlacesContext.Provider value={{ ...state, searchPlacesByTerm }}>{children}</PlacesContext.Provider>;
};
