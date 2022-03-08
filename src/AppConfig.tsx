import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Enums, Layout, Helpers } from "./utils";

import { Vinfo } from "./pages/";

export const useApp = (): APP.App => {
	return {
		routes: [
			{ id: Enums.VinfoType.vin, name: "Vinfo®", path: "/vin/:id", view: Vinfo },
			{ id: Enums.VinfoType.lead, name: "Vinfo®", path: "/lead/:id", view: Vinfo }
		]
	};
};

export const usePage = (page: APP.Route): APP.Page => {
	const [viewType, setViewType] = useState(Enums.AppViewType.mobile);

	const selectViewType = useCallback(() => {
		setViewType(Layout.getViewType());
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
	return {
		type: page.id,
		token: page?.computedMatch?.params?.id ?? location.pathname,
		params: Helpers.fetchParams(location.search)
	};
};
