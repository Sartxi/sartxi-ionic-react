import { useState } from "react";
import { ENUMS, Layout } from "../../utils";
import { Logo, Menu } from "./components";
import { useLayout, useSections } from "./Hooks";
import { ContactUs, VehDetail, VehPhotos, Dealership, DealershipTile, Documents, Salesperson, SalespersonTile } from "./components";
import { Divider } from "../../components/Divider";
import { IonIcon } from "@ionic/react";
import { compassOutline, happyOutline, logoFacebook, logoInstagram, logoLinkedin, logoTwitter } from "ionicons/icons";
import { useFancyGrad } from "../../utils/Hooks";
import { SalespersonMessage } from "./components/Salesperson/Salesperson";
import { Carousel } from "../../components";

import "./Layout.scss";

export const Layouts = (page: VINFO.Page) => {
    const [section, setSection] = useState(ENUMS.VinfoSection.vehicle);
    const prefersDark = document.querySelector("html")?.getAttribute("vinfo-theme") === "dark";
    const layoutProps: VINFO.Layout = { page, section, setSection, prefersDark };
    return useLayout(layoutProps);
}

export const Desktop = (layout: VINFO.Layout) => {
    useFancyGrad("ContactUsBtn");
    useFancyGrad("Directions");
    const photos = layout?.page?.vinfo?.inventory?.inventory_item_photos ?? [];

    return (
        <div className="vinfo-desktop">
            <div className="overlay-img" />
            <div className="overlay" />
            <div className="content gutters vh flexblock cols gap-hundo">
                <div className="flexblock rows center gap-hundo">
                    <div className="flex-col sections">
                        <Logo {...layout.page} />
                        <div className="contact-btns flexblock rows center gap-thirty">
                            <DealershipTile {...layout} />
                            <SalespersonTile {...layout} />
                        </div>
                        <Divider size="large" text="Documents" />
                        <Documents {...layout.page} />
                    </div>
                    <div className="flex-col">
                        <div className="pad flexblock gap-ten aln-end socials">
                            <IonIcon icon={logoLinkedin} />
                            <IonIcon icon={logoFacebook} />
                            <IonIcon icon={logoTwitter} />
                            <IonIcon icon={logoInstagram} />
                        </div>
                        <div className={Layout.VinfoBlock(layout.page.viewType, "grow vehicle-photos")}>
                            <Carousel type={ENUMS.VinfoCarousel.standard} items={photos} />
                        </div>
                        <br />
                        <div className={Layout.VinfoBlock(layout.page.viewType, "shaded rounded vehicle card")}>
                            <VehDetail {...layout.page} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cta-block block shaded">
                <div className="content gutters">
                    <div className="flexblock rows stretch gap-ten">
                        <SalespersonMessage {...layout.page} />
                        <div className="pad flexblock gap-ten aln-end">
                            <div id="ContactUsBtn" className="block shaded rounded btn grad-btn">
                                <IonIcon icon={compassOutline} />
                                <span>Get Directions</span>
                            </div>
                            <div id="Directions" className="block shaded rounded btn grad-btn">
                                <IonIcon icon={happyOutline} />
                                <span>Check Availability</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Mobile = (layout: VINFO.Layout) => {
    const [salesAttr, vehicleAttr, dealerAttr] = useSections(layout);
    return (
        <div className="content fill">
            <div className="flexblock cols stretch">
                <Logo {...layout.page} />
                <div className={Layout.VinfoBlock(layout.page.viewType, "animated")}>
                    <div {...salesAttr}>
                        <Salesperson {...layout.page} />
                    </div>
                    <div {...vehicleAttr}>
                        <div className={Layout.VinfoBlock(layout.page.viewType, "grow vehicle")}>
                            <VehPhotos {...layout.page} />
                            <VehDetail {...layout.page} />
                        </div>
                        <Documents {...layout.page} />
                        <ContactUs {...layout.page} />
                    </div>
                    <div {...dealerAttr}>
                        <Dealership {...layout.page} />
                    </div>
                </div>
                <Menu {...layout} />
            </div>
        </div>
    );
};
