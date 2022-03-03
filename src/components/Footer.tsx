import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";
import { AppViewType } from "../AppConfig";

interface AppFooter {
	viewType: AppViewType;
}

export const AppFooter = ({ viewType }: AppFooter) => {
	console.log(viewType);
	return (
		<IonFooter className="ion-no-border" collapse="fade">
			<IonToolbar>
				<IonTitle>Footer</IonTitle>
			</IonToolbar>
		</IonFooter>
	);
};
