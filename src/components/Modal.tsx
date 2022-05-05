import { IonIcon, IonModal } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";

import "./Components.scss";

export const Modal = ({ id, isOpen, children, onClose, modalProps, useCloseBtn = true }: APP.Modal) => {
    return (
        <IonModal id={id} isOpen={isOpen} {...modalProps} onDidDismiss={() => onClose()}>
            <div className="modal-content">
                <div className="tools">
                    {useCloseBtn && <IonIcon icon={closeCircleOutline} size="large" onClick={() => onClose()} />}
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </IonModal>
    )
}