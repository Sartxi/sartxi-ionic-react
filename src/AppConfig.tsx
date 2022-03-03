import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getViewType } from "./utils/Layout";
import { AppViewType } from "./utils/Enums";

// import pages
import { Sample, SampleStatic } from "./pages/";

const useRoutes = () => {
	// Build your routes here
	return [
		{ id: "sample", name: "Sartxi Ionic", path: "/sa-ionic/:id", view: Sample },
		{ id: "samplestatic", name: "Sartxi Ionic", path: "/sa-ionic-static", view: SampleStatic }
	];
};

interface AppConfig {
	routes: APP.Route[];
}

export const useApp = (): AppConfig => {
	const routes = useRoutes();
	return { routes };
};

export const usePage = (page: APP.Route): APP.Page => {
	const [viewType, setViewType] = useState(AppViewType.mobile);

	const selectViewType = useCallback(() => {
		setViewType(getViewType());
	}, []);

	useEffect(() => {
		selectViewType();
	}, [page, selectViewType]);

	useEffect(() => {
		window.addEventListener("resize", selectViewType);
		return () => window.removeEventListener("resize", selectViewType);
	}, [selectViewType]);

	const setTitle = (title: string) => (document.title = title);

	return { viewType, setTitle };
};

export const useAppLocation = (page: any): APP.Location => {
	const location = useLocation();
	const listParams = (searchParams: any) => {
		const search = searchParams.substring(1);
		const list = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
		return list;
	};
	return {
		token: page?.computedMatch?.params?.id ?? location.pathname,
		params: listParams(location.search)
	};
};
