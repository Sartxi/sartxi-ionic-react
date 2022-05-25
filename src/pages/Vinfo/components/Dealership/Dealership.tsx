import { useState } from "react";
import { useDarkMode } from "../../Hooks";
import { IonIcon, IonImg } from "@ionic/react";
import { ENUMS, Helpers, Layout } from "../../../../utils";
import { useFancyGrad, useVinfoModal } from "../../../../utils/Hooks";
import { Carousel, Map, Modal } from "../../../../components";
import { locationOutline, mailOutline, phonePortraitOutline, logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from "ionicons/icons";

import "./Dealership.scss";

interface DealershipLayout extends VINFO.Page {
    openPhotos: (open: boolean) => void;
    openMap: (open: boolean) => void;
}

export const DealerBtn = (layout: VINFO.Layout) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openPhotos, setIsOpenPhotos] = useState(false);
    const [openMaps, setIsOpenMaps] = useState(false);

    const store = layout?.page?.vinfo?.inventory?.store ?? null;
    const photos = store?.store_photos ?? [];

    const mapsProps = useVinfoModal(ENUMS.VinfoModal.default);
    const modalProps = useVinfoModal(ENUMS.VinfoModal.default, { cssClass: "large" });

    const prefersDark = useDarkMode(layout.page.vinfo.theme);
    useFancyGrad(["DealerBtn"]);

    return (
        <>
            <div id="DealerTile" className={Layout.VinfoBlock(layout.page.viewType)}>
                <Modal id="MapModal" isOpen={openMaps} modalProps={mapsProps} onClose={() => setIsOpenMaps(false)}>
                    <Map location="sdfio" />
                </Modal>
                <Modal id="DealerModal" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)}>
                    <Dealership {...layout.page} openMap={open => setIsOpenMaps(open)} openPhotos={open => setIsOpenPhotos(open)} />
                </Modal>
                <div id="DealerBtn" className="block shaded rounded btn grad-btn" onClick={() => setIsOpen(true)}>
                    <IonImg className="icon" src={Layout.SectionIcon(ENUMS.VinfoSection.dealership, layout.prefersDark)} />
                    <span>Dealership Info</span>
                </div>
            </div>
            {openPhotos && (
                <Carousel
                    items={photos}
                    type={ENUMS.VinfoCarousel.max}
                    itemkey="full_url"
                    preference={prefersDark ? "dark" : "light"}
                    altkeys={["full_url"]}
                    onClose={() => setIsOpenPhotos(false)}
                />
            )}
        </>
    )
}

export const DealerSection = (layout: VINFO.Layout) => {
    const [openPhotos, setIsOpenPhotos] = useState(false);
    const [openMaps, setIsOpenMaps] = useState(false);

    const store = layout?.page?.vinfo?.inventory?.store ?? null;
    const photos = store?.store_photos ?? [];
    const mapsProps = useVinfoModal(ENUMS.VinfoModal.sheet);
    const photosProps = useVinfoModal(ENUMS.VinfoModal.default);
    const prefersDark = useDarkMode(layout.page.vinfo.theme);

    return (
        <>
            <Modal id="MapModal" isOpen={openMaps} modalProps={mapsProps} onClose={() => setIsOpenMaps(false)}>
                <Map location="sdfio" />
            </Modal>
            <Modal id="DealerPhotos" isOpen={openPhotos} modalProps={photosProps} onClose={() => setIsOpenPhotos(false)}>
                <div className="flexblock fill center">
                    <Carousel type={ENUMS.VinfoCarousel.swipe} items={photos} preference={prefersDark ? "dark" : "light"} altkeys={["full_url"]} itemkey="full_url" />
                </div>
            </Modal>
            <Dealership {...layout.page} openMap={open => setIsOpenMaps(open)} openPhotos={open => setIsOpenPhotos(open)} />
        </>
    )
}


const Dealership = (page: DealershipLayout) => {
    const store = page?.vinfo?.inventory?.store ?? null;
    const photos = store?.store_photos ?? [];
    const photo = store?.primary_photo_url ?? photos?.[0].full_url;

    if (!store) return <span />;
    else return (
        <div id="Dealership" className={Layout.VinfoBlock(page.viewType, "grow")}>
            <div className="item-photo">
                <img alt={store.name} src={photo} onClick={() => page.openPhotos(true)} />
            </div>
            <div className={Layout.VinfoBlock(page.viewType)}>
                <h1 className="store-name">{store?.name}</h1>
            </div>
            <div id="StoreInfo" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                <DealerInfo {...page} />
            </div>
            <div id="StoreHours" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                <DealerHours {...page} />
            </div>
            <div id="Socials" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                <div className="flexblock stretch gap-ten">
                    <DealerSocials size="large" />
                </div>
            </div>
        </div>
    );
};

const DealerInfo = (page: DealershipLayout) => {
    const store = page?.vinfo?.inventory?.store ?? null;
    return (
        <>
            <div className="flexblock gap-ten aln-cnt" onClick={() => page.openMap(true)}>
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
        </>
    )
}

const DealerHours = (page: DealershipLayout) => {
    const store = page?.vinfo?.inventory?.store ?? null;
    const today = Helpers.days[new Date().getDay()];
    return (
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
    )
}

export const DealerSocials = ({ size }: { size: string }) => {
    return (
        <>
            <IonIcon icon={logoLinkedin} size={size} />
            <IonIcon icon={logoFacebook} size={size} />
            <IonIcon icon={logoTwitter} size={size} />
            <IonIcon icon={logoInstagram} size={size} />
        </>
    )
}
