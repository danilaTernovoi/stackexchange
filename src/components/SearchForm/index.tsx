// @ts-nocheck
import { useEvent } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setSearch as setSearchEvent } from 'store';
import searchQuestions from 'api/searchQuestions';
import s from './style.module.css';
import Loader from 'components/Loader';

interface Props {}

const SearchForm = ({}: Props) => {
	const navigate = useNavigate();
	const setSearch = useEvent(setSearchEvent);
	const [query, setQuery] = useState('');
	const [loading, setLoading] = useState(false);

	async function sendSearchRequest() {
		setLoading(true);
		const { collection, hasMore } = await searchQuestions({ query });

		setSearch({ results: collection, lastQuery: query, hasMore });
		navigate('/search-results');
		setLoading(false);
	}

	return (
		<div className={s.outer}>
			<input
				value={query}
				placeholder='search query'
				className={s.input}
				type='text'
				onChange={event => {
					const { target } = event;
					setQuery(target.value);
				}}
			/>
			{loading ? (
				<Loader />
			) : (
				<button
					className={s.submitButton}
					onClick={sendSearchRequest}>
					search
				</button>
			)}
		</div>
	);
};

export default SearchForm;
