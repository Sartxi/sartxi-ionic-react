import { Enums } from "../../../../utils";

export const useMenuItemPosition = (section: Enums.VinfoSection): Enums.VinfoMenuPosition[] => {
    const vsp: Enums.VinfoMenuPosition[] = Object.values(Enums.VinfoMenuPosition).map(section => section);
    let positions = vsp;
    switch (section) {
        case Enums.VinfoSection.salesperson:
            positions = [vsp[1], vsp[2], vsp[0]];
            break;
        case Enums.VinfoSection.dealership:
            positions = [vsp[2], vsp[0], vsp[1]];
            break;
        default:
            break;
    }
    return positions;
}