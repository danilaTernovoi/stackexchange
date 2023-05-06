// @ts-nocheck
import { useState, useRef, useEffect } from 'react';
import s from './style.module.css';

function Overlay({ children }) {
	return <div className={s.fullscreenContainer}>{children}</div>;
}

export default function Loader({ asOverlay = false }) {
	const [activeElementIndex, setActiveElementIndex] = useState(0);
	const intervalRef = useRef(null);

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setActiveElementIndex(prev => (prev === 8 ? 0 : prev + 1));
		}, 100);

		return () => clearInterval(intervalRef.current);
	}, []);

	if (asOverlay) {
		return (
			<Overlay>
				<div className={s.loader}>
					{Array(9)
						.fill(0)
						.map(({}, index) => {
							return (
								<div
									className={`${s.item} ${
										index === activeElementIndex ? s.item_active : ''
									}`}
									key={index}></div>
							);
						})}
				</div>
			</Overlay>
		);
	}

	return (
		<div className={s.loader}>
			{Array(9)
				.fill(0)
				.map(({}, index) => {
					return (
						<div
							className={`${s.item} ${
								index === activeElementIndex ? s.item_active : ''
							}`}
							key={index}></div>
					);
				})}
		</div>
	);
}
