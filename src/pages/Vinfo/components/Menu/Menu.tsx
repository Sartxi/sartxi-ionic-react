import { IonImg } from "@ionic/react";
import { Enums, Helpers, Layout } from "../../../../utils";
import { useSectionPositions } from "../../Hooks";

import "./Menu.scss";

export const Menu = (layout: VINFO.Layout) => {
	return (
		<div id="Menu" className={Layout.VinfoBlock(layout.page.viewType)}>
			{layout.page.viewType === Enums.AppViewType.mobile ? <MobileMenu {...layout} /> : <DesktopMenu {...layout} />}
		</div>
	);
};

const useVinfoMenu = (): { sections: Enums.VinfoSection[], isActive: (selector: Enums.VinfoSection, section: Enums.VinfoSection) => boolean } => {
	return {
		sections: Helpers.arrayFromEnum(Enums.VinfoSection) as Enums.VinfoSection[],
		isActive: (sec, sel) => sec === sel
	}
}

const DesktopMenu = ({ section, setSection, page }: VINFO.Layout) => {
	const { sections, isActive } = useVinfoMenu();
	return (
		<div id="DesktopMenu" className={Layout.VinfoBlock(page.viewType, "positioned space rounded shaded")}>
			{sections.map(item => {
				const selector = Enums.VinfoSection[item];
				const active = isActive(selector, section);
				return (
					<div key={item} className={`item${active ? " active" : ""}`} onClick={() => setSection(selector)}>
						<span className="item-text">{item}</span>
					</div>
				)
			})}
		</div>
	)
}

const MobileMenu = ({ section, setSection, prefersDark }: VINFO.Layout) => {
	const positions = useSectionPositions(section);
	const { sections, isActive } = useVinfoMenu();

	const makeSelection = (selector: Enums.VinfoSection, position: Enums.VinfoMenuPosition) => {
		setSection(selector);
		const menu = document.getElementById("MobileMenu");
		if (menu) Layout.HandleMenuSelection(menu, position);
	}

	return (
		<div id="MobileMenu" className="positioned">
			{sections.map((item, index) => {
				const position = positions[index];
				const selector = Enums.VinfoSection[item];
				const active = isActive(selector, section);
				return (
					<div key={item} className={`item${active ? " active" : ""} ${position}`} onClick={() => makeSelection(selector, position)}>
						<IonImg className="menu-icon" src={Layout.SectionIcon(selector, active ? true : prefersDark)} />
						<span className="item-text">{active ? "" : item}</span>
					</div>
				)
			})}
		</div>
	)
}