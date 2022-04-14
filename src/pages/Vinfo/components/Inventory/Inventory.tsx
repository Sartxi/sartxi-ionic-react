import { IonContent, IonIcon, IonImg, IonModal, IonSlide, IonSlides } from "@ionic/react";
import { useState } from "react";
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
	const [viewPhotos, setViewPhotos] = useState(false);
	const invPhotos = page?.vinfo?.inventory?.inventory_item_photos ?? null;

	// todo: add a placeholder backup
	const defaultPhoto = invPhotos?.[0]?.url ?? null;
	if (invPhotos) return (
		<>
			{viewPhotos && invPhotos?.length > 1 ? <InvPhotoCarousel photos={invPhotos} /> : <span />}
			<IonImg className="item-photo" src={defaultPhoto} onClick={() => setViewPhotos(true)} />
		</>
	);
	else return <span />;
}

const InvPhotoCarousel = ({ photos }: { photos: VINFO.Photo[] }) => {
	return (
		<IonModal isOpen={true} swipeToClose={true}>
			<IonContent>
				<IonIcon icon="close-circle-outline" />
				<div className="photo-carousel">
					<IonSlides pager={true} options={{
						initialSlide: 0,
						speed: 400
					}}>
						{photos.map((photo, key) => {
							return (
								<IonSlide key={`${key}-photo`}>
									<IonImg src={photo.url} />
								</IonSlide>
							)
						})}
					</IonSlides>
				</div>
			</IonContent>
		</IonModal>
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
