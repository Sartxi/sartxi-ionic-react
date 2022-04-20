import { useState } from "react";
import { Enums, Layout } from "../../utils";
import { useDarkModeSetting } from "../../utils/Hooks";

import { Welcome, Menu } from "./components";
import { useLayout, useSections } from "./Hooks";
import { ContactUs, Inventory, Dealership, DealershipTile, Documents, Salesperson, SalespersonTile } from "./components";

export const Layouts = (page: VINFO.Page) => {
    const [section, setSection] = useState(Enums.VinfoSection.vehicle);
    const prefersDark = useDarkModeSetting();
    const layoutProps: VINFO.Layout = { page, section, setSection, prefersDark };
    return useLayout(layoutProps);
}

export const Desktop = (layout: VINFO.Layout) => {
    return (
        <div className="content gutters">
            <div className="flexblock rows center gap-thirty">
                <div className="flex-col sections">
                    <Inventory {...layout.page} />
                    <Documents {...layout.page} />
                </div>
                <div className="flex-col">
                    <Welcome {...layout.page} className="shaded rounded space" />
                    <DealershipTile {...layout.page} />
                    <SalespersonTile {...layout.page} />
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
                <Welcome {...layout.page} />
                <div className={Layout.VinfoBlock(layout.page.viewType, "animated")}>
                    <div {...salesAttr}>
                        <Salesperson {...layout.page} />
                    </div>
                    <div {...vehicleAttr}>
                        <Inventory {...layout.page} />
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
