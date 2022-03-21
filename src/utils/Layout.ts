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
	export const HandlePgTransition = (selector: Enums.VinfoSection, position: Enums.VinfoMenuPosition) => {
		const inventory = document.getElementById("InvContent");
		const salesperson = document.getElementById("Salesperson");
		const dealership = document.getElementById("Dealership");

		const setElemAttrs: any = (elem: HTMLElement, index: number) => {
			const slidePosition = ["left", "center", "right"];
			elem.classList.remove("left", "center", "right");
			elem.classList.add("slide", slidePosition[index]);
		}

		switch (selector) {
			case Enums.VinfoSection.inventory:
				[salesperson, inventory, dealership].forEach(setElemAttrs);
				break;
			case Enums.VinfoSection.salesperson:
				[dealership, salesperson, inventory].forEach(setElemAttrs);
				break;
			case Enums.VinfoSection.dealership:
				[inventory, dealership, salesperson].forEach(setElemAttrs);
				break;
			default:
				break;
		}

	}
	export const HandleMenuAnimations = (position: Enums.VinfoMenuPosition) => {
		if (menuEventActions.includes(position)) document.querySelectorAll(".section")?.forEach(element => {
			Helpers.animateElemByClass(element, "left", position === "right" ? "fadeIn 4s" : "leftCenter 1s");
			Helpers.animateElemByClass(element, "center", position === "right" ? "centerLeft 1s" : "centerRight 1s");
			Helpers.animateElemByClass(element, "right", position === "right" ? "rightCenter 1s" : "fadeIn 4s");
		});
	}
}

