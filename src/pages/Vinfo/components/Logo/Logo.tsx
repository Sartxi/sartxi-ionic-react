import { IonImg } from "@ionic/react";
import { Layout } from "../../../../utils";
import "./Logo.scss";

export const Logo = ({ vinfo, viewType, className = "more space" }: VINFO.Page) => {
	return (
		<div id="Logo" className={Layout.VinfoBlock(viewType, className)}>
			<IonImg src={vinfo.inventory.store.logo_url} className="store_logo" />
		</div>
	);
};
