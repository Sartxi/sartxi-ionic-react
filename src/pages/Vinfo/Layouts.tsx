import { useState } from "react";
import { ENUMS, Layout } from "../../utils";
import { useDarkMode, useLayout, useSections, useVehiclePhotos } from "./Hooks";

import { Logo, Menu } from "./components";
import { Carousel, CtaBanner } from "../../components";
import { Divider } from "../../components/Divider";
import { ContactUs, VehDetail, VehPhotos, DealerSection, DealerBtn, DealerSocials, Documents, Salesperson, SalesPersonBtn } from "./components";

import "./Layout.scss";

export const Layouts = (page: VINFO.Page) => {
    const [section, setSection] = useState(ENUMS.VinfoSection.vehicle);
    const prefersDark = useDarkMode(page.vinfo.theme);
    const layoutProps: VINFO.Layout = { page, section, setSection, prefersDark };
    return useLayout(layoutProps);
}

export const Desktop = (layout: VINFO.Layout) => {
    const photos = useVehiclePhotos(layout.page.vinfo.inventory);
    const prefersDark = useDarkMode(layout.page.vinfo.theme);

    return (
        <div className="vinfo-desktop">
            <div className="overlay-img" />
            <div className="overlay" />
            <div className="content gutters vh flexblock cols gap-hundo">
                <div className="flexblock rows center gap-hundo">
                    <div className="flex-col sections">
                        <Logo {...layout.page} />
                        <div className="contact-btns flexblock rows center gap-thirty">
                            <DealerBtn {...layout} />
                            <SalesPersonBtn {...layout} />
                        </div>
                        <Divider size="large" text="Documents" />
                        <Documents {...layout.page} />
                    </div>
                    <div className="flex-col">
                        <div className="pad flexblock gap-ten aln-end socials">
                            <DealerSocials size="medium" />
                        </div>
                        <div className={Layout.VinfoBlock(layout.page.viewType, "grow vehicle-photos")}>
                            <Carousel
                                type={ENUMS.VinfoCarousel.standard}
                                items={photos}
                                itemkey="url"
                                altkeys={["stored_image_filename", "url"]}
                                preference={prefersDark ? "dark" : "light"} />
                        </div>
                        <br />
                        <div className={Layout.VinfoBlock(layout.page.viewType, "shaded rounded vehicle card")}>
                            <VehDetail {...layout.page} />
                        </div>
                    </div>
                </div>
            </div>
            <CtaBanner {...layout} />
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
                        <DealerSection {...layout} />
                    </div>
                </div>
                <Menu {...layout} />
            </div>
        </div>
    );
};
