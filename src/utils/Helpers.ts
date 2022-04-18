export namespace Helpers {
    const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
    export const vinfo = "Vinfo®";
    export const parseParams = (location: any) => JSON.parse('{"' + decodeURI(location.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    export const formatDollar = (val: number) => (money.format(val));
    export const formatPhone = (num: number) => {
        const cleaned = ('' + num).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        return null;
    };
    export const animateElemByClass = (element: Element, className: string, animation: string) => element.classList.contains(className) && element.setAttribute("style", `animation: ${animation}`);
    export const arrayFromEnum = (object: any) => (Object.values(object) as Array<keyof typeof object>).map(id => id);
    export const vehicleTitle = (vehicle: any, includeTrim: boolean = false) => vehicle && `${vehicle.condition} ${vehicle.year} ${vehicle.make} ${includeTrim && vehicle.trim ? vehicle.trim : ""}`;
    export const getReadableHour = (h: string) => {
        const hour = parseInt(h, 10);
        const getTime = (time: number, isPM = false) => {
            const hr = String(time);
            const hour = hr.length == 4 ? isPM ? parseInt(hr.substring(0, 2), 10) - 12 : hr.substring(0, 2) : hr.charAt(0);
            return `${hour}:${hr.slice(-2)}`
        }
        if (hour <= 1200) return `${getTime(hour)}a`;
        else return `${getTime(hour, true)}p`
    };
    export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
};
