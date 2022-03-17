import { Enums } from "./Enums";

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
}

