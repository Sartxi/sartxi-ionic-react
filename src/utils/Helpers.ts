export namespace Helpers {
    const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    export const vinfo = "Vinfo®";
    export const parseParams = (location: any) => JSON.parse('{"' + decodeURI(location.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    export const formatDollar = (val: number) => (money.format(val));
    export const animateElemByClass = (element: Element, className: string, animation: string) => element.classList.contains(className) && element.setAttribute("style", `animation: ${animation}`);
    export const arrayFromEnum = (object: any) => (Object.values(object) as Array<keyof typeof object>).map(id => id);
};