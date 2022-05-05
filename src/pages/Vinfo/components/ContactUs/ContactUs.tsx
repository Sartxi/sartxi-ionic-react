import { IonAvatar, IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { locationOutline, mailOutline, phonePortraitOutline, logoFacebook, logoInstagram, logoLinkedin, logoTwitter, phonePortrait, callOutline } from "ionicons/icons";
import { useState } from "react";
import { Modal } from "../../../../components";
import { Divider } from "../../../../components/Divider";
import { ENUMS, Helpers, Layout } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";

import "./ContactUs.scss";

export const ContactUs = ({ viewType, vinfo }: VINFO.Page) => {
    const { share, inventory } = vinfo;

    const [isOpen, setIsOpen] = useState(false);
    const modalType = viewType === ENUMS.AppViewType.desktop ? ENUMS.VinfoModal.default : ENUMS.VinfoModal.sheet;
    const modalProps = useVinfoModal(modalType, viewType === ENUMS.AppViewType.desktop ? {} : { initialBreakpoint: 0.69, breakpoints: [0, 0.69, 1] });

    const store = inventory?.store ?? null;
    const storePhoto = store?.primary_photo_url ?? store?.store_photos?.[0].full_url;

    return (
        <div className={Layout.VinfoBlock(viewType, "contactus")}>
            <Modal id="ContactUsModal" useCloseBtn={false} modalProps={modalProps} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div id="ContactOpts" className="flexblock cols stretch">
                    <Divider size="large" text="Contact Us" />
                    <div id="dealership">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="3"><IonAvatar><img alt={store.name} src={storePhoto} /></IonAvatar></IonCol>
                                <IonCol size="9">
                                    <h5 className="creds">
                                        <span className="name">{store?.name}</span>
                                        <span className={`job ${store.hours.open_now ? "green" : "red"}`}>{store.hours.open_now ? "open now" : "closed"}</span>
                                    </h5>
                                    <div className="methods flexblock cols gap-ten">
                                        <div className="flexblock gap-ten aln-cnt">
                                            <IonIcon icon={locationOutline} size="large" />
                                            <div className="contact">
                                                {store.address1} {store.address2}, {store.city}, {store.state}, {store.zip}
                                            </div>
                                        </div>
                                        <div className="flexblock gap-ten aln-cnt">
                                            <IonIcon icon={callOutline} />
                                            <div className="contact">
                                                {Helpers.formatPhone(parseInt(store.sales_phone.toString(), 10))}
                                            </div>
                                        </div>
                                        {store.sales_email && <div className="flexblock gap-ten aln-cnt">
                                            <IonIcon icon={mailOutline} />
                                            <div className="contact">
                                                {store.sales_email}
                                            </div>
                                        </div>}
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                    <Divider text="SALESPERSON" />
                    <div id="salesperson">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="3"><IonAvatar><img src={share.salesperson.photo_url} alt="Salesperson" /></IonAvatar></IonCol>
                                <IonCol size="9">
                                    <h5 className="creds">
                                        <span className="name">{share.salesperson.name}</span>
                                        <span className="job">{share.salesperson.job_title_name}</span>
                                    </h5>
                                    <div className="methods flexblock cols gap-ten">
                                        <div className="flexblock gap-ten aln-cnt">
                                            <IonIcon icon={phonePortraitOutline} />
                                            <div className="contact">
                                                {Helpers.formatPhone(parseInt(share.salesperson.phone, 10))}
                                            </div>
                                        </div>
                                        {share.salesperson.email && <div className="flexblock gap-ten aln-cnt">
                                            <IonIcon icon={mailOutline} />
                                            <div className="contact">
                                                {share.salesperson.email}
                                            </div>
                                        </div>}
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>
                    <IonButton color="primary" expand="block" onClick={() => setIsOpen(false)}>Close</IonButton>
                </div>
            </Modal>
            <br />
            <div className="fancy-btn" onClick={() => setIsOpen(true)}>
                <span>Contact Us!</span>
            </div>
        </div>
    )
}