import { useEffect } from "react";
import { useLoc, usePage } from "../../Config";
import { useVinfo } from "./Hooks";
import { Helpers } from "../../utils";

import { IonLoading } from "@ionic/react";
import { Layout } from "./Layout";

import "../../theme/vinfo.scss";

export const Vinfo = (page: APP.Route) => {
	const location = useLoc(page);
	const { loading, data } = useVinfo(location);
	const { setTitle, viewType } = usePage(page);

	useEffect(() => {
		const item = data?.inventory;
		setTitle(`${item.year} ${item.make} ${item.model}`);
	}, [setTitle, data]);

	if (loading) return <IonLoading isOpen={loading} />;
	return (
		<div id="Vinfo" className={Helpers.vinfoBlock(viewType)}>
			<Layout {...{ vinfo: { ...data }, viewType }} />
		</div>
	);
};
