// @ts-nocheck
import s from './style.module.css';
import { HTMLProps } from 'react';

interface CommonProps extends HTMLProps<HTMLDivElement> {}

function Cell({ children, ...restProps }: CommonProps) {
	return (
		<div
			role='cell'
			className={s.cell}
			{...restProps}>
			{children}
		</div>
	);
}

function Row({ children, ...restProps }: CommonProps) {
	return (
		<div
			role='row'
			className={s.row}
			{...restProps}>
			{children}
		</div>
	);
}

export default function Table({
	fieldsToShow,
	data,
	renderRow,
	children = null,
}) {
	return (
		<div
			className={s.outer}
			role='table'>
			{/* static */}
			<div className={`${s.row} ${s.head}`}>
				{fieldsToShow.map(fieldName => (
					<Cell key={fieldName}>{fieldName.replaceAll('_', ' ')}</Cell>
				))}
			</div>

			{/* fixed */}
			<div className={`${s.row} ${s.head} ${s.head_fixed}`}>
				{fieldsToShow.map(fieldName => (
					<Cell key={fieldName}>{fieldName.replaceAll('_', ' ')}</Cell>
				))}
			</div>

			{data.map((dataItem, index) => renderRow({ dataItem, Cell, Row, index }))}
		</div>
	);
}
