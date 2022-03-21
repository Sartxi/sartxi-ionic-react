
import { useEffect, useState } from "react";
import { Enums, Layout } from "../../utils";
import { useDarkModeSetting } from "../../utils/Hooks";

import { Welcome, Menu } from "./components";
import { useLayout, useSections } from "./Hooks";

export const Layouts = (page: VINFO.Page) => {
    const [section, setSection] = useState(Enums.VinfoSection.inventory);
    const prefersDark = useDarkModeSetting();
    const layoutProps: VINFO.Layout = { page, section, setSection, prefersDark };
    return useLayout(layoutProps);
}

export const Desktop = (layout: VINFO.Layout) => {
    const sectionContent = useSections(layout);
    return (
        <div className="content gutters">
            <div className="flexblock">
                <div className="flex-col">
                    <Menu {...layout} />
                    <Welcome {...layout.page} />
                </div>
                <div className="flex-col">{sectionContent}</div>
            </div>
        </div>
    );
};

export const Mobile = (layout: VINFO.Layout) => {
    const sectionContent = useSections(layout);
    useEffect(() => {
        Layout.HandlePgTransition(Enums.VinfoSection.inventory, Enums.VinfoMenuPosition.center);
    }, []);
    
    return (
        <div className="content fill">
            <div className="flexblock cols stretch">
                <Welcome {...layout.page} />
                {sectionContent}
                <Menu {...layout} />
            </div>
        </div>
    );
};
