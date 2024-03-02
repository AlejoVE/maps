import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
	const debounceRef = useRef<NodeJS.Timeout>();

	const { searchPlacesByTerm } = useContext(PlacesContext);

	const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			searchPlacesByTerm(event.target.value);
		}, 350);
	};
	return (
		<div className='search-container'>
			<input
				onChange={(e) => onQueryChange(e)}
				className='form-control'
				type='text'
				placeholder='Search for a place...'
			/>
			<SearchResults />
		</div>
	);
};
