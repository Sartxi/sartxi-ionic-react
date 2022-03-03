import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

export const AppHeader = ({ title }: APP.Header) => {
	return (
		<IonHeader>
			<IonToolbar>
				<IonTitle>{title}</IonTitle>
			</IonToolbar>
		</IonHeader>
	);
};
