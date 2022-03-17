import { usePage } from "../../Config"
import { Layout } from "../../utils";

export const VinSearch = () => {
    const { viewType } = usePage({
        id: "search",
        name: "Vinfo Search",
        path: "/",
    });

    return (
        <div id="Vinfo">
            <div className={Layout.VinfoBlock(viewType)}>
                Search
            </div>
        </div>
    );
}