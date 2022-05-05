import { useEffect } from "react";
import { ENUMS } from "./Enums";

export const useWindowResize = (callback: () => void) => {
    return useEffect(() => {
        window.addEventListener("resize", callback);
        return () => window.removeEventListener("resize", callback);
    }, [callback]);
}

export const useVinfoModal = (type: ENUMS.VinfoModal, props = {}) => {
    let typeProps;
    switch (type) {
        case ENUMS.VinfoModal.card:
            typeProps = {
                handle: true,
                canDismiss: true,
                swipeToClose: true,
            };
            break;
        case ENUMS.VinfoModal.sheet:
            typeProps = {
                handle: true,
                canDismiss: true,
                swipeToClose: true,
                initialBreakpoint: 0.9,
                breakpoints: [0, 0.9, 1]
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
    return { id: `${new Date()}-${type}`, ...typeProps, ...props };
}

export const useFancyGrad = (elem: string) => {
    return useEffect(() => {
        const btn: HTMLElement | null = document.getElementById(elem);
        const onMouseMove = (ev: any) => {
            ev.target.style.setProperty("--x", `${ev.pageX - ev.target.offsetLeft}px`)
            ev.target.style.setProperty("--y", `${ev.pageY - ev.target.offsetTop}px`)
        };
        btn?.addEventListener("mousemove", onMouseMove);
        return () => btn?.removeEventListener("mousemove", onMouseMove);
    }, [elem]);
}