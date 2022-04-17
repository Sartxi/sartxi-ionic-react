import { closeCircleOutline } from "ionicons/icons";
import { IonImg, IonIcon } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Zoom } from "swiper";

import "@ionic/react/css/ionic-swiper.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

export const InvPhotoSwiper = ({ photos, onClose }: { photos: VINFO.Photo[], onClose: () => void }) => {
    return (
        <div className="photo-carousel">
            <div className="tools">
                <IonIcon icon={closeCircleOutline} color="white" size="large" onClick={() => onClose()} />
            </div>
            <Swiper
                modules={[Keyboard, Pagination, Zoom]}
                keyboard={true}
                pagination={true}
                zoom={true}>
                {photos.map((photo, key) => (<SwiperSlide key={`${key}-photo`}><IonImg src={photo.url} /></SwiperSlide>))}
            </Swiper>
        </div>
    )
}