import { useState } from "react";
import { useVinfoModal } from "../../../../utils/Hooks";
import { Enums, Helpers, Layout } from "../../../../utils";
import { IonAvatar, IonIcon } from "@ionic/react";
import { mailOutline, phonePortraitOutline } from "ionicons/icons";
import { Modal } from "../../../../components";

import "./Salesperson.scss";

export const SalespersonTile = (page: VINFO.Page) => {
    const [isOpen, setIsOpen] = useState(false);
    const share = page?.vinfo?.share ?? null;
    const modalProps = useVinfoModal(Enums.VinfoModal.default, { cssClass: "large" });
    console.log(share);

    return (
        <>
            <Modal id="SalesmanModal" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)}>
                <Salesperson {...page} />
            </Modal>
            <div id="SalespersonTile" className={Layout.VinfoBlock(page.viewType, "simple shaded rounded card")}>
                <div className="flexblock stretch">
                    <div className="flexblock gap-thirty cols">
                        <IonAvatar>
                            <img src={share.salesperson.photo_url} alt="Salesperson" />
                        </IonAvatar>
                        <div className="flexblock center aln-btm" onClick={() => setIsOpen(true)}>
                            <IonIcon icon={mailOutline} size="large" />
                            <IonIcon icon={phonePortraitOutline} size="large" />
                        </div>
                    </div>
                    <div className="flexblock cols">
                        <h2 className="creds">
                            <span className="name">{share.salesperson.name}</span>
                            <span className="job">{share.salesperson.job_title_name}</span>
                        </h2>
                        <div className="comment block">
                            <span className="speak" />
                            {share.customer_message}
                        </div>
                    </div>
                </div>
            </div>
        </>
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
