import { useEffect, useState } from "react";
import { Enums, Helpers } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";
import { Carousel, Modal } from "../../../../components";

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
            <div className={`item-photo ${showPhotos ? "flexblock stretch gap-ten" : ""}`}>
                <img alt={Helpers.vehicleTitle(page?.vinfo?.inventory, true)} src={photo} onClick={() => setIsOpen(true)} />
                {showPhotos ? <div className="photo-tiles">{photos.map(ph => (<img key={ph.id} alt={`Vehicle${ph.id}`} src={ph.url} onClick={() => setIsOpen(true)} />))}</div> : ""}
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
            <Carousel photos={photos} />
        </div>
    )
}