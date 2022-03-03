// import pages
import { TestView } from "./pages/Test";

interface AppConfig {
	routes: AppRoute[];
}

export interface AppRoute {
	id: string;
	name: string;
	path: string;
	view: any;
	setTitle?: (title: string) => void;
}

export const useApp = (): AppConfig => {
	return {
		routes: [{ id: "test", name: "test", view: TestView, path: "/test" }]
	};
};

export const usePageTitle = ({ setTitle, name }: AppRoute, title: string) => {
	if (setTitle) setTitle(title ? title : name);
	else document.title = name;
};
