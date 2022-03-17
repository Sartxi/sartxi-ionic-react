import { IonImg } from "@ionic/react";
import { Helpers, Layout } from "../../../../utils";
import "./Inventory.scss";

export const Inventory = (page: VINFO.Page) => {
	return (
		<div id="Inventory" className={Layout.VinfoBlock(page.viewType, "grow")}>
			<InvPhoto {...page} />
			<InvDetail {...page} />
		</div>
	);
};

const InvPhoto = (page: VINFO.Page) => {
	const { inventory } = page.vinfo;
	return (
		<>
			{inventory?.inventory_item_photos?.length > 0 && <IonImg className="item-photo" src={inventory?.inventory_item_photos[0].url} />}
			{inventory?.inventory_item_photos?.length > 1 && inventory?.inventory_item_photos?.map(({ url }) => <IonImg src={url} />)}
		</>
	)
}

const InvDetail = (page: VINFO.Page) => {
	const { inventory } = page.vinfo;
	return (
		<div id="Detail" className={Layout.VinfoBlock(page.viewType, "shaded rounded transparent")}>
			<div className="flexblock stretch">
				<h5>{inventory.year} {inventory.make} {inventory.model}</h5>
				<h4><strong>{Helpers.formatDollar(inventory.selling_price)}</strong></h4>
			</div>
		</div>
	)
}
