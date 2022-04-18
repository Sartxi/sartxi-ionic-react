import { Helpers, Layout } from "../../../../utils";
import { IonAvatar, IonIcon } from "@ionic/react";
import { mailOutline, phonePortraitOutline } from "ionicons/icons";

import "./Salesperson.scss";

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
