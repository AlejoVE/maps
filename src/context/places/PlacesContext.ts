import { createContext } from "react";
import { Feature } from "../../interfaces/PlacesInterface";

export interface PlacesContextProps {
    isLoading: boolean,
    userLocation?: [number, number],
    searchPlacesByTerm: (query: string) => Promise<Feature[] | undefined>
    places: Feature[],
    isLoadingPlaces: boolean
}


export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
