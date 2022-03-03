// import pages
import { useCallback, useEffect, useState } from "react";
import { TestView } from "./pages/Test";

const useRoutes = () => {
	// Build your routes here
	return [{ id: "testing", name: "Sartxi Ionic React", path: "/test", view: TestView }];
};

interface AppConfig {
	routes: AppRoute[];
}

export enum AppViewType {
	mobile = "mobile",
	tablet = "tablet",
	desktop = "desktop"
}

export interface AppRoute {
	id: string;
	name: string;
	path: string;
	view: any;
}

export interface AppPageProps {
	viewType: AppViewType;
	setTitle: (title: string) => void;
}

export const useApp = (): AppConfig => {
	const routes = useRoutes();
	return { routes };
};

export const usePage = (page: AppRoute): AppPageProps => {
	const [viewType, setViewType] = useState(AppViewType.mobile);

	const selectViewType = useCallback(() => {
		const res = window.innerWidth;
		let type = AppViewType.mobile;
		if (res <= 768) type = AppViewType.mobile;
		else if (res >= 990) type = AppViewType.desktop;
		else type = AppViewType.tablet;
		setViewType(type);
	}, []);

	useEffect(() => {
		selectViewType();
	}, [page]);

	useEffect(() => {
		window.addEventListener("resize", selectViewType);
		return () => window.removeEventListener("resize", selectViewType);
	}, []);

	return {
		viewType,
		setTitle: title => (document.title = title)
	};
};
