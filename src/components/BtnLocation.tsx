import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const BtnLocation = () => {
	const { isMapReady, map } = useContext(MapContext);
	const { userLocation } = useContext(PlacesContext);

	const onClick = () => {
		if (!isMapReady) throw new Error('Map is not ready');
		if (!userLocation) throw new Error('User location not found');

		map?.flyTo({
			zoom: 14,
			center: userLocation,
		});
	};

	return (
		<button
			className='btn btn-primary'
			onClick={onClick}
			style={{
				position: 'fixed',
				top: '20px',
				right: '20px',
				zIndex: 999,
			}}
		>
			My Location
		</button>
	);
};
