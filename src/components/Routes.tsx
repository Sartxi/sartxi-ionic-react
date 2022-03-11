import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { App404, AppPage } from ".";
import { VinSearch } from "../pages";

export const AppRoutes = ({ routes }: APP.Routes) => {
	return (
		<IonRouterOutlet>
			<Route path="*" exact={true} component={App404} />
			{routes.map(route => (
				<RenderRoute key={route.id} {...route} />
			))}
			<Route exact path="/" component={VinSearch} />
		</IonRouterOutlet>
	);
};

const RenderRoute = (route: APP.Route) => {
	return (
		<Route exact path={route.path}>
			<AppPage {...route} />
		</Route>
	);
};
