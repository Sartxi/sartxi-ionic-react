import { usePage } from "../../Config"
import { Enums } from "../../utils";

export const VinSearch = () => {
    const { viewType } = usePage({
        id: "search",
        name: "Vinfo Search",
        path: "/",
        viewType: Enums.AppViewType.mobile
    });

    return (
        <div id="Vinfo">
            <div className={`content${viewType === Enums.AppViewType.desktop ? " desktop" : ""}`}></div>
        </div>
    );
}