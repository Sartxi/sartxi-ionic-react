import { useEffect } from "react";
import { useLoc, usePage } from "../../Config";
import { useVinfoRest } from "./Hooks";
import { Layout } from "../../utils";

import { IonLoading } from "@ionic/react";
import { Layouts } from "./Layouts";

export const Vinfo = (page: APP.Route) => {
	const location = useLoc(page);
	const { loading, data, error, refetch } = useVinfoRest(location);
	const { settitle, viewType } = usePage(page);

	useEffect(() => {
		const item = data?.inventory;
		if (item) settitle(`${item.year} ${item.make} ${item.model}`);
	}, [settitle, data]);

	if (error) return <span>{error}</span>;

	if (!loading && data) {
		return (
			<div id="Vinfo" className={Layout.VinfoBlock(viewType)}>
				<Layouts {...{ vinfo: { ...data, refetch }, viewType }} />
			</div>
		);
	} return <IonLoading isOpen={loading} />;
};
