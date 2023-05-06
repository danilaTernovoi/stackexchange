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

interface PopularQuestionFromAuthorProps {
	owner: Owner;
}

interface PopularQuestionByTagProps {
	tagName: string;
}

interface QuestionDetailProps {
	question_id: number;
}

function FullScreenLoader() {
	return <Loader asOverlay />;
}

export function PopularQuestionFromAuthor({
	owner,
}: PopularQuestionFromAuthorProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const { sortOptions, sortedResults, setFieldSort, toggleDesc } = useSort({
		source: data,
	});

	useEffect(() => {
		async function initLoading() {
			const questions = await fetchQuestionsFromAuthor(owner.user_id);

			setData(questions);
			setLoading(false);
		}

		initLoading();
	}, []);

	if (loading) {
		return <FullScreenLoader />;
	}

	return (
		<div className='column'>
			<div className='sortBox'>
				<button
					className='toggleDescButton'
					onClick={toggleDesc}>
					{sortOptions.isDesc ? 'desc' : 'asc'}
				</button>

				<select
					defaultValue={sortOptions.byField}
					onChange={({ target }) => setFieldSort(target.value)}>
					{fieldsToShow
						.filter(fieldName => fieldName !== 'tags')
						.map(fieldName => {
							return (
								<option
									key={fieldName}
									value={fieldName}>
									{fieldName.replaceAll('_', ' ')}
								</option>
							);
						})}
				</select>
			</div>

			<Table
				data={sortedResults}
				fieldsToShow={fieldsToShow}
				renderRow={({ Row, Cell, dataItem }) => {
					const { owner, title, answer_count, tags } = dataItem;

					return (
						<Row key={dataItem.question_id}>
							<Cell>{owner.display_name}</Cell>
							<Cell>{unescape(title)}</Cell>
							<Cell>{answer_count}</Cell>
							<Cell>
								{tags.map(tagName => (
									<div key={tagName}>{tagName}</div>
								))}
							</Cell>
						</Row>
					);
				}}
			/>
		</div>
	);
}

export function PopularQuestionByTag({ tagName }: PopularQuestionByTagProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const { sortOptions, sortedResults, setFieldSort, toggleDesc } = useSort({
		source: data,
	});

	useEffect(() => {
		async function initLoad() {
			const questions = await fetchQuestionsByTag(tagName);

			setData(questions);
			setLoading(false);
		}

		initLoad();
	}, []);

	if (loading) {
		return <FullScreenLoader />;
	}

	return (
		<div className='column'>
			<div className='sortBox'>
				<button
					className='toggleDescButton'
					onClick={toggleDesc}>
					{sortOptions.isDesc ? 'desc' : 'asc'}
				</button>

				<select
					defaultValue={sortOptions.byField}
					onChange={({ target }) => setFieldSort(target.value)}>
					{fieldsToShow
						.filter(fieldName => fieldName !== 'tags')
						.map(fieldName => {
							return (
								<option
									key={fieldName}
									value={fieldName}>
									{fieldName.replaceAll('_', ' ')}
								</option>
							);
						})}
				</select>
			</div>
			<Table
				data={sortedResults}
				fieldsToShow={['owner', 'title', 'answer count', 'tags']}
				renderRow={({ Row, Cell, dataItem }) => {
					const { owner, title, answer_count, tags } = dataItem;

					return (
						<Row key={dataItem.question_id}>
							<Cell>{owner.display_name}</Cell>
							<Cell>{unescape(title)}</Cell>
							<Cell>{answer_count}</Cell>
							<Cell>
								{tags.map(tagName => (
									<div key={tagName}>{tagName}</div>
								))}
							</Cell>
						</Row>
					);
				}}
			/>
		</div>
	);
}

export function QuestionDetail({ question_id }: QuestionDetailProps) {
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
