import { AppViewType } from "./Enums";
export {};
declare global {
	namespace APP {
		interface Route {
			id: string;
			name: string;
			path: string;
			view: any;
		}
		interface Page {
			viewType: AppViewType;
			setTitle: (title: string) => void;
		}
		interface Routes {
			routes: Route[];
		}
		interface Location {
			token: string;
			params: any;
		}
		interface Header {
			title: string;
			viewType: AppViewType;
		}
		interface Footer {
			viewType: AppViewType;
		}
	}
}
