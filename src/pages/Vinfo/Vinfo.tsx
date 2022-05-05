import { useEffect } from "react";
import { useLoc, usePage } from "../../Config";
import { useVinfo } from "./Hooks";
import { Layout } from "../../utils";

import { IonLoading } from "@ionic/react";
import { Layouts } from "./Layouts";

export const Vinfo = (page: APP.Route) => {
	const location = useLoc(page);
	const { loading, data } = useVinfo(location);
	const { settitle, viewType } = usePage(page);

	useEffect(() => {
		const item = data?.inventory;
		settitle(`${item.year} ${item.make} ${item.model}`);
	}, [settitle, data]);

	if (loading) return <IonLoading isOpen={loading} />;
	return (
		<div id="Vinfo" className={Layout.VinfoBlock(viewType)}>
			<Layouts {...{ vinfo: { ...data }, viewType }} />
		</div>
	);
};
