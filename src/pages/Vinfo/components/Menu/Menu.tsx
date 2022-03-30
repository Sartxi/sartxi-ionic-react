import { IonImg } from "@ionic/react";
import { Enums, Layout } from "../../../../utils";
import { useSectionPositions } from "./hooks";
import "./Menu.scss";

export const Menu = (layout: VINFO.Layout) => {
	return (
		<div id="Menu" className={Layout.VinfoBlock(layout.page.viewType)}>
			{layout.page.viewType === Enums.AppViewType.mobile ? <MobileMenu {...layout} /> : <span>Desktop Menu</span>}
		</div>
	);
};

const MobileMenu = ({ section, setSection, prefersDark }: VINFO.Layout) => {
	const positions = useSectionPositions(section);
	const sections: Enums.VinfoSection[] = Object.values(Enums.VinfoSection).map(id => id);
	const isActive = (selector: Enums.VinfoSection) => section === selector;

	const makeSelection = (selector: Enums.VinfoSection, position: Enums.VinfoMenuPosition) => {
		setSection(selector);
		const menu = document.getElementById("MobileMenu");
		if (menu) Layout.HandleMenuSelection(menu, position);
	}

	return (
		<div id="MobileMenu" className="positioned">
			{sections.map((item, index) => {
				const id = `Sec${item}`;
				const position = positions[index];
				const selector = Enums.VinfoSection[item];
				const active = isActive(selector);
				return (
					<div key={item} id={id} className={`item${active ? " active" : ""} ${position}`} onClick={() => makeSelection(selector, position)}>
						<IonImg className="menu-icon" src={Layout.SectionIcon(selector, active ? true : prefersDark)} />
						<span className="item-text">{active ? "" : item}</span>
					</div>
				)
			})}
		</div>
	)
}
