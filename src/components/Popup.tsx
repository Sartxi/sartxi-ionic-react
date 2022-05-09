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
            const halfVert = rect.top + (trig.clientHeight / 2) - (elem.clientHeight / 2);
            const halfHorz = rect.left - (elem.clientWidth / 2) + (trig.clientHeight / 2);
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
    const { text, children, trigger = ENUMS.PopTrig.hover, position = ENUMS.PopPos.right } = popup;

    usePopup(popup.elemId, popId, position, show);

    const triggerFnc = () => {
        if (trigger === ENUMS.PopTrig.hover) return { onMouseOver: () => setShow(true), onMouseLeave: () => setShow(false) };
    }

    return (
        <div {...triggerFnc()}>
            {show && <span id={popId} className={`vinfo-popup ${position}`}>{text}</span>}
            {children}
        </div>
    );
}