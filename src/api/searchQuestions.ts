// @ts-nocheck
export default async function searchQuestions({
	query,
	page = 1,
	pageSize = 10,
}) {
	const url = new URL(
		'https://api.stackexchange.com/2.3/search?order=desc&sort=activity&site=stackoverflow',
	);

	url.searchParams.set('intitle', query);
	url.searchParams.set('page', page);
	url.searchParams.set('pagesize', pageSize);

	try {
		const response = await fetch(url);
		const json = await response.json();

		return {
			collection: json.items,
			hasMore: json.has_more,
		};
	} catch (error) {
		return error;
	}
}
