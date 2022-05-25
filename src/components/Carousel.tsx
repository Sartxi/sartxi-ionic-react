import { useEffect, useState } from "react";
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

const useAltKeys = (items: any, altkeys: string[]): string[] => {
    const [keys, setKeys] = useState<string[]>([]);

    useEffect(() => {
        const altKeys: string[] = [];
        // map all possible alts and frisk for uniqueness
        items.forEach((item: any, key: number) => {
            let hasAlt = false;
            [...altkeys.map(i => item[i]).filter(i => i && i !== null), `item ${key}`].forEach(alt => {
                if (!altKeys.includes(alt) && !hasAlt) {
                    altKeys.push(alt);
                    hasAlt = true;
                }
            });
        });
        if (altKeys.length) setKeys(altKeys);
    }, [items, altkeys]);

    return keys;
}

const Standard = (carousel: APP.CarouselCtrl) => {
    const { items, active, setActive, max, setMax, onClose, itemkey, altkeys } = carousel;
    const [cId] = useState(Helpers.uuid());
    const altKeys = useAltKeys(items, altkeys);

    const canSlide = items?.length > 1 ?? false;
    const canMax = () => {
        const firstItem: any = items[0];
        return !firstItem[itemkey]?.includes("default_vehicle_image");
    };

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

                <div id="CarouselItems" className={`item animated`} onClick={() => canMax() && setMax(true)}>
                    {items.map((item, index) => (<Item key={Helpers.uuid()} itemkey={itemkey} alt={altKeys[index]} item={item} itemClass={`slide${index === active ? " active" : ""}`} />))}
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

const Swipe = ({ items, altkeys, itemkey }: APP.CarouselCtrl) => {
    const altKeys = useAltKeys(items, altkeys);
    return (
        <Swiper
            modules={[Keyboard, Pagination, Zoom]}
            keyboard={true}
            pagination={true}
            zoom={true}>
            {items.map((item, index) => (
                <SwiperSlide key={Helpers.uuid()}>
                    <Item item={item} itemkey={itemkey} itemClass="swipe-slide" alt={altKeys[index]} />
                </SwiperSlide>)
            )}
        </Swiper>
    )
}

const Item = ({ item, itemClass, itemkey, alt }: { item: any, itemClass: string, itemkey: string, alt: string }) => {
    const src = item[itemkey];
    if (item) return <IonImg src={src} className={itemClass} alt={alt} />;
    else return <span />;
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

const Bullets = ({ items, active, max, setActive, onClose, setMax, preference, itemkey }: APP.CarouselCtrl) => {
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
                    <Item item={item} itemkey={itemkey} itemClass={`slide${activeClass}`} alt="diofna" />
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
