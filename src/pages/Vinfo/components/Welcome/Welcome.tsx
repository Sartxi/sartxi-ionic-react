import { IonImg } from "@ionic/react";
import { Layout } from "../../../../utils";
import "./Welcome.scss";

export const Welcome = ({ vinfo, viewType }: VINFO.Page) => {
	return (
		<div id="Welcome" className={Layout.VinfoBlock(viewType, "space")}>
			<IonImg src={vinfo.inventory.store.logo_url} className="store_logo" />
		</div>
	);
};
