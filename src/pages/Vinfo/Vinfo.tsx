import { useEffect } from "react";
import { useAppLocation, usePage } from "../../AppConfig";
import { useVinfo } from "./Hooks";
import { IonLoading } from "@ionic/react";
import { AppViewType } from "../../utils/Enums";

export const Vinfo = (page: APP.Route) => {
	const location = useAppLocation(page);
	const { loading, data } = useVinfo(location);
	const { setTitle } = usePage(page);

	useEffect(() => {
		const item = data?.inventory;
		setTitle(`${item.year} ${item.make} ${item.model}`);
	}, [setTitle, data]);

	const isDesktop = page.viewType === AppViewType.desktop;
	if (loading) return <IonLoading isOpen={loading} />;
	return <div id="Sample">Sample</div>;
};
