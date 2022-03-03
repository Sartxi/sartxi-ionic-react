import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { AppRoute } from "../AppHooks";

interface AppRoutesProps {
	routes: AppRoute[];
}

export const AppRoutes = ({ routes }: AppRoutesProps) => {
	return (
		<IonRouterOutlet>
			{routes.map(route => (
				<RenderRoute {...route} />
			))}
			<Route exact path="/">
				<Redirect to={routes[0].path} />
			</Route>
		</IonRouterOutlet>
	);
};

const RenderRoute = (route: AppRoute) => {
	const routeProps: AppRoute = {
		...route,
		setTitle: (title: string) => (document.title = title)
	};
	return (
		<Route exact path={route.path}>
			{React.createElement(route.view, routeProps)}
		</Route>
	);
};
