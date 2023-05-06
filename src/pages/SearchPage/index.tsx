import SearchForm from 'components/SearchForm';
import s from './style.module.css';

export default function SearchPage() {
	return (
		<div className={s.outer}>
			<SearchForm />
		</div>
	);
}
