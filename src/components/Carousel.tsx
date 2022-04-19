import { IonImg } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Zoom } from "swiper";

import "@ionic/react/css/ionic-swiper.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

export const Carousel = ({ photos }: { photos: VINFO.Photo[] }) => {
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