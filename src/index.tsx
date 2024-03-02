/* eslint import/no-webpack-loader-syntax: off */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

// @ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlam92ZSIsImEiOiJjbDQ5dnd3M3gxNjhwM2ttczM5ejRscWFmIn0.IeaQA2qFgl_KDxQ2tQcICw';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

if (!navigator.geolocation) {
	alert('Your navigator does not have geolocation');
	throw new Error('Your navigator does not have geolocation');
}

root.render(
	<React.StrictMode>
		<MapsApp />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
