import { useState } from "react";
import { IonIcon, IonImg } from "@ionic/react";
import { ENUMS, Helpers } from "../utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Zoom } from "swiper";
import { caretBack, caretForward, closeCircleOutline } from "ionicons/icons";
import { useArrowCtrls } from "../utils/Hooks";

import "@ionic/react/css/ionic-swiper.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

import "./Components.scss";

const Arrow = ({ dir, wrap, callback, name }: { dir: string, wrap: boolean, name?: string, callback: () => void }) => {
    const icon = dir === "prev" ? caretBack : caretForward;
    if (wrap) return (
        <div className={dir}>
            <IonIcon icon={icon} onClick={callback} />
        </div>
    )
    else return <IonIcon className={name} icon={icon} onClick={callback} />;
}

const CarouselItem = ({ item, itemClass }: { item: any, itemClass: string }) => {
    /// decide if document or photo
    const src = item?.url ?? item?.full_url;
    if (item) return <IonImg src={src} className={itemClass} />;
    else return <span />;
}

const StandardCarousel = (carousel: APP.CarouselCtrl) => {
    const { items, active, setActive, max, setMax, onClose } = carousel;
    const canSlide = items?.length > 1 ?? false;
    const closeMax = () => {
        onClose?.();
        setMax(false);
    };

    return (
        <>
            {max ? <div className="backdrop" onClick={closeMax} /> : ""}
            <div className={`carousel${max ? " max" : ""}`}>
                {canSlide && max && <Bullets {...carousel} />}
                {canSlide && <Arrow dir="prev" wrap={true} callback={() => setActive(Helpers.setIndex.prev(active, items.length - 1))} />}
                <div className={`item animated`} onClick={() => setMax(true)}>
                    {items.map((item, index) => (<CarouselItem key={Helpers.uuid()} item={item} itemClass={`slide${index === active ? " center" : ""}`} />))}
                </div>
                {canSlide && <Arrow dir="next" wrap={true} callback={() => setActive(Helpers.setIndex.next(active, items.length - 1))} />}
                {canSlide && !max && <Bullets {...carousel} />}
            </div>
        </>
    )
}

const useChunks = (bullets: any[], active: number, chunksize = 6) => {
    const chunks = [];
    const bullet = bullets[active];
    let bltIndx = active;
    let chunkIndx = 0;
    for (let i = 0; i < bullets.length; i += chunksize) {
        const chunk = bullets.slice(i, i + chunksize);
        chunks.push(chunk);
        const index = chunk.indexOf(bullet);
        if (index > -1) {
            bltIndx = index;
            chunkIndx = chunks.indexOf(chunk);
        }
    }
    return { chunks, chunkIndx, bltIndx };
}

const Bullets = ({ items, active, max, setActive, onClose, setMax }: APP.CarouselCtrl) => {
    const bullets = items.map(i => ({ ...i, key: Helpers.uuid() }));
    const bulletIndxs = bullets.map(i => i.key);
    const { chunks, chunkIndx, bltIndx } = useChunks(bullets, active);

    const tapBullet = (i: any) => setActive(bulletIndxs.indexOf(i.key));
    const getBullet = (item: any, index: number) => {
        if (max) return <span key={Helpers.uuid()} onClick={() => tapBullet(item)}><CarouselItem item={item} itemClass={`slide${index === bltIndx ? " center" : ""}`} /></span>;
        else return <span key={Helpers.uuid()} onClick={() => tapBullet(item)} className={`bullet${index === bltIndx ? " center" : ""}`}></span>;
    }

    const needsNav = chunks.length > 1;
    const needsPrev = needsNav && chunkIndx > 0;
    const needsNext = needsNav && chunkIndx !== chunks.length - 1;

    return (
        <div className={max ? "item-slides" : "bullets"}>
            <div className="wrap">
                {needsPrev && <Arrow dir="prev" name="blt-nav" wrap={false} callback={() => tapBullet(chunks[chunkIndx - 1][5])} />}
                {chunks[chunkIndx].map(getBullet)}
                {needsNext && <Arrow dir="next" name="blt-nav" wrap={false} callback={() => tapBullet(chunks[chunkIndx + 1][0])} />}
                {max && (
                    <span className="close-icon">
                        <IonIcon icon={closeCircleOutline} size="large" onClick={() => {
                            onClose?.();
                            setMax(false);
                        }} />
                    </span>
                )}
            </div>
        </div >
    )
}

const SwipeCarousel = ({ items }: APP.CarouselCtrl) => {
    return (
        <Swiper
            modules={[Keyboard, Pagination, Zoom]}
            keyboard={true}
            pagination={true}
            zoom={true}>
            {items.map((photo, key) => (<SwiperSlide key={Helpers.uuid()}><CarouselItem item={{ photo }} itemClass="swipe-slide" /></SwiperSlide>))}
        </Swiper>
    )
}

export const Carousel = (carousel: APP.Carousel) => {
    const [active, setActive] = useState(carousel.defaultIndex || 0);
    const [max, setMax] = useState(carousel.type === ENUMS.VinfoCarousel.max);

    useArrowCtrls({
        btm: () => setMax(false),
        lft: () => setActive(Helpers.setIndex.prev(active, carousel.items.length - 1)),
        rgt: () => setActive(Helpers.setIndex.next(active, carousel.items.length - 1))
    }, max);

    const props: APP.CarouselCtrl = { ...carousel, active, setActive, max, setMax };
    const type = carousel.type ?? ENUMS.VinfoCarousel.standard;
    if (type === ENUMS.VinfoCarousel.swipe) return <SwipeCarousel {...props} />;
    return <StandardCarousel {...props} />;
}
