import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { AppPage } from "../components/Page";

export const AppRoutes = ({ routes }: APP.Routes) => {
	return (
		<IonRouterOutlet>
			{routes.map(route => (
				<RenderRoute key={route.id} {...route} />
			))}
			<Route exact path="/">
				<Redirect to="/" />
			</Route>
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
