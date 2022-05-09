import { useEffect, useState } from "react";
import { ENUMS, Helpers } from "../utils";
import { useWindowResize } from "../utils/Hooks";

const usePopup = (elId: string, popId: string, position: ENUMS.PopPos, show = false) => {
    const [rect, setRect] = useState<any>(null);
    const setClientRect = () => {
        const elem = document.getElementById(elId);
        const cRect = elem?.getBoundingClientRect();
        setRect(show ? cRect : null);
    }
    useWindowResize(setClientRect);
    useEffect(setClientRect, [show]);
    usePopupRect(rect, elId, popId, position);
}

const usePopupRect = (rect: any, elId: string, popId: string, position: ENUMS.PopPos) => {
    if (rect) {
        const trig = document.getElementById(elId);
        const elem = document.getElementById(popId);
        if (elem && trig) {
            const halfVert = (rect.top + (trig.clientHeight / 2)) - (elem.clientHeight / 2);
            const halfHorz = (rect.left + (trig.clientWidth / 2)) - (elem.clientWidth / 2);

            switch (position) {
                case ENUMS.PopPos.left:
                    elem.style.top = `${halfVert}px`;
                    elem.style.left = `${rect.left - (elem.clientWidth + 10)}px`;
                    break;
                case ENUMS.PopPos.right:
                    elem.style.top = `${halfVert}px`;
                    elem.style.left = `${rect.left + (trig.clientWidth + 10)}px`;
                    break;
                case ENUMS.PopPos.top:
                    elem.style.top = `${rect.top - (trig.clientHeight + elem.clientHeight - 20)}px`;
                    elem.style.left = `${halfHorz}px`;
                    break;
                case ENUMS.PopPos.bottom:
                    elem.style.top = `${rect.top + (trig.clientHeight + 20)}px`;
                    elem.style.left = `${halfHorz}px`;
                    break;
                default:
                    break;
            }
        }
    }
}

export const Popup = (popup: APP.Popup) => {
    const [popId] = useState(Helpers.uuid())
    const [show, setShow] = useState(false);
    const [forced, setForced] = useState<ENUMS.PopPos | null>(null);

    const { text, children, trigger = ENUMS.PopTrig.hover, position = ENUMS.PopPos.right } = popup;
    const pos = forced ? forced : position;

    useWindowResize(() => setForced(null));
    usePopup(popup.elemId, popId, pos, show);
    useEffect(() => {
        setTimeout(() => {
            const pop = document.getElementById(popId);
            const rec = pop?.getBoundingClientRect();
            if (pop && rec) {
                switch (position) {
                    case ENUMS.PopPos.right:
                        if ((rec.left + pop.clientWidth) > window.innerWidth) setForced(ENUMS.PopPos.left);
                        break;
                    case ENUMS.PopPos.top:
                        if (rec.top < 0) setForced(ENUMS.PopPos.bottom);
                        break;
                    case ENUMS.PopPos.bottom:
                        if ((rec.top + pop.clientHeight) > window.innerHeight) setForced(ENUMS.PopPos.top);
                        break;
                    default:
                        // assuming its left position
                        if (rec.left < 0) setForced(ENUMS.PopPos.right);
                        break;
                }
            }
        }, 100);
    }, [show]);

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