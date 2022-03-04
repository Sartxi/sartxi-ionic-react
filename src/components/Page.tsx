import React from "react";
import { usePage } from "../AppConfig";
import { AppFooter } from "./Footer";
import { IonContent, IonPage } from "@ionic/react";

export const AppPage = (page: APP.Route) => {
	const { viewType } = usePage(page);
	return (
		<IonPage>
			<IonContent>{React.createElement(page.view, { ...page, viewType })}</IonContent>
			<AppFooter viewType={viewType} />
		</IonPage>
	);
};
