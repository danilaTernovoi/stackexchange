export default async function fetchQuestionsByTag(tagName: string) {
	const url = new URL(
		`https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow`,
	);

	url.searchParams.set('tagged', tagName);
	const response = await fetch(url);
	const json = await response.json();
	return json.items;
}
