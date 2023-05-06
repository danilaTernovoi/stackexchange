// @ts-nocheck
import { createEvent, createStore } from 'effector';

export const $store = createStore({
	showQuickPanel: false,
	quickPanelView: {
		type: 'byTag',
	},
});

export const toggleQuickPanel = createEvent();
$store.on(toggleQuickPanel, prev => ({
	...prev,
	showQuickPanel: !prev.showQuickPanel,
}));

export const setQuickPanelType = createEvent();
$store.on(setQuickPanelType, (prev, { viewType }) => ({
	...prev,
	quickPanelView: {
		type: viewType,
	},
}));

export const setSearch = createEvent();
export const $search = createStore({
	results: null,
	error: null,
	lastQuery: '',
});

$search.on(setSearch, (prev, toMergeValue) => ({
	...prev,
	...toMergeValue,
}));

// quick view
export const $quickViewPanel = createStore({
	visible: false,
});

export const quickViewPanelChanged = createEvent();
$quickViewPanel.on(quickViewPanelChanged, (state, flag = null) => ({
	...state,
	visible: flag === null ? !state.visible : flag,
}));
