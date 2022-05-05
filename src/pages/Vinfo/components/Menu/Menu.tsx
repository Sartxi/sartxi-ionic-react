import { IonImg } from "@ionic/react";
import { ENUMS, Helpers, Layout } from "../../../../utils";
import { useSectionPositions } from "../../Hooks";

import "./Menu.scss";

export const Menu = (layout: VINFO.Layout) => {
	const itemText = (selector: ENUMS.VinfoSection, item: string) => (selector === ENUMS.VinfoSection.vehicle ? `${layout.page.vinfo.inventory.year} ${layout.page.vinfo.inventory.make}` : item);
	const layoutProps = { ...layout, itemText };
	return (
		<div id="Menu" className={Layout.VinfoBlock(layout.page.viewType)}>
			{layout.page.viewType === ENUMS.AppViewType.desktop ? <span /> : <MobileMenu {...layoutProps} />}
		</div>
	);
};

const useVinfoMenu = (): { sections: ENUMS.VinfoSection[], isActive: (selector: ENUMS.VinfoSection, section: ENUMS.VinfoSection) => boolean } => {
	return {
		sections: Helpers.arrayFromEnum(ENUMS.VinfoSection) as ENUMS.VinfoSection[],
		isActive: (sec, sel) => sec === sel
	}
}

const MobileMenu = ({ section, setSection, prefersDark, itemText }: VINFO.Layout) => {
	const positions = useSectionPositions(section);
	const { sections, isActive } = useVinfoMenu();

	const makeSelection = (selector: ENUMS.VinfoSection, position: ENUMS.VinfoMenuPosition) => {
		setSection(selector);
		const menu = document.getElementById("MobileMenu");
		if (menu) Layout.HandleMenuSelection(menu, position);
	}

	return (
		<div id="MobileMenu" className="positioned">
			{sections.map((item, index) => {
				const position = positions[index];
				const selector = ENUMS.VinfoSection[item];
				const active = isActive(selector, section);
				return (
					<div key={item} className={`item${active ? " active" : ""} ${position}`} onClick={() => makeSelection(selector, position)}>
						<IonImg className="menu-icon" src={Layout.SectionIcon(selector, active ? true : prefersDark)} />
						<span className="item-text">{active ? "" : itemText(selector, item)}</span>
					</div>
				)
			})}
		</div>
	)
}
