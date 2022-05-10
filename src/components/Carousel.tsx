import { useState } from "react";
import { IonIcon, IonImg } from "@ionic/react";
import { ENUMS, Helpers } from "../utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Zoom } from "swiper";
import { caretBack, caretForward, closeCircleOutline } from "ionicons/icons";
import { useArrowCtrls } from "../utils/Hooks";
import { DocumentBtn } from "../pages/Vinfo/components";
import { Popup } from "./";

import "@ionic/react/css/ionic-swiper.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/zoom";

import "./Components.scss";

const Standard = (carousel: APP.CarouselCtrl) => {
    const [cId] = useState(Helpers.uuid());
    const { items, active, setActive, max, setMax, onClose, altkey } = carousel;
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
                {canSlide && (
                    <Popup text="Previous" elemId={`prev-${cId}`} position={ENUMS.PopPos.left}>
                        <Arrow id={`prev-${cId}`} dir="prev" wrap={true} callback={() => setActive(Helpers.setIndex.prev(active, items.length - 1))} />
                    </Popup>
                )}

                <div id="CarouselItems" className={`item animated`} onClick={() => setMax(true)}>
                    {items.map((item, index) => (<Item key={Helpers.uuid()} altkey={altkey} item={item} itemClass={`slide${index === active ? " active" : ""}`} />))}
                </div>

                {canSlide && (
                    <Popup text="Next" elemId={`next-${cId}`} position={ENUMS.PopPos.right}>
                        <Arrow id={`next-${cId}`} dir="next" wrap={true} callback={() => setActive(Helpers.setIndex.next(active, items.length - 1))} />
                    </Popup>
                )}
                {canSlide && !max && <Bullets {...carousel} />}
            </div>
        </>
    )
}

const Swipe = ({ items, altkey }: APP.CarouselCtrl) => {
    return (
        <Swiper
            modules={[Keyboard, Pagination, Zoom]}
            keyboard={true}
            pagination={true}
            zoom={true}>
            {items.map(item => (
                <SwiperSlide key={Helpers.uuid()}>
                    <Item item={item} itemClass="swipe-slide" altkey={altkey} />
                </SwiperSlide>)
            )}
        </Swiper>
    )
}

const useAltKey = (item: any, altkey: string[]): string => {
    const alts = altkey.map(key => (item[key]));
    return alts.find(i => i !== null) ?? "Carousel Item";
}

const Item = ({ item, itemClass, altkey }: { item: any, itemClass: string, altkey: string[] }) => {
    const alt = useAltKey(item, altkey);
    const src = item?.url ?? item?.full_url;
    if (item) return <IonImg src={src} className={itemClass} alt={alt} />;
    else return <span />;
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

const Arrow = ({ dir, wrap, callback, name, id }: { dir: string, wrap: boolean, name?: string, callback: () => void, id: string }) => {
    const icon = dir === "prev" ? caretBack : caretForward;
    if (wrap) return (
        <div className={dir}>
            <IonIcon id={id} icon={icon} onClick={callback} />
        </div>
    )
    else return <IonIcon id={id} className={name} icon={icon} onClick={callback} />;
}

const Bullets = ({ items, active, max, setActive, onClose, setMax, preference, altkey }: APP.CarouselCtrl) => {
    const bullets = items.map(i => ({ ...i, key: Helpers.uuid() }));
    const bulletIndxs = bullets.map(i => i.key);
    const { chunks, chunkIndx, bltIndx } = useChunks(bullets, active);

    const tapBullet = (i: any) => setActive(bulletIndxs.indexOf(i.key));
    const getBullet = (item: any, index: number) => {
        const hasDocId = item.vehicle_document_type_id;
        const activeClass = index === bltIndx ? " active" : "";
        const key = Helpers.uuid();
        if (max) return (
            <span key={key} onClick={() => tapBullet(item)}>
                {hasDocId ? (
                    <Popup elemId={key} text={item.name ?? "Document"} position={ENUMS.PopPos.bottom}>
                        <DocumentBtn btnkey={key} doc={item} btnstate={`slide-btn${activeClass}`} preference={preference} showIcon={true} callback={() => tapBullet(item)} />
                    </Popup>
                ) : (
                    <Item item={item} altkey={altkey} itemClass={`slide${activeClass}`} />
                )}
            </span>
        );
        else return <span key={Helpers.uuid()} onClick={() => tapBullet(item)} className={`bullet${activeClass}`}></span>;
    }

    const needsNav = chunks.length > 1;
    const needsPrev = needsNav && chunkIndx > 0;
    const needsNext = needsNav && chunkIndx !== chunks.length - 1;

    return (
        <div className={max ? "item-slides" : "bullets"}>
            <div className="wrap">
                {needsPrev && <Arrow dir="prev" id="PrevBltArrow" name="blt-nav" wrap={false} callback={() => tapBullet(chunks[chunkIndx - 1][5])} />}
                {chunks[chunkIndx].map(getBullet)}
                {needsNext && <Arrow dir="next" id="NxtBltArrow" name="blt-nav" wrap={false} callback={() => tapBullet(chunks[chunkIndx + 1][0])} />}
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
    if (type === ENUMS.VinfoCarousel.swipe) return <Swipe {...props} />;
    return <Standard {...props} />;
}
