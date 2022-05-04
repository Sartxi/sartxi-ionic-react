import { useEffect, useState } from "react";
import { Enums, Helpers } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";
import { SwipeCarousel, Modal } from "../../../../components";

interface InvPhotoProps extends APP.ModalContentProps {
    photos: VINFO.Photo[];
}

export const VehPhotos = (page: VINFO.Page) => {
    const [isOpen, setIsOpen] = useState(false);
    const photos = page?.vinfo?.inventory?.inventory_item_photos ?? [];
    const photo = photos?.[0]?.url ?? undefined;

    const modalProps = useVinfoModal(Enums.VinfoModal.default, page.viewType === Enums.AppViewType.desktop ? { cssClass: "large" } : undefined);
    const showPhotos = page.viewType === Enums.AppViewType.desktop && photos.length >= 2 ? true : false;

    return (
        <>
            <Modal id="InvPhotos" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)}>
                <InvPhotos photos={photos} />
            </Modal>
            <div className={`item-photo`}>
                <img alt={Helpers.vehicleTitle(page?.vinfo?.inventory, true)} src={photo} onClick={() => setIsOpen(true)} />
            </div>
        </>
    )
}

const InvPhotos = ({ photos, settitle }: InvPhotoProps) => {
    useEffect(() => {
        settitle?.("Inventory Photos");
    }, [settitle]);

    return (
        <div className="flexblock fill center">
            <SwipeCarousel photos={photos} />
        </div>
    )
}

