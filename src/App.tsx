// @ts-nocheck
import { SearchPage, SearchResultPage } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import QuickDisplayPanel from 'components/QuickDisplayPanel';
import Sandbox from 'pages/Sandbox';
import QuickView from 'components/QuickView';

export default function App() {
	return (
		<>
			<QuickView />
			<Routes>
				<Route
					path='/sandbox'
					element={<Sandbox />}
				/>
				<Route
					path='/search'
					element={<SearchPage />}
				/>
				<Route
					path='/search-results'
					element={<SearchResultPage />}
				/>
				<Route
					path='/quick-display'
					element={<QuickDisplayPanel />}
				/>
				<Route
					path='*'
					element={
						<Navigate
							to='/search'
							replace
						/>
					}
				/>
			</Routes>
		</>
	);
}

