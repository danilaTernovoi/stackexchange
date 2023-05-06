export default async function fetchAnswers(questionID: number) {
	const url = new URL(
		`https://api.stackexchange.com/2.3/questions/${questionID}/answers?order=desc&sort=activity&site=stackoverflow&filter=!6Wfm_gUdxFeTe`,
	);
	const response = await fetch(url);
	const json = await response.json();

	return json;
}
