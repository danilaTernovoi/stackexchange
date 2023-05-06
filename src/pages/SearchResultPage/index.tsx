// @ts-nocheck
import Table from 'components/Table';
import { useNavigate } from 'react-router-dom';
import { unescape } from 'lodash';
import Paginator from 'components/Paginator';
import useSort from 'hooks/useSort';
import useSearchQuestions from 'hooks/useSearchQuestions';
import Loader from 'components/Loader';
import { fieldsToShow } from 'constants';
import s from './style.module.css';
import useQuickView from 'hooks/useQuickView';
import { PopularQuestionByTag, PopularQuestionFromAuthor } from './views';

function SortBox({ toggleDesc, sortOptions, setFieldSort, fieldsToShow }) {
	return (
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
	);
}

export default function SearchResultPage() {
	const navigate = useNavigate();
	const { hasMore, results, activePage, loading, loadQuestionsPage } =
		useSearchQuestions();

	const { sortOptions, sortedResults, setFieldSort, toggleDesc } = useSort({
		source: results,
	});

	const { show } = useQuickView();

	// быстрое отображение, вопросы от автора
	function showPopularQuestionByAuthor(owner) {
		show(() => <PopularQuestionFromAuthor owner={owner} />);
	}

	// быстрое отображение, вопросы по тегу
	function showQuestionsByTag(tagName) {
		show(() => <PopularQuestionByTag tagName={tagName} />);
	}

	// ответы на вопрос, отдельная страница
	function showQuestionDetail(question_id) {
		navigate('/quick-display', {
			state: {
				viewType: 'questionDetail',
				viewProps: { question_id },
			},
		});
	}

	function renderRow({ dataItem: question, Cell, Row }) {
		const { title, owner, question_id, tags, answer_count } = question;

		return (
			<Row key={title}>
				<Cell onClick={() => showPopularQuestionByAuthor(owner)}>
					<span
						tabIndex={1}
						className='focus'>
						{owner.display_name}
					</span>
				</Cell>

				<Cell onClick={() => showQuestionDetail(question_id)}>
					<span
						tabIndex={1}
						className='focus'>
						{unescape(title)}
					</span>
				</Cell>

				<Cell onClick={() => showQuestionDetail(question_id)}>
					<span
						tabIndex={1}
						className='focus'>
						{answer_count}
					</span>
				</Cell>
				<Cell>
					<dl>
						{tags.map(tagName => (
							<li
								key={tagName}
								onClick={() => showQuestionsByTag(tagName)}>
								<span
									className='focus'
									tabIndex={1}>
									{tagName}
								</span>
							</li>
						))}
					</dl>
				</Cell>
			</Row>
		);
	}

	return (
		<>
			<Table
				data={sortedResults}
				fieldsToShow={fieldsToShow}
				renderRow={renderRow}>
				<SortBox
					{...{
						fieldsToShow,
						sortOptions,
						toggleDesc,
						setFieldSort,
					}}
				/>
			</Table>

			<footer className={s.footer}>
				<div className={s.footerBody}>
					{loading ? (
						<Loader />
					) : (
						<Paginator
							activePage={activePage}
							onChange={loadQuestionsPage}
						/>
					)}
				</div>
			</footer>
		</>
	);
}
