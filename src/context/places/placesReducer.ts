import { Feature } from "../../interfaces/PlacesInterface";
import { PlacesState } from "./PlacesProvider";

type PlacesActions =
    | { type: 'setUserLocation', payload: [number, number] }
    | { type: 'SetPlaces', payload: Feature[] }
    | { type: 'setLoadingPlaces' }

export const placesReducer = (state: PlacesState, action: PlacesActions): PlacesState => {

    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: true,
                places: []
            }
        case 'SetPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }

        default:
            return state;
    }
}