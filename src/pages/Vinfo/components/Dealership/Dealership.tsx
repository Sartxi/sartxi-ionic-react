import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { Enums, Helpers, Layout } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";
import { Carousel, Map, Modal } from "../../../../components";
import { locationOutline, mailOutline, phonePortraitOutline, logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from "ionicons/icons";

import "./Dealership.scss";

export const DealershipTile = (page: VINFO.Page) => {
    const [isOpen, setIsOpen] = useState(false);
    const store = page?.vinfo?.inventory?.store ?? null;
    const photos = store?.store_photos ?? [];
    const photo = store?.primary_photo_url ?? photos?.[0].full_url;
    const modalProps = useVinfoModal(Enums.VinfoModal.default, { cssClass: "large" });

    return (
        <>
            <Modal id="DealerModal" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)}>
                <Dealership {...page} />
            </Modal>
            <div id="DealerTile" className={Layout.VinfoBlock(page.viewType, "simple shaded rounded card")}>
                <div className="flexblock stretch">
                    <h2 className="store-name">
                        <span className="name">{store?.name}</span>
                        <span className={`sub ${store.hours.open_now ? "green" : "red"}`}>{store.hours.open_now ? "open now" : "closed"}</span>
                    </h2>
                    <img src={photo} alt={store.name} className="store-photo" />
                </div>
                <div className="flexblock stretch aln-btm">
                    <div className="flexblock stretch gap-ten" onClick={() => setIsOpen(true)}>
                        <IonIcon icon={locationOutline} size="large" />
                        <IonIcon icon={mailOutline} size="large" />
                        <IonIcon icon={phonePortraitOutline} size="large" />
                    </div>
                    <div className="flexblock stretch gap-ten">
                        <IonIcon icon={logoLinkedin} />
                        <IonIcon icon={logoFacebook} />
                        <IonIcon icon={logoTwitter} />
                        <IonIcon icon={logoInstagram} />
                    </div>
                </div>
            </div>
        </>
    )
}

export const Dealership = (page: VINFO.Page) => {
    const [openPhotos, setIsOpenPhotos] = useState(false);
    const [openMaps, setIsOpenMaps] = useState(false);

    const store = page?.vinfo?.inventory?.store ?? null;
    const photos = store?.store_photos ?? [];
    const photo = store?.primary_photo_url ?? photos?.[0].full_url;
    const today = Helpers.days[new Date().getDay()];

    const photosProps = useVinfoModal(Enums.VinfoModal.default);
    const mapsProps = useVinfoModal(Enums.VinfoModal.sheet);

    if (!store) return <span />;
    else return (
        <div id="Dealership" className={Layout.VinfoBlock(page.viewType, "grow")}>
            <Modal id="DealerPhotos" isOpen={openPhotos} modalProps={photosProps} onClose={() => setIsOpenPhotos(false)}>
                <div className="flexblock fill center">
                    <Carousel photos={photos} />
                </div>
            </Modal>
            <Modal id="MapModal" isOpen={openMaps} modalProps={mapsProps} onClose={() => setIsOpenMaps(false)}>
                <Map location="sdfio" />
            </Modal>
            <div className="item-photo">
                <img alt={store.name} src={photo} onClick={() => setIsOpenPhotos(true)} />
            </div>
            <div className={Layout.VinfoBlock(page.viewType)}>
                <h1 className="store-name">{store?.name}</h1>
            </div>
            <div id="StoreInfo" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                <div className="flexblock gap-ten aln-cnt" onClick={() => setIsOpenMaps(true)}>
                    <IonIcon icon={locationOutline} size="large" />
                    <div className="contact">
                        {store.address1} {store.address2}, {store.city}, {store.state}, {store.zip}
                    </div>
                </div>
                <div className="flexblock gap-ten aln-cnt">
                    <IonIcon icon={mailOutline} size="large" />
                    <div className="contact">
                        {store.sales_email}
                    </div>
                </div>
                <div className="flexblock gap-ten aln-cnt">
                    <IonIcon icon={phonePortraitOutline} size="large" />
                    <div className="contact">
                        {Helpers.formatPhone(store.sales_phone)}
                    </div>
                </div>
            </div>
            <div id="StoreHours" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                <div className="flexblock gap-thirty">
                    <h3 className={store.hours.open_now ? "green" : "red"}>
                        Hours
                        <span className="sub">{store.hours.open_now ? "open now" : "closed"}</span>
                    </h3>
                    <div className="hours">
                        {store.hours.days.map(day => {
                            const isToday = day.day_text === today;
                            return (
                                <div key={day.day_text} className={`day flexblock ${isToday ? store.hours.open_now ? "green" : "red" : ""}`}>
                                    <span className="time">{day.open ? `${Helpers.getReadableHour(day.open_time)} - ${Helpers.getReadableHour(day.close_time)}` : "closed"}</span>
                                    <span>{isToday ? "Today" : day.day_text}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div id="Socials" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                <div className="flexblock stretch gap-ten">
                    <IonIcon icon={logoLinkedin} size="large" />
                    <IonIcon icon={logoFacebook} size="large" />
                    <IonIcon icon={logoTwitter} size="large" />
                    <IonIcon icon={logoInstagram} size="large" />
                </div>
            </div>
        </div>
    );
};
