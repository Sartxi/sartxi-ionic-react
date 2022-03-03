import React from "react";
import { AppRoute } from "../AppHooks";
import { AppHeader } from "./Header";
import { AppFooter } from "./Footer";
import { IonContent, IonPage } from "@ionic/react";

export const AppPage = (page: AppRoute) => {
	return (
		<IonPage>
			<AppHeader title={page.name} />
			<IonContent fullscreen>{React.createElement(page.view, page)}</IonContent>
			<AppFooter />
		</IonPage>
	);
};
