import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";
import { AppViewType } from "../utils/Enums";

export const AppFooter = ({ viewType }: APP.Footer) => {
	// console.log(viewType);
	if (viewType === AppViewType.desktop) return <span />;
	return (
		<IonFooter className="ion-no-border" collapse="fade">
			<IonToolbar>
				<IonTitle>Footer</IonTitle>
			</IonToolbar>
		</IonFooter>
	);
};
