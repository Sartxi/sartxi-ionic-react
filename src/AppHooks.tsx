// import pages
import { TestView } from "./pages/Test";

interface AppConfig {
	routes: AppRoute[];
}

export interface AppRoute {
	id: string;
	name: string;
	view: any;
}

export const useApp = (): AppConfig => {
	return {
		routes: [{ id: "test", name: "test", view: TestView }]
	};
};
