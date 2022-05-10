import { useEffect, useState } from "react";
import { ENUMS, Helpers } from "../utils";
import { useWindowResize } from "../utils/Hooks";

export const Popup = (popup: APP.Popup) => {
    const { text, children, trigger = ENUMS.PopTrig.hover, position = ENUMS.PopPos.right } = popup;

    const [popId] = useState(Helpers.uuid())
    const [show, setShow] = useState(false);
    const [forced, setForced] = useState<ENUMS.PopPos | null>(null);
    const pos = forced ? forced : position;

    useWindowResize(() => setForced(null));
    usePopup(popup.elemId, popId, pos, show);
    useFriskPopupLocation(show, popId, position, setForced);

    const triggerFnc = () => {
        if (trigger === ENUMS.PopTrig.hover) return { onMouseOver: () => setShow(true), onMouseLeave: () => setShow(false) };
    }

    return (
        <div {...triggerFnc()}>
            {show && <span id={popId} className={`vinfo-popup ${pos}`}>{text}</span>}
            {children}
        </div>
    );
}


// Popup Hooks
const usePopup = (elId: string, popId: string, position: ENUMS.PopPos, show = false) => {
    const [rect, setRect] = useState<any>(null);
    const setClientRect = () => {
        const elem = document.getElementById(elId);
        const cRect = elem?.getBoundingClientRect();
        setRect(show ? cRect : null);
    }
    useWindowResize(setClientRect);
    useEffect(setClientRect, [elId, show]);
    usePopupRect(rect, elId, popId, position);
}

const usePopupRect = (rect: any, elId: string, popId: string, position: ENUMS.PopPos) => {
    if (rect) {
        const trig = document.getElementById(elId);
        const popop = document.getElementById(popId);
        if (popop && trig) {
            // ctrl -> position top/left according to trigger position and popup width/height to middle
            const halfVtcl = (rect.top + (trig.clientHeight / 2)) - (popop.clientHeight / 2);
            const halfHrzt = (rect.left + (trig.clientWidth / 2)) - (popop.clientWidth / 2);

            switch (position) {
                case ENUMS.PopPos.left:
                    popop.style.top = `${halfVtcl}px`;
                    popop.style.left = `${rect.left - (popop.clientWidth + 15)}px`;
                    break;
                case ENUMS.PopPos.right:
                    popop.style.top = `${halfVtcl}px`;
                    popop.style.left = `${rect.left + (trig.clientWidth + 15)}px`;
                    break;
                case ENUMS.PopPos.top:
                    popop.style.top = `${rect.top - popop.clientHeight - 15}px`;
                    popop.style.left = `${halfHrzt}px`;
                    break;
                case ENUMS.PopPos.bottom:
                    popop.style.top = `${rect.top + (trig.clientHeight + 15)}px`;
                    popop.style.left = `${halfHrzt}px`;
                    break;
                default:
                    break;
            }
        }
    }
}

const useFriskPopupLocation = (show: boolean, popId: string, position: ENUMS.PopPos, setForced: (force: ENUMS.PopPos) => void) => {
    return useEffect(() => {
        setTimeout(() => {
            const pop = document.getElementById(popId);
            const rec = pop?.getBoundingClientRect();
            if (pop && rec) {
                let forced = null;
                switch (position) {
                    case ENUMS.PopPos.left:
                        if (rec.left < 0) forced = ENUMS.PopPos.right;
                        break;
                    case ENUMS.PopPos.right:
                        if ((rec.left + pop.clientWidth) > window.innerWidth) forced = ENUMS.PopPos.left;
                        break;
                    case ENUMS.PopPos.top:
                        if (rec.top < 0) forced = ENUMS.PopPos.bottom;
                        break;
                    case ENUMS.PopPos.bottom:
                        if ((rec.top + pop.clientHeight) > window.innerHeight) forced = ENUMS.PopPos.top;
                        break;
                    default:
                        break;
                }
                if (forced) setForced(forced);
            }
        }, 100);
    }, [popId, position, show, setForced]);
}
