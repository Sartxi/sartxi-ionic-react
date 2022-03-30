import { menuEventActions } from "../Config";
import { Enums } from "./Enums";
import { Helpers } from "./Helpers";

export namespace Layout {
	export const ViewType = () => {
		const res = window.innerWidth;
		let type = Enums.AppViewType.mobile;
		if (res <= 768) type = Enums.AppViewType.mobile;
		else if (res >= 990) type = Enums.AppViewType.desktop;
		else type = Enums.AppViewType.tablet;
		return type;
	};
	export const VinfoBlock = (viewType: Enums.AppViewType, decorators?: string) => `block ${Enums.AppViewType[viewType]} ${decorators ? decorators : "simple"}`
	export const SectionIcon = (section: Enums.VinfoSection, prefersDark: boolean) => `/assets/images/icon_${section}_${prefersDark ? "dark" : "light"}.png`;
	export const HandleMenuSelection = (menu: HTMLElement, position: Enums.VinfoMenuPosition) => {
		const rotateLeft: string[] = ["fadeIn 4s", "centerLeft 1s", "rightCenter 1s"];
		const rotateRight: string[] = ["leftCenter 1s", "centerRight 1s", "fadeIn 4s"];
		const animation: string[] = position === Enums.VinfoMenuPosition.right ? rotateLeft : rotateRight;
		const positions: any[] = Helpers.arrayFromEnum(Enums.VinfoMenuPosition);
		if (menuEventActions.includes(position)) Array.from(menu.children).forEach(element => positions.forEach((position, index) => Helpers.animateElemByClass(element, position, animation[index])));
	}
}

