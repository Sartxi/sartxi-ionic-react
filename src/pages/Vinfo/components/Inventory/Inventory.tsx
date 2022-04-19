import { useEffect, useState } from "react";
import { Enums, Helpers, Layout } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";
import { Carousel, Modal } from "../../../../components";

import "./Inventory.scss";

export const Inventory = (page: VINFO.Page) => {
	const [isOpen, setIsOpen] = useState(false);
	const photos = page?.vinfo?.inventory?.inventory_item_photos ?? [];

	const modalProps = useVinfoModal(Enums.VinfoModal.default);

	// todo: add a placeholder backup
	const photo = photos?.[0]?.url ?? undefined;
	const inventory: VINFO.Inventory = page?.vinfo?.inventory ?? null;

	if (!inventory) return <span />;
	else return (
		<div id="Inventory" className={Layout.VinfoBlock(page.viewType, "grow")}>
			<Modal id="InvPhotos" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)}>
				<InvPhotos photos={photos} />
			</Modal>
			<div className="item-photo">
				<img alt={Helpers.vehicleTitle(page?.vinfo?.inventory, true)} src={photo} onClick={() => setIsOpen(true)} />
			</div>
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
		</div>
	);
};

interface InvPhotoProps extends APP.ModalContentProps {
	photos: VINFO.Photo[];
}

const InvPhotos = ({ photos, setTitle }: InvPhotoProps) => {
	useEffect(() => {
		setTitle?.("Inventory Photos");
	}, [setTitle]);

	return (
		<div className="flexblock fill center">
			<Carousel photos={photos} />
		</div>
	)
}
