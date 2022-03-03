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
			{routes.map(route => {
				return (
					<Route exact path={`/${route.id}`}>
						{React.createElement(route.view, { ...route })}
					</Route>
				);
			})}
			<Route exact path="/">
				<Redirect to={`/${routes[0].id}`} />
			</Route>
		</IonRouterOutlet>
	);
};
