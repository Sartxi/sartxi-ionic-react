import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Enums, Layout, Helpers } from "./utils";
import { useWindowResize } from "./utils/Hooks";

import { Vinfo } from "./pages/";

export const useApp = (): APP.App => {
	const routes = (Object.keys(Enums.VinfoType) as Array<keyof typeof Enums.VinfoType>).map(id => ({ id, name: Helpers.vinfo, path: `/${id}/:id`, view: Vinfo }));
	return { routes };
};

export const usePage = (page: APP.Route): APP.Page => {
	const [viewType, setViewType] = useState(Enums.AppViewType.mobile);

	const selectViewType = useCallback(() => {
		setViewType(Layout.getViewType());
	}, []);

	useWindowResize(selectViewType);
	useEffect(() => {
		selectViewType();
	}, [page, selectViewType]);


	const setTitle = (title: string) => (document.title = title);
	return { viewType, setTitle };
};

export const useAppLocation = (page: any): APP.Location => {
	const location = useLocation();
	return {
		type: page.id,
		token: page?.computedMatch?.params?.id ?? location.pathname,
		params: Helpers.fetchParams(location.search)
	};
};
