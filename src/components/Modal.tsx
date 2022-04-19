import React, { useState } from "react";
import { IonIcon, IonModal } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";

export const Modal = ({ id, isOpen, children, onClose, modalProps, canClose = true }: APP.Modal) => {
    const [title, setTitle] = useState("");
    const content = children && React.cloneElement(children, { setTitle });
    return (
        <IonModal id={id} isOpen={isOpen} {...modalProps} onDidDismiss={() => canClose && onClose()}>
            <div className="modal-content">
                <div className="tools">
                    {title && <span className="title">{title}</span>}
                    {canClose && <IonIcon icon={closeCircleOutline} size="large" onClick={() => onClose()} />}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
        </IonModal>
    )
}