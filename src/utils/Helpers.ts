import { Enums } from "./Enums";

export namespace Helpers {
    const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    export const vinfo = "Vinfo®";
    export const fetchParams = (location: any) => JSON.parse('{"' + decodeURI(location.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    export const formatDollar = (val: number) => (money.format(val));
    export const vinfoBlock = (viewType: Enums.AppViewType, decorators?: string) => `block ${Enums.AppViewType[viewType]} ${decorators ? decorators : "simple"}`
    export const isDesktop = (viewType: Enums.AppViewType) => viewType && viewType === Enums.AppViewType.desktop;
};