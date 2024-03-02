import { useContext } from 'react';
import { MapContext } from '../context/maps/MapContext';
import { PlacesContext } from '../context';

export const DirectionsBox = () => {
	const { route } = useContext(MapContext);
	const { places } = useContext(PlacesContext);

	if (places.length > 0 && route) {
		return (
			<div
				style={{
					position: 'fixed',
					top: '70px',
					right: '20px',
					width: '200px',
					backgroundColor: 'whitesmoke',
				}}
				className='container pt-3 pb-3 rounded text-center'
			>
				<label className='h5'>Distance: {route.distance} km</label>
				<label className='h5'>Time: {route.minutes} minutes</label>
			</div>
		);
	}
	return <></>;
};
