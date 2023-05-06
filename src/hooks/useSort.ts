// @ts-nocheck
import { useState } from 'react';

export default function useSort({ source }) {
	const [sortOptions, setSortOptions] = useState({
		isDesc: true,
		byField: 'answers',
	});

	const sortCallbacks = {
		author(next, prev) {
			const { isDesc } = sortOptions;

			if (prev.owner.display_name > next.owner.display_name) {
				return isDesc ? 1 : -1;
			}

			return isDesc ? -1 : 1;
		},

		theme(next, prev) {
			const { isDesc } = sortOptions;
			if (prev.title > next.title) {
				return isDesc ? 1 : -1;
			}

			return isDesc ? -1 : 1;
		},

		answers(next, prev) {
			const { isDesc } = sortOptions;
			if (prev.answer_count > next.answer_count) {
				return isDesc ? 1 : -1;
			}

			return isDesc ? -1 : 1;
		},
	};

	function setFieldSort(fieldName) {
		setSortOptions(prev => ({ ...prev, byField: fieldName }));
	}

	function toggleDesc() {
		setSortOptions(prev => ({ ...prev, isDesc: !prev.isDesc }));
	}

	const sortedResults = [...source].sort(sortCallbacks[sortOptions.byField]);

	return {
		sortOptions,
		sortCallbacks,
		sortedResults,
		setFieldSort,
		toggleDesc,
	};
}
