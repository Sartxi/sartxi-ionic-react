import { useState } from "react";
import { IonIcon, IonImg } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Zoom } from "swiper";
import { caretBack, caretForward } from "ionicons/icons";

import "@ionic/react/css/ionic-swiper.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

export const Carousel = ({ photos }: { photos: VINFO.Photo[] }) => {
    const [active, setActive] = useState(0);
    const canSlide = photos?.length > 1 ?? false;
    const goPrev = () => setActive(active === 0 ? photos.length - 1 : active - 1);
    const goNext = () => setActive(active === photos.length - 1 ? 0 : active + 1);

    return (
        <div className="carousel">
            {canSlide && <div className="prev">
                <IonIcon icon={caretBack} onClick={goPrev} />
            </div>}
            <div className="animated">
                {photos.map((photo, index) => (<IonImg key={photo.url} src={photo.url} className={`slide${index === active ? " center" : ""}`} />))}
            </div>
            {canSlide && <div className="next">
                <IonIcon icon={caretForward} onClick={goNext} />
            </div>}
        </div>
    )
}

export const SwipeCarousel = ({ photos }: { photos: VINFO.Photo[] }) => {
    return (
        <Swiper
            modules={[Keyboard, Pagination, Zoom]}
            keyboard={true}
            pagination={true}
            zoom={true}>
            {photos.map((photo, key) => (<SwiperSlide key={`${key}-photo`}><IonImg src={photo.url || photo.full_url} /></SwiperSlide>))}
        </Swiper>
    )
}