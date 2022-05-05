import React from "react";
import { usePage } from "../Config";
import { IonContent, IonPage } from "@ionic/react";

import "./Components.scss";

export const AppPage = (page: APP.Route) => {
	const { viewType } = usePage(page);
	return (
		<IonPage>
			<IonContent scrollY={false}>{React.createElement(page.view, { ...page, viewType })}</IonContent>
		</IonPage>
	);
};
