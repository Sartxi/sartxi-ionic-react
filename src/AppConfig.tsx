import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getViewType } from "./utils/Layout";
import { AppViewType, VinfoType } from "./utils/Enums";
import { Vinfo } from "./pages/";

const useRoutes = () => {
	return [
		{ id: VinfoType.vin, name: "Vinfo®", path: "/vin/:id", view: Vinfo },
		{ id: VinfoType.lead, name: "Vinfo®", path: "/lead/:id", view: Vinfo }
	];
};

export const useApp = (): {
	routes: APP.Route[];
} => {
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
		type: page.id,
		token: page?.computedMatch?.params?.id ?? location.pathname,
		params: listParams(location.search)
	};
};
