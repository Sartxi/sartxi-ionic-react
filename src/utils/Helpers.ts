import { Enums } from "./Enums";

export namespace Helpers {
    const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    export const vinfo = "Vinfo®";
    export const parseParams = (location: any) => JSON.parse('{"' + decodeURI(location.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    export const formatDollar = (val: number) => (money.format(val));
};