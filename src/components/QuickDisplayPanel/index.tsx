// @ts-nocheck
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { unescape } from 'lodash';
import fetchAnswers from 'api/fetchAnswers';
import fetchQuestionsByTag from 'api/fetchQuestionsByTag';
import fetchQuestionsFromAuthor from 'api/fetchQuestionsFromAuthor';
import Table from 'components/Table';
import RawHTML from 'components/RawHTML';
import Loader from 'components/Loader';
import s from './style.module.css';
import useSort from 'hooks/useSort';
import { fieldsToShow } from '../../constants';
import { type Owner } from 'types';

interface QuestionDetailProps {
	question_id: number;
}

function FullScreenLoader() {
	return <Loader asOverlay />;
}

function QuestionDetail({ question_id }: QuestionDetailProps) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function initLoad() {
			setLoading(true);
			const answers = await fetchAnswers(question_id);

			setData(answers.items);
			setLoading(false);
		}

		initLoad();
	}, []);

	if (loading) return <FullScreenLoader />;

	return (
		<div className={s.answersColumn}>
			{data.map(({ answer_id, body, title }) => (
				<div
					key={answer_id}
					className={s.answer}>
					<h1>for question: {unescape(title)}</h1>
					<RawHTML html={body} />
				</div>
			))}
		</div>
	);
}

// FIXME: ВЫНЕСТИ QuestionDetail КАК ОТДЕЛЬНУЮ СТРАНИЦУ
const viewDataRelationMap = {
	questionDetail: QuestionDetail,
};

export default function QuickDisplayPanel() {
	const navigate = useNavigate();
	const {
		state: { viewType, viewProps },
	} = useLocation();

	const View = viewDataRelationMap[viewType];

	return (
		<div className={s.outer}>
			<button
				className={s.toBackButton}
				onClick={() => navigate(-1)}>
				back
			</button>

			<View {...viewProps} />
		</div>
	);
}
