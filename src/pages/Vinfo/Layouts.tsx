
import { useState } from "react";
import { Enums } from "../../utils";
import { useDarkModeSetting } from "../../utils/Hooks";

import { Welcome, Menu, Inventory, Documents } from "./components";

export const Layouts = (page: VINFO.Page) => {
    const prefersDark = useDarkModeSetting();
    const [section, setSection] = useState(Enums.VinfoSection.inventory);
    const isDesktop = page.viewType === Enums.AppViewType.desktop;
    // add switch if tablet views are requested
    const layout: VINFO.Layout = { page, section, setSection, prefersDark };
    return <>{isDesktop ? <Desktop {...layout} /> : <Mobile {...layout} />}</>
}

// layouts based on viewType
// may add a tablet view if it is different than mobile
const Desktop = (layout: VINFO.Layout) => {
    return (
        <div className="content gutters">
            <div className="flexblock">
                <div className="flex-col">
                    <Menu {...layout} />
                    <Welcome {...layout.page} />
                </div>
                <div className="flex-col">
                    <Inventory {...layout.page} />
                    <Documents {...layout.page} />
                </div>
            </div>
        </div>
    );
};
const Mobile = (layout: VINFO.Layout) => {
    return (
        <div className="content fill">
            <div className="flexblock cols stretch">
                <Welcome {...layout.page} />
                <Inventory {...layout.page} />
                <Documents {...layout.page} />
                <Menu {...layout} />
            </div>
        </div>
    );
};