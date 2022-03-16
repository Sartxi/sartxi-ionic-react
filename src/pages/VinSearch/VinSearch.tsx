import { usePage } from "../../Config"
import { Helpers } from "../../utils";

export const VinSearch = () => {
    const { viewType } = usePage({
        id: "search",
        name: "Vinfo Search",
        path: "/",
    });

    return (
        <div id="Vinfo">
            <div className={Helpers.vinfoBlock(viewType)}>

            </div>
        </div>
    );
}