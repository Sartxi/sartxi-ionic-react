
import { Helpers } from "../../utils";
import { Welcome, Menu, Inventory, Documents } from "./components";

export const Layout = (page: VINFO.Page) => {
    return <>{Helpers.isDesktop(page.viewType) ? <Desktop {...page} /> : <Mobile {...page} />}</>
}

// layouts based on viewType
// may add a tablet view if it is different than mobile
const Desktop = (vinfo: VINFO.Page) => {
    return (
        <div className="content gutters">
            <div className="flexblock">
                <div className="flex-col">
                    <Menu {...vinfo} />
                    <Welcome {...vinfo} />
                </div>
                <div className="flex-col">
                    <Inventory {...vinfo} />
                    <Documents {...vinfo} />
                </div>
            </div>
        </div>
    );
};
const Mobile = (vinfo: VINFO.Page) => {
    return (
        <div className="content fill">
            <div className="flexblock cols stretch">
                <Welcome {...vinfo} />
                <Inventory {...vinfo} />
                <Documents {...vinfo} />
                <Menu {...vinfo} />
            </div>
        </div>
    );
};