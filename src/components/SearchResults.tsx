import { useContext, useEffect, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import { LoadingPlaces } from './';
import { Feature } from '../interfaces/PlacesInterface';

export const SearchResults = () => {
	const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
	const { map, getRouteBetweenPoints, cleanRoute } = useContext(MapContext);
	const [activeId, setActiveId] = useState('');

	useEffect(() => {
		cleanRoute();
	}, [places]);

	const onPlaceClick = (place: Feature) => {
		setActiveId(place.id);
		const [lng, lat] = place.center;
		map?.flyTo({
			zoom: 17,
			center: [lng, lat],
		});
	};

	const getRoute = (place: Feature) => {
		if (!userLocation) return;

		const [lng, lat] = place.center;

		getRouteBetweenPoints(userLocation, [lng, lat]);
	};

	if (isLoadingPlaces) {
		return <LoadingPlaces />;
	}

	if (places.length === 0) {
		return <></>;
	}
	return (
		<ul className='list-group mt-2 '>
			{places.map((place) => (
				<li
					onClick={() => onPlaceClick(place)}
					key={place.id}
					className={`search-result list-group-item list-group-item-action pointer ${
						activeId === place.id ? 'active' : ''
					}`}
				>
					<h6 style={{ fontSize: '15px' }}>{place.text_en}</h6>
					<p
						style={{
							fontSize: '11px',
							margin: '8px 0px',
						}}
					>
						{place.place_name_en}
					</p>
					<button
						onClick={() => getRoute(place)}
						className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
					>
						Get direction
					</button>
				</li>
			))}
		</ul>
	);
};
