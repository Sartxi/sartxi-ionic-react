import { useEffect } from "react";
import { useAppLocation, usePage } from "../../AppConfig";
import { useTestData } from "./Hooks";
import { IonList, IonLoading } from "@ionic/react";

export const SampleView = (page: APP.Route) => {
	const location = useAppLocation(page);

	const { loading, data } = useTestData(location);
	const { setTitle } = usePage(page);

	useEffect(() => {
		setTitle("Funky soul brutha");
	}, [setTitle]);

	if (loading) return <IonLoading isOpen={loading} />;
	return (
		<div id="Sample">
			{data.map(i => (
				<IonList key={i}>{i} </IonList>
			))}
		</div>
	);
};
