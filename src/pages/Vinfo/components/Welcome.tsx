import { IonHeader } from "@ionic/react";

export const Welcome = ({ vinfo }: VINFO.Page) => {
	return (
		<div className="welcome">
			<span></span>
			<IonHeader>Good Day, {vinfo.share.customer_name}</IonHeader>
		</div>
	);
};
