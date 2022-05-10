import { useEffect, useLayoutEffect, useState } from "react";
import { ENUMS } from "./Enums";
import { Helpers } from "./Helpers";

export const useWindowResize = (callback: () => void) => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
        const update = () => setSize([window.innerWidth, window.innerHeight]);
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);
    return useEffect(() => callback(), [size]);
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
    return { id: `${Helpers.uuid()}-${type}`, ...typeProps, ...props };
}

export const useFancyGrad = (elems: string[]) => {
    return useEffect(() => {
        const onMouseMove = (ev: any) => {
            ev.target.style.setProperty("--x", `${ev.pageX - ev.target.offsetLeft}px`)
            ev.target.style.setProperty("--y", `${ev.pageY - ev.target.offsetTop}px`)
        };
        elems.forEach(elem => {
            const btn: HTMLElement | null = document.getElementById(elem);
            btn?.addEventListener("mousemove", onMouseMove);
        });
        return () => elems.forEach(elem => {
            const btn: HTMLElement | null = document.getElementById(elem);
            btn?.removeEventListener("mousemove", onMouseMove);
        });
    }, [elems]);
}

export const useArrowCtrls = (ctrls: { top?: () => void, btm?: () => void, lft?: () => void, rgt?: () => void }, enabled = true) => {
    return useEffect(() => {
        if (enabled) document.onkeydown = (e: any) => {
            e = e || window.event;
            const key = ENUMS.ArrowCtrlKeys[e.keyCode];
            if (key === "top") ctrls.top?.();
            if (key === "bottom") ctrls.btm?.();
            if (key === "left") ctrls.lft?.();
            if (key === "right") ctrls.rgt?.();
        }
        else document.onkeydown = () => { };
    }, [ctrls, enabled]);
}