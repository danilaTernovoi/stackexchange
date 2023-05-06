// @ts-nocheck
import searchQuestions from 'api/searchQuestions';
import { useState } from 'react';
import { useStore, useEvent } from 'effector-react';
import { $search, setSearch as setSearchEvent } from 'store';

export default function useSearchQuestions() {
	const { results, lastQuery, hasMore } = useStore($search);
	const [activePage, setActivePage] = useState(1);
	const setSearch = useEvent(setSearchEvent);
	const [loading, setLoading] = useState(false);

	async function loadQuestionsPage(page) {
		if (hasMore) {
			setLoading(true);
			const { collection, hasMore } = await searchQuestions({
				query: lastQuery,
				page,
			});

			setSearch({ results: collection, hasMore });
			setActivePage(page);
			window.scrollTo(0, 0);
			setLoading(false);
		}
	}

	return {
		results,
		lastQuery,
		hasMore,
		activePage,
		loading,
		setActivePage,
		setSearch,
		loadQuestionsPage,
	};
}
