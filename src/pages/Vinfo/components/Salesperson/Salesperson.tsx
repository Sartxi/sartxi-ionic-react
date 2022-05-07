import { useState } from "react";
import { useFancyGrad, useVinfoModal } from "../../../../utils/Hooks";
import { ENUMS, Helpers, Layout } from "../../../../utils";
import { IonAvatar, IonIcon, IonImg } from "@ionic/react";
import { mailOutline, phonePortraitOutline } from "ionicons/icons";
import { Modal } from "../../../../components";

import "./Salesperson.scss";

export const SalespersonTile = (layout: VINFO.Layout) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalProps = useVinfoModal(ENUMS.VinfoModal.default, { cssClass: "large" });
    useFancyGrad(["SalesBtn"]);

    return (
        <div id="SalespersonTile" className={Layout.VinfoBlock(layout.page.viewType)}>
            <Modal id="SalesmanModal" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)}>
                <Salesperson {...layout.page} />
            </Modal>
            <div id="SalesBtn" className="block shaded rounded btn grad-btn" onClick={() => setIsOpen(true)}>
                <IonImg className="icon" src={Layout.SectionIcon(ENUMS.VinfoSection.salesperson, layout.prefersDark)} />
                <span>Salesperson Info</span>
            </div>
        </div>
    )
}

export const SalespersonMessage = (page: VINFO.Page) => {
    const share = page?.vinfo?.share ?? null;
    if (!share) return <span />;
    return (
        <div id="SalespersonMessage" className="flexblock stretch">
            <div className="flexblock gap-thirty cols">
                <IonAvatar>
                    <img src={share.salesperson.photo_url} alt="Salesperson" />
                </IonAvatar>
            </div>
            <div className="flexblock cols">
                {share.salesperson.name} says
                <div className="comment block">
                    <span className="speak" />
                    {share.customer_message}
                </div>
            </div>
        </div>
    )
}

export const Salesperson = (page: VINFO.Page) => {
    const share = page?.vinfo?.share ?? null;
    const store = page?.vinfo?.inventory?.store ?? null;
    const photos = store?.store_photos ?? [];
    const photo = store?.primary_photo_url ?? photos?.[0].full_url;

    if (!share) return <span />;
    else return (
        <div id="Salesperson" className={Layout.VinfoBlock(page.viewType, "grow")}>
            <div className="item-photo">
                <img alt={share.salesperson.name} src={photo} />
            </div>
            <div id="SalesInfo" className={Layout.VinfoBlock(page.viewType)}>
                <IonAvatar>
                    <img src={share.salesperson.photo_url} alt="Salesperson" />
                </IonAvatar>
                <h2>{share.salesperson.name}</h2>
                <h3>{share.salesperson.job_title_name}</h3>
            </div>
            <div id="SalesContact" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                {share.salesperson.email && <div className="flexblock gap-ten aln-cnt">
                    <IonIcon icon={mailOutline} size="large" />
                    <div className="contact">
                        {share.salesperson.email}
                    </div>
                </div>}
                <div className="flexblock gap-ten aln-cnt">
                    <IonIcon icon={phonePortraitOutline} size="large" />
                    <div className="contact">
                        {Helpers.formatPhone(parseInt(share.salesperson.phone, 10))}
                    </div>
                </div>
            </div>
            {share.salesperson.bio_text && <div id="SalesBio" className={Layout.VinfoBlock(page.viewType, "shaded rounded")}>
                {share.salesperson.bio_text}
            </div>}
        </div>
    );
};
