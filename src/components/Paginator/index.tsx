// @ts-nocheck
import s from './style.module.css';

interface Props {}

const Paginator = ({ activePage, onChange }) => {
	function prevPage() {
		if (activePage > 1) {
			onChange(activePage - 1);
		}
	}

	function nextPage() {
		if (activePage < 5) {
			onChange(activePage + 1);
		}
	}

	return (
		<div className={s.wrapper}>
			<button
				className={s.navButton}
				onClick={prevPage}
				disabled={!(activePage > 1)}>
				&#8592;
			</button>

			{/* <div className={s.pageGroup}>
				{Array(pageWidgetsCount)
					.fill(0)
					.map((_, index) => {
						const pageNumber = index + 1;
						const isActive = pageNumber === activePage;

						let className = s.pageItem;

						if (isActive) className += ` ${s.pageItem_active}`;

						return (
							<div
								onClick={() => onChange(pageNumber)}
								className={className}
								key={index}>
								{index + 1}
							</div>
						);
					})}
			</div> */}

			<button
				className={s.navButton}
				onClick={nextPage}
				disabled={!(activePage < 5)}>
				&#8594;
			</button>
		</div>
	);
};

export default Paginator;
