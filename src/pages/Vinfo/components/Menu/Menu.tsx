import { IonImg } from "@ionic/react";
import { Enums, Helpers, Layout } from "../../../../utils";
import "./Menu.scss";

export const Menu = (layout: VINFO.Layout) => {
	return (
		<div id="Menu" className={Layout.VinfoBlock(layout.page.viewType)}>
			{layout.page.viewType === Enums.AppViewType.mobile ? <MobileMenu {...layout} /> : <span>Desktop Menu</span>}
		</div>
	);
};

const MobileMenu = ({ section, setSection, prefersDark }: VINFO.Layout) => {
	// build menu items and sort active to center position
	const sections: Enums.VinfoSection[] = Object.values(Enums.VinfoSection).map(id => id).filter(i => i !== section);
	sections.splice(1, 0, section);
	return (
		<div className="flexblock stretch">
			{sections.map((section, index) => {
				const selector = Enums.VinfoSection[section];
				// active position in the middle (3 menu items)
				const active = index === 1;
				return (
					<div key={section} className={`section${active ? " active" : ""}`} onClick={() => setSection(selector)}>
						<IonImg className="menu-icon" src={Layout.SectionIcon(selector, prefersDark)} />
						{active ? "" : section}
					</div>
				)
			})}
		</div>
	)
}
