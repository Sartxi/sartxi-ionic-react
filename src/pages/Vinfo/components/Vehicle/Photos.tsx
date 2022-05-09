import { useEffect, useState } from "react";
import { ENUMS, Helpers } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";
import { Carousel, Modal } from "../../../../components";
import { useDarkMode } from "../../Hooks";

interface InvPhotoProps extends APP.ModalContentProps {
    photos: VINFO.Photo[];
    preference: string;
}

export const VehPhotos = (page: VINFO.Page) => {
    const [isOpen, setIsOpen] = useState(false);
    const photos = page?.vinfo?.inventory?.inventory_item_photos ?? [];
    const photo = photos?.[0]?.url ?? undefined;
    const modalProps = useVinfoModal(ENUMS.VinfoModal.default, page.viewType === ENUMS.AppViewType.desktop ? { cssClass: "large" } : undefined);
    const prefersDark = useDarkMode(page.vinfo?.theme);

    return (
        <>
            <Modal id="InvPhotos" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)}>
                <InvPhotos photos={photos} preference={prefersDark ? "dark" : "light"} />
            </Modal>
            <div className={`item-photo`}>
                <img alt={Helpers.vehicleTitle(page?.vinfo?.inventory, true)} src={photo} onClick={() => setIsOpen(true)} />
            </div>
        </>
    )
}

const InvPhotos = ({ photos, settitle, preference }: InvPhotoProps) => {
    useEffect(() => {
        settitle?.("Inventory Photos");
    }, [settitle]);

    return (
        <div className="flexblock fill center">
            <Carousel type={ENUMS.VinfoCarousel.swipe} altkey={["url"]} items={photos} preference={preference} />
        </div>
    )
}

