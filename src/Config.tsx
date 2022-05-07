import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Layout, Helpers, ENUMS } from "./utils";
import { useWindowResize } from "./utils/Hooks";
import { Vinfo } from "./pages";

export const useApp = (): APP.App => {
	const types: any[] = Helpers.arrayFromEnum(ENUMS.VinfoType);
	const vinfo = types.map(id => ({ id, name: Helpers.vinfo, path: `/${id}/:id`, view: Vinfo }));
	return { routes: vinfo };
};

export const usePage = (page: APP.Route): APP.Page => {
	const [viewType, setViewType] = useState(ENUMS.AppViewType.mobile);
	const selectViewType = useCallback(() => setViewType(Layout.ViewType()), []);

	useEffect(() => selectViewType(), [page, selectViewType]);
	useWindowResize(selectViewType);

	return { viewType, settitle: (title: string) => (document.title = title) };
};

export const useLoc = (page: any): APP.Location => {
	const location = useLocation();	
	return {
		type: page.id,
		token: page?.computedMatch?.params?.id ?? location.pathname,
		params: Helpers.parseParams(location.search)
	};
};

export const menuEventActions = [ENUMS.VinfoMenuPosition.left, ENUMS.VinfoMenuPosition.right];
