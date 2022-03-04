import { useEffect } from "react";
import { useAppLocation, usePage } from "../../AppConfig";
import { useVinfo } from "./Hooks";
import { IonLoading } from "@ionic/react";

export const Vinfo = (page: APP.Route) => {
	const location = useAppLocation(page);
	const { loading, data } = useVinfo(location);
	const { setTitle } = usePage(page);

	console.log(data);

	useEffect(() => {
		setTitle("Funky soul brutha");
	}, [setTitle, data]);

	if (loading) return <IonLoading isOpen={loading} />;
	return <div id="Sample">Sample</div>;
};
