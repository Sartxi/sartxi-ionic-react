import { IonIcon } from "@ionic/react";
import { compassOutline, happyOutline } from "ionicons/icons";
import { SalespersonMessage } from "../pages/Vinfo/components/Salesperson/Salesperson";

export const CtaBanner = (layout: VINFO.Layout) => {
    return (
        <div id="CTA-Banner" className="cta-block block shaded">
            <div className="content gutters">
                <div className="flexblock contain rows center aln-cnt stretch">
                    <SalespersonMessage {...layout.page} />
                    <div className="contact-btns flexblock rows center gap-thirty">
                        <div id="Directions" className="block shaded rounded btn primary">
                            <IonIcon icon={compassOutline} />
                            <span>Get Directions</span>
                        </div>
                        <div id="ContactUsBtn" className="block shaded rounded btn tertiary">
                            <IonIcon icon={happyOutline} />
                            <span>Check Availability</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}