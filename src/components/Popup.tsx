import { useEffect, useState } from "react";
import { ENUMS, Helpers } from "../utils";

const usePopup = (elId: string, position: ENUMS.PopPos, show = false) => {
    useEffect(() => {
        if (show) {
            const elem = document.getElementById(elId);
            const rect = elem?.getBoundingClientRect();
            if (rect) {
                switch (position) {
                    case ENUMS.PopPos.top:
                        console.log("top", rect.top);
                        break;
                    case ENUMS.PopPos.right:
                        console.log("right", rect.right);
                        break;
                    case ENUMS.PopPos.left:
                        console.log("left", rect.left);
                        break;
                    case ENUMS.PopPos.bottom:
                        console.log("bottom", rect.bottom);
                        break;
                    default:
                        break;
                }
            }
        }
    }, [show]);
}

export const Popup = (popup: APP.Popup) => {
    const popupId = Helpers.uuid();
    const { text, children, trigger = ENUMS.PopTrig.hover, position = ENUMS.PopPos.right } = popup;
    const [show, setShow] = useState(false);

    usePopup(popupId, position, show);

    const triggerFnc = () => {
        if (trigger === ENUMS.PopTrig.hover) return { onMouseOver: () => setShow(true) };
        if (trigger === ENUMS.PopTrig.click) return { onClick: () => setShow(true) };
    }

    return (
        <div id={popupId} className={`popup ${position}`} {...triggerFnc()}>
            {show && <span className="pop-txt">{text}</span>}
            {children}
        </div>
    );
}