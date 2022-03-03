import { AppRoute, usePageTitle } from "../AppHooks";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

export const TestView = (page: AppRoute) => {
	usePageTitle(page, "Testing");
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Test App</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Tab 1</IonTitle>
					</IonToolbar>
				</IonHeader>
			</IonContent>
		</IonPage>
	);
};
