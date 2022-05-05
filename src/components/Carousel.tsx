import { useState } from "react";
import { IonIcon, IonImg } from "@ionic/react";
import { ENUMS, Helpers } from "../utils";
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

const CarouselItem = ({ item, itemClass }: { item: APP.CarouselItem, itemClass: string }) => {
    const { photo, document } = item;
    if (photo) return <IonImg key={photo.url} src={photo.url} className={itemClass} />;
    else if (document) return <IonImg key={document.full_url} src={document.full_url} className={itemClass} />;
    else return <span />;
}

const StandardCarousel = ({ items }: APP.Carousel) => {
    const [active, setActive] = useState(0);
    const canSlide = items?.length > 1 ?? false;

    return (
        <div className="carousel">
            {canSlide && <div className="prev">
                <IonIcon icon={caretBack} onClick={() => setActive(Helpers.setIndex.prev(active, items.length - 1))} />
            </div>}
            <div className="animated">
                {items.map((photo, index) => (<CarouselItem key={photo.id} item={{ photo }} itemClass={`slide${index === active ? " center" : ""}`} />))}
            </div>
            {canSlide && <div className="next">
                <IonIcon icon={caretForward} onClick={() => setActive(Helpers.setIndex.next(active, items.length - 1))} />
            </div>}
        </div>
    )
}

const SwipeCarousel = ({ items }: APP.Carousel) => {
    return (
        <Swiper
            modules={[Keyboard, Pagination, Zoom]}
            keyboard={true}
            pagination={true}
            zoom={true}>
            {items.map((photo, key) => (<SwiperSlide key={`${key}-photo`}><CarouselItem item={{ photo }} itemClass="swipe-slide" /></SwiperSlide>))}
        </Swiper>
    )
}

const MaxCarousel = ({ items }: APP.Carousel) => {
    const [active, setActive] = useState(0);
    const canSlide = items?.length > 1 ?? false;
    return (
        <div className="carousel">
            {canSlide && <div className="prev">
                <IonIcon icon={caretBack} onClick={() => setActive(Helpers.setIndex.prev(active, items.length - 1))} />
            </div>}
            <div className="animated">
                {items.map((photo, index) => (<CarouselItem item={{ photo }} itemClass={`slide${index === active ? " center" : ""}`} />))}
            </div>
            {canSlide && <div className="next">
                <IonIcon icon={caretForward} onClick={() => setActive(Helpers.setIndex.next(active, items.length - 1))} />
            </div>}
        </div>
    )
}

export const Carousel = (carousel: APP.Carousel) => {
    const type = carousel.type ?? ENUMS.VinfoCarousel.standard;
    switch (type) {
        case ENUMS.VinfoCarousel.swipe:
            return <SwipeCarousel {...carousel} />;
        case ENUMS.VinfoCarousel.max:
            return <MaxCarousel {...carousel} />;
        default:
            return <StandardCarousel {...carousel} />;
    }
}
