// @ts-nocheck
import { useEvent } from 'effector-react';
import { quickViewPanelChanged } from 'store';

export let quickViewContent = null;
export default function useQuickView() {
	const togglePanel = useEvent(quickViewPanelChanged);

	function show(renderContent) {
		quickViewContent = renderContent();
		togglePanel(true);
	}

	function hide() {
		return () => {
			quickViewContent = null;
			togglePanel(false);
		};
	}

	return { show, hide };
}
