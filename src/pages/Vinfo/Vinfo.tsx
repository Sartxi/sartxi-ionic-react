import { useEffect } from "react";
import { useAppLocation, usePage } from "../../AppConfig";
import { useVinfo } from "./Hooks";
import { IonCol, IonGrid, IonLoading, IonRow } from "@ionic/react";
import { Enums } from "../../utils";
import { Welcome, Menu, Inventory, Documents } from "./components";

export const Vinfo = (page: APP.Route) => {
	const location = useAppLocation(page);
	const { loading, data } = useVinfo(location);
	const { setTitle } = usePage(page);

	useEffect(() => {
		const item = data?.inventory;
		setTitle(`${item.year} ${item.make} ${item.model}`);
	}, [setTitle, data]);

	const isDesktop = page.viewType === Enums.AppViewType.desktop;
	const vinfo = { ...data };

	if (loading) return <IonLoading isOpen={loading} />;
	return <div id="VehicleVinfo">{isDesktop ? <Desktop {...vinfo} /> : <Mobile {...vinfo} />}</div>;
};

const Desktop = (vinfo: VINFO.Detail) => {
	return (
		<div id="VinfoDesktop">
			<IonGrid>
				<IonRow>
					<IonCol>
						<Menu {...vinfo} />
						<Welcome {...vinfo} />
					</IonCol>
					<IonCol>
						<Inventory {...vinfo} />
						<Documents {...vinfo} />
					</IonCol>
				</IonRow>
			</IonGrid>
		</div>
	);
};

const Mobile = (vinfo: VINFO.Detail) => {
	return (
		<div id="VinfoMobile">
			<Welcome {...vinfo} />
			<Inventory {...vinfo} />
			<Documents {...vinfo} />
			<Menu {...vinfo} />
		</div>
	);
};
