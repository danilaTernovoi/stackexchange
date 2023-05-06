export default async function fetchQuestionsFromAuthor(userID: number) {
	const url = new URL(
		`https://api.stackexchange.com/2.3/users/${userID}/questions?order=desc&sort=activity&site=stackoverflow`,
	);
	const response = await fetch(url);
	const json = await response.json();

	return json.items;
}
