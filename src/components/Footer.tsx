import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";

export const AppFooter = ({ viewType }: APP.Footer) => {
	// console.log(viewType);
	return (
		<IonFooter className="ion-no-border" collapse="fade">
			<IonToolbar>
				<IonTitle>Footer</IonTitle>
			</IonToolbar>
		</IonFooter>
	);
};
