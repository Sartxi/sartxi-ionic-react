import { Layout } from "../../../../utils";

export const ContactUs = ({ viewType, vinfo }: VINFO.Page) => {
    return (
        <div className={Layout.VinfoBlock(viewType)}>
            <br />
            <div className="fancy-contact-btn" onClick={() => console.log("contact us:", vinfo)}>
                <span>Contact Us!</span>
            </div>
        </div>
    )
}