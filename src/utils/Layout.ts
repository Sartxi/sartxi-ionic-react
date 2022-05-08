import { menuEventActions } from "../Config";
import { ENUMS, Helpers } from "./";

const ViewType = () => {
	const res = window.innerWidth;
	let type = ENUMS.AppViewType.mobile;
	if (res < 768) type = ENUMS.AppViewType.mobile;
	else if (res >= 768 && res < 990) type = ENUMS.AppViewType.tablet;
	else if (res >= 990) type = ENUMS.AppViewType.desktop;
	return type;
};
const VinfoBlock = (viewType: ENUMS.AppViewType, decorators?: string) => `block ${ENUMS.AppViewType[viewType]} ${decorators ? decorators : "simple"}`
const SectionIcon = (section: ENUMS.VinfoSection, prefersDark: boolean) => `/assets/images/icon_${section}_${prefersDark ? "dark" : "light"}.svg`;
const HandleMenuSelection = (menu: HTMLElement, position: ENUMS.VinfoMenuPosition) => {
	const animateLeft: string[] = ["fadeIn 4s", "centerLeft 1s", "rightCenter 1s"];
	const animateRight: string[] = ["leftCenter 1s", "centerRight 1s", "fadeIn 4s"];
	const animation: string[] = position === ENUMS.VinfoMenuPosition.right ? animateLeft : animateRight;
	const positions: any[] = Helpers.arrayFromEnum(ENUMS.VinfoMenuPosition);
	if (menuEventActions.includes(position)) Array.from(menu.children).forEach(element => positions.forEach((position, index) => Helpers.animateElemByClass(element, position, animation[index])));
}

export const Layout = {
	ViewType,
	VinfoBlock,
	SectionIcon,
	HandleMenuSelection
}

