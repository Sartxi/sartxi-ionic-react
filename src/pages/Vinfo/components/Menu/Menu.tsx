import { IonImg } from "@ionic/react";
import { Enums, Layout } from "../../../../utils";
import { useMenuItemPosition } from "./hooks";
import "./Menu.scss";

export const Menu = (layout: VINFO.Layout) => {
	return (
		<div id="Menu" className={Layout.VinfoBlock(layout.page.viewType)}>
			{layout.page.viewType === Enums.AppViewType.mobile ? <MobileMenu {...layout} /> : <span>Desktop Menu</span>}
		</div>
	);
};

const MobileMenu = ({ section, setSection, prefersDark }: VINFO.Layout) => {
	const positions = useMenuItemPosition(section);
	const sections: Enums.VinfoSection[] = Object.values(Enums.VinfoSection).map(id => id);
	const isActive = (selector: Enums.VinfoSection) => section === selector;

	const makeSelection = (selector: Enums.VinfoSection, position: Enums.VinfoMenuPosition) => {
		setSection(selector);
		Layout.HandleMenuAnimations(position);
		Layout.HandlePgTransition(selector, position);
	}

	return (
		<div id="Menu" className="positioned">
			{sections.map((sect, index) => {
				const id = `Sec${sect}`;
				const position = positions[index];
				const selector = Enums.VinfoSection[sect];
				const active = isActive(selector);
				return (
					<div key={sect} id={id} className={`section${active ? " active" : ""} ${position}`} onClick={() => makeSelection(selector, position)}>
						<IonImg className="menu-icon" src={Layout.SectionIcon(selector, active ? true : prefersDark)} />
						<span className="sect-text">{active ? "" : sect}</span>
					</div>
				)
			})}
		</div>
	)
}
