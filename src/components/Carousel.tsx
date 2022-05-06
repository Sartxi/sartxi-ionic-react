import { useEffect, useState } from "react";
import { IonIcon, IonImg } from "@ionic/react";
import { ENUMS, Helpers } from "../utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Zoom } from "swiper";
import { caretBack, caretForward, closeCircleOutline } from "ionicons/icons";

import "@ionic/react/css/ionic-swiper.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

import "./Components.scss";

const CarouselItem = ({ item, itemClass }: { item: any, itemClass: string }) => {
    /// decide if document or photo
    const src = item?.url ?? item?.full_url;
    if (item) return <IonImg key={src} src={src} className={itemClass} />;
    else return <span />;
}

const StandardCarousel = ({ items, active, setActive, max, setMax, onClose }: APP.CarouselCtrl) => {
    const canSlide = items?.length > 1 ?? false;
    const closeMax = () => {
        onClose?.();
        setMax(false);
    }
    return (
        <>
            {max ? <div className="backdrop" onClick={closeMax} /> : ""}
            <div className={`carousel${max ? " max" : ""}`}>
                {canSlide && max && <div className="item-slides">
                    <div className="item-slide-wrap">
                        {items.map((photo, index) => (<span key={photo.id} onClick={() => setActive(index)}><CarouselItem item={photo} itemClass={`slide${index === active ? " center" : ""}`} /></span>))}
                        <span className="close-icon">
                            <IonIcon icon={closeCircleOutline} size="large" onClick={closeMax} />
                        </span>
                    </div>
                </div>}
                {canSlide && <div className="prev">
                    <IonIcon icon={caretBack} onClick={() => setActive(Helpers.setIndex.prev(active, items.length - 1))} />
                </div>}
                <div className={`item animated`} onClick={() => setMax(true)}>
                    {items.map((item, index) => (<CarouselItem key={item.id} item={item} itemClass={`slide${index === active ? " center" : ""}`} />))}
                </div>
                {canSlide && <div className="next">
                    <IonIcon icon={caretForward} onClick={() => setActive(Helpers.setIndex.next(active, items.length - 1))} />
                </div>}
                {canSlide && !max && <div className="bullets">
                    <div className="bullet-wrap">
                        {items.map((photo, index) => (<span key={photo.id} onClick={() => setActive(index)} className={`bullet${index === active ? " active" : ""}`}></span>))}
                    </div>
                </div>}
            </div>
        </>
    )
}

const SwipeCarousel = ({ items }: APP.CarouselCtrl) => {
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

export const Carousel = (carousel: APP.Carousel) => {
    const [active, setActive] = useState(carousel.defaultIndex || 0);
    const [max, setMax] = useState(carousel.type === ENUMS.VinfoCarousel.max);

    useEffect(() => {
        document.onkeydown = (e: any) => {
            e = e || window.event;
            if (max) {
                if (e.keyCode == "40") setMax(false);
                else if (e.keyCode == "37") setActive(Helpers.setIndex.prev(active, carousel.items.length - 1));
                else if (e.keyCode == "39") setActive(Helpers.setIndex.next(active, carousel.items.length - 1));
            }
        };
    }, [max, active, setActive])

    const props: APP.CarouselCtrl = { ...carousel, active, setActive, max, setMax };
    const type = carousel.type ?? ENUMS.VinfoCarousel.standard;
    if (type === ENUMS.VinfoCarousel.swipe) return <SwipeCarousel {...props} />;
    return <StandardCarousel {...props} />;
}
