import { AppViewType } from "../AppConfig";
import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

export interface AppHeader {
	title: string;
	viewType: AppViewType;
}

export const AppHeader = ({ title }: AppHeader) => {
	return (
		<IonHeader>
			<IonToolbar>
				<IonTitle>{title}</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};
