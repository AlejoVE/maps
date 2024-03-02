import { BtnLocation, MapView, ReactLogo, SearchBar } from '../components';
import { DirectionsBox } from '../components/DirectionsBox';
export const HomeScreen = () => {
	return (
		<div>
			<MapView />
			<BtnLocation />
			<DirectionsBox />
			<ReactLogo />
			<SearchBar />
		</div>
	);
};
