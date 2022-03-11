import { useEffect } from "react";
import { useAppLocation, usePage } from "../../Config";
import { useVinfo } from "./Hooks";
import { Enums } from "../../utils";

import { IonLoading } from "@ionic/react";
import { Desktop, Mobile } from "./components";

export const Vinfo = (page: APP.Route) => {
	const location = useAppLocation(page);
	const { loading, data } = useVinfo(location);
	const { setTitle } = usePage(page);

	useEffect(() => {
		const item = data?.inventory;
		setTitle(`${item.year} ${item.make} ${item.model}`);
	}, [setTitle, data]);

	const isDesktop = page.viewType === Enums.AppViewType.desktop;
	const vinfo: VINFO.Page = { vinfo: { ...data }, viewType: page.viewType };

	if (loading) return <IonLoading isOpen={loading} />;
	return <div id="Vinfo">{isDesktop ? <Desktop {...vinfo} /> : <Mobile {...vinfo} />}</div>;
};
