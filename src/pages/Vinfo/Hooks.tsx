import { useEffect, useState } from "react";
import { ENUMS, Helpers, Layout } from "../../utils";
import { TestData, theme } from "./TestData";
import { Desktop, Mobile } from "./Layouts";
const WebFont = require('webfontloader');

const useVinfoData = (data: any): VINFO.Detail => {
	return {
		share: data?.vehicle_share,
		inventory: data?.vehicle_share?.inventory_item,
		documents: data?.vehicle_documents,
		settings: data?.store_settings,
		theme
	};
};

export const useDarkModeSetting = () => {
	const watch = window.matchMedia('(prefers-color-scheme: dark)');
	const [prefersDark, setPrefersDark] = useState(watch.matches);
	useEffect(() => {
		const callback = (dark: any) => setPrefersDark(dark.matches);
		watch.addEventListener("change", callback);
		return () => watch.removeEventListener("change", callback);
	}, [watch]);
	return prefersDark;
}

export const useVinfo = ({ type, token, params }: APP.Location): VINFO.Data => {
	const isLead = type === ENUMS.VinfoType.lead;

	if (isLead) console.log("use lead GQL", `uuid: ${token}`);
	else console.log("use vin GQL", `vin: ${token}, store_code: ${params.store_code}`);

	// wire our GQL here
	const data = useVinfoData(TestData);
	useTheme(data);

	return { loading: false, error: null, data };
};

export const useLayout = (layout: VINFO.Layout) => {
	const isDesktop = layout.page.viewType === ENUMS.AppViewType.desktop;
	return <>{isDesktop ? <Desktop {...layout} /> : <Mobile {...layout} />}</>
}

const useTheme = (vinfo: VINFO.Detail) => {
	const prefersDark = useDarkModeSetting();
	useEffect(() => {

		// dark/light
		const theme = vinfo.theme.dark_mode !== null ? (vinfo.theme.dark_mode ? "dark" : "light") : (prefersDark ? "dark" : "light");
		document.documentElement.setAttribute("vinfo-theme", theme);

		// fonts
		if (vinfo.theme.font) {
			WebFont.load({ [vinfo.theme.font_type]: { families: [vinfo.theme.font, vinfo.theme.bold_font] } });
			document.documentElement.style.setProperty("--theme-font", `${vinfo.theme.font}, ${vinfo.theme.font_family}`);
			document.documentElement.style.setProperty("--theme-bold-font", `${vinfo.theme.bold_font}, ${vinfo.theme.bold_font_family}`);
		}

		// colors
		if (vinfo.theme.primary_color) {
			document.documentElement.style.setProperty("--ion-color-primary", vinfo.theme.primary_color);
			document.documentElement.style.setProperty("--ion-color-primary-rgb", `${Helpers.hexToRgb(vinfo.theme.primary_color)}`);
			document.documentElement.style.setProperty("--ion-color-primary-tint", `${Helpers.shadeColor(vinfo.theme.primary_color, 5)}`);
			document.documentElement.style.setProperty("--ion-color-primary-shade", `${Helpers.shadeColor(vinfo.theme.primary_color, 10)}`);
		}
		if (vinfo.theme.secondary_color) {
			document.documentElement.style.setProperty("--ion-color-secondary", vinfo.theme.secondary_color);
			document.documentElement.style.setProperty("--ion-color-secondary-rgb", `${Helpers.hexToRgb(vinfo.theme.secondary_color)}`);
			document.documentElement.style.setProperty("--ion-color-secondary-tint", `${Helpers.shadeColor(vinfo.theme.secondary_color, 5)}`);
			document.documentElement.style.setProperty("--ion-color-secondary-shade", `${Helpers.shadeColor(vinfo.theme.secondary_color, 10)}`);
		}

	}, [vinfo.theme, prefersDark])
}

export const useSectionPositions = (section: ENUMS.VinfoSection): ENUMS.VinfoMenuPosition[] => {
	const pos = Helpers.arrayFromEnum(ENUMS.VinfoMenuPosition);
	let positions: any[] = pos;
	switch (section) {
		case ENUMS.VinfoSection.salesperson:
			positions = [pos[1], pos[2], pos[0]];
			break;
		case ENUMS.VinfoSection.dealership:
			positions = [pos[2], pos[0], pos[1]];
			break;
		default:
			break;
	}
	return positions;
}

export const useSections = (layout: VINFO.Layout) => {
	const positions = useSectionPositions(layout.section);
	const sections = Helpers.arrayFromEnum(ENUMS.VinfoSection);
	const animation = layout.page.viewType !== ENUMS.AppViewType.desktop ? "slide" : "fade";
	const slideAttr = (section: ENUMS.VinfoSection) => ({ className: Layout.VinfoBlock(layout.page.viewType, `grow ${animation} ${positions[sections.indexOf(section)]}`) });
	return sections.map((section: any) => (slideAttr(section)));
}
