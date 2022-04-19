import { useEffect, useState } from "react";
import { Enums } from "./Enums";

export const useWindowResize = (callback: () => void) => {
    return useEffect(() => {
        window.addEventListener("resize", callback);
        return () => window.removeEventListener("resize", callback);
    }, [callback]);
}

export const useDarkModeSetting = () => {
    const watch = window.matchMedia('(prefers-color-scheme: dark)');
    const [prefersDark, setPrefersDark] = useState(watch.matches);
    useEffect(() => {
        const callback = (dark: any) => setPrefersDark(dark.matches);
        watch.addEventListener("change", callback);
        return () => watch.removeEventListener("change", callback);;
    }, [watch]);
    return prefersDark;
}

export const useVinfoModal = (type: Enums.VinfoModal, props = {}) => {
    let typeProps;
    switch (type) {
        case Enums.VinfoModal.card:
            typeProps = {
                handle: true,
                canDismiss: true,
                swipeToClose: true,
            };
            break;
        case Enums.VinfoModal.sheet:
            typeProps = {
                handle: true,
                canDismiss: true,
                swipeToClose: true,
                initialBreakpoint: 0.9,
                breakpoints: [0, 0.9, 1],
            };
            break;
        default:
            typeProps = {
                handle: true,
                canDismiss: true,
                swipeToClose: true,
            };
            break;
    }
    return { ...typeProps, ...props };
}