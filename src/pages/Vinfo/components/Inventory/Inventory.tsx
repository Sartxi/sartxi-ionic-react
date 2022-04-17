import { useState } from "react";
import { Enums, Helpers, Layout } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";
import { IonImg, IonModal } from "@ionic/react";
import { InvPhotoSwiper } from "./InvPhotoSwipe";

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
	const [isOpen, setIsOpen] = useState(false);
	const photos = page?.vinfo?.inventory?.inventory_item_photos ?? [];

	const modalProps = useVinfoModal(Enums.VinfoModal.default);

	// todo: add a placeholder backup
	const photo = photos?.[0]?.url ?? null;

	if (!photos) return <span />;
	return (
		<>
			<IonModal {...modalProps} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
				<InvPhotoSwiper photos={photos} onClose={() => setIsOpen(false)} />
			</IonModal>
			<div className="item-photo">
				<img src={photo} onClick={() => setIsOpen(true)} />
			</div>
		</>
	);
}

const InvDetail = (page: VINFO.Page) => {
	const { inventory } = page.vinfo;
	return (
		<div id="Detail" className={Layout.VinfoBlock(page.viewType, "shaded rounded transparent")}>
			<div className="flexblock stretch gap-ten">
				<h1 className="specs">
					<span className="sub">{inventory.condition} {inventory.year} {inventory.make}</span>
					{inventory.model} {inventory.trim}
				</h1>
				<span className="spec">{inventory.miles} mi</span>
			</div>
			<div className="flexblock stretch gap-ten aln-btm">
				<span className="spec">
					{inventory.vin}<br />
					{inventory.stock_number}
				</span>
				<h4 className="price">
					<strong>{Helpers.formatDollar(inventory.selling_price)}</strong>
					<span className="sub">+applicable fees &amp; taxes</span>
				</h4>
			</div>
		</div>
	)
}
