import { useEffect } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const useTestVinfo = () => {
	return {
		year: 2021,
		make: "Ford",
		model: "Escape"
	};
};

const Vinfo = () => {
	const vinfo = useTestVinfo();

	useEffect(() => {
		document.title = `${vinfo.year ? `${vinfo.year} • ` : ""}`;
	}, [vinfo]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Tab 1</IonTitle>
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

export default Vinfo;
