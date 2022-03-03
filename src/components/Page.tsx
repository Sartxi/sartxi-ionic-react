import React from "react";
import { usePage } from "../AppConfig";
import { AppHeader } from "./Header";
import { AppFooter } from "./Footer";
import { IonContent, IonPage } from "@ionic/react";

export const AppPage = (page: APP.Route) => {
	const { viewType } = usePage(page);
	return (
		<IonPage>
			<AppHeader title={page.name} viewType={viewType} />
			<IonContent>{React.createElement(page.view, { ...page, viewType })}</IonContent>
			<AppFooter viewType={viewType} />
		</IonPage>
	);
};
