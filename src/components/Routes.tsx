import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { AppRoute } from "../AppConfig";
import { AppPage } from "./Page";

interface AppRoutesProps {
	routes: AppRoute[];
}

export const AppRoutes = ({ routes }: AppRoutesProps) => {
	return (
		<IonRouterOutlet>
			{routes.map(route => (
				<RenderRoute key={route.id} {...route} />
			))}
			<Route exact path="/">
				<Redirect to={routes[0].path} />
			</Route>
		</IonRouterOutlet>
	);
};

const RenderRoute = (route: AppRoute) => {
	return (
		<Route exact path={route.path}>
			<AppPage {...route} />
		</Route>
	);
};
