import { useEffect } from "react";
import { Enums } from "./Enums";

export const useWindowResize = (callback: () => void) => {
    return useEffect(() => {
        window.addEventListener("resize", callback);
        return () => window.removeEventListener("resize", callback);
    }, [callback]);
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
        const onMouseMove = (e: any) => {
            const x = e.pageX - e.target.offsetLeft
            const y = e.pageY - e.target.offsetTop
            e.target.style.setProperty("--x", `${x}px`)
            e.target.style.setProperty("--y", `${y}px`)
        };
        if (btn) btn.addEventListener("mousemove", onMouseMove);
        return () => {
            if (btn) btn.removeEventListener("mousemove", onMouseMove)
        }
    }, [elem]);
}