import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Vinfo from "../pages/Vinfo/Vinfo";

// configure any new stuff about routes here
interface VinfoRoutes {
	id: string;
	name: string;
	view: any;
}

const useRoutes = (): VinfoRoutes[] => {
	return [
		{
			name: "Vinfo",
			id: "vinfo",
			view: Vinfo
		}
	];
};

export const VinfoRoutes: React.FC = () => {
	const routes = useRoutes();
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
