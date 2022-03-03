import { useEffect } from "react";
import { AppRoute, usePage } from "../AppConfig";
import { useTestData } from "./Hooks";
import { IonList, IonLoading } from "@ionic/react";

export const TestView = (page: AppRoute) => {
	const { loading, data } = useTestData();
	const { viewType, setTitle } = usePage(page);

	useEffect(() => {
		setTitle("Funky soul brutha");
	}, []);

	if (loading) return <IonLoading isOpen={loading} />;
	return (
		<div id="test">
			{data.map(i => (
				<IonList key={i}>{i} </IonList>
			))}
		</div>
	);
};
