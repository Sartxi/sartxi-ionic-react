const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const vinfo = "Vinfo®";
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const parseParams = (location: any) => JSON.parse('{"' + decodeURI(location.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
const formatDollar = (val: number) => (money.format(val));

const formatPhone = (num: number) => {
    const cleaned = ('' + num).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    return null;
};

const animateElemByClass = (element: Element, className: string, animation: string) => element.classList.contains(className) && element.setAttribute("style", `animation: ${animation}`);
const arrayFromEnum = (object: any) => (Object.values(object) as Array<keyof typeof object>).map(id => id);
const vehicleTitle = (vehicle: any, includeTrim: boolean = false) => vehicle && `${vehicle.condition} ${vehicle.year} ${vehicle.make} ${includeTrim && vehicle.trim ? vehicle.trim : ""}`;

const getReadableHour = (h: string) => {
    const hour = parseInt(h, 10);
    const getTime = (time: number, isPM = false) => {
        const hr = String(time);
        const hour = hr.length === 4 ? isPM ? parseInt(hr.substring(0, 2), 10) - 12 : hr.substring(0, 2) : hr.charAt(0);
        return `${hour}:${hr.slice(-2)}`
    }
    if (hour <= 1200) return `${getTime(hour)}a`;
    else return `${getTime(hour, true)}p`
};

const hexToRgb = (hex: string) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const shadeColor = (color: string, percent: number) => {
    if (color) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        const createTone = (ct: any) => {
            const tone = (ct * (100 + percent)) / 100;
            return tone.toString();
        };

        R = parseInt(createTone(R));
        G = parseInt(createTone(G));
        B = parseInt(createTone(B));

        R = R < 255 ? R : 255;
        G = G < 255 ? G : 255;
        B = B < 255 ? B : 255;

        const RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
        const GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
        const BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

        return "#" + RR + GG + BB;
    } else return "#777";
};

const setIndex = {
    prev: (a: number, b: number) => (a === 0 ? b - 1 : a - 1),
    next: (a: number, b: number) => (a === b ? 0 : a + 1)
};

export const Helpers = {
    vinfo,
    days,
    setIndex,
    parseParams,
    formatDollar,
    formatPhone,
    animateElemByClass,
    arrayFromEnum,
    vehicleTitle,
    getReadableHour,
    hexToRgb,
    shadeColor,
    uuid
}