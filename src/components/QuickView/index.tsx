// @ts-nocheck
import { useEvent, useStore } from 'effector-react';
import { quickViewContent } from 'hooks/useQuickView';
import { $quickViewPanel, quickViewPanelChanged } from 'store';
import s from './style.module.css';

export default function QuickView() {
	const { visible } = useStore($quickViewPanel);
	const togglePanel = useEvent(quickViewPanelChanged);

	if (!visible) {
		return null;
	}

	return (
		<div className={s.quickView}>
			<div>{quickViewContent}</div>
			<button onClick={() => togglePanel(false)}>close</button>
		</div>
	);
}
