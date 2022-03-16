import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Enums, Layout, Helpers } from "./utils";
import { useWindowResize } from "./utils/Hooks";

import { Vinfo } from "./pages";

export const useApp = (): APP.App => {
	const vinfo = (Object.keys(Enums.VinfoType) as Array<keyof typeof Enums.VinfoType>).map(id => ({ id, name: Helpers.vinfo, path: `/${id}/:id`, view: Vinfo }));
	return { routes: vinfo };
};

export const usePage = (page: APP.Route): APP.Page => {
	const [viewType, setViewType] = useState(Enums.AppViewType.mobile);
	const selectViewType = useCallback(() => setViewType(Layout.getViewType()), []);

	useEffect(() => selectViewType(), [page, selectViewType]);
	useWindowResize(selectViewType);

	return { viewType, setTitle: (title: string) => (document.title = title) };
};

export const useLoc = (page: any): APP.Location => {
	const location = useLocation();
	return {
		type: page.id,
		token: page?.computedMatch?.params?.id ?? location.pathname,
		params: Helpers.fetchParams(location.search)
	};
};
