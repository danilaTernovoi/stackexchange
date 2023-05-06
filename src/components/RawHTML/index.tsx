import { useEffect, useRef } from 'react';
import s from './style.module.css';

interface Props {
	html: string;
}

export default function RawHTML({ html }: Props) {
	const contentElementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const { current: contentElement } = contentElementRef;

		if (contentElement) {
			contentElement.innerHTML = html;
		}
	}, []);

	return (
		<div
			className={s.htmlView}
			ref={contentElementRef}></div>
	);
}
