import React from "react";
import { AppRoute, usePage } from "../AppConfig";
import { AppHeader } from "./Header";
import { AppFooter } from "./Footer";
import { IonContent, IonPage } from "@ionic/react";

export const AppPage = (page: AppRoute) => {
	const { viewType } = usePage(page);
	return (
		<IonPage>
			<AppHeader title={page.name} viewType={viewType} />
			<IonContent fullscreen>{React.createElement(page.view, page)}</IonContent>
			<AppFooter viewType={viewType} />
		</IonPage>
	);
};
