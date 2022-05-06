import { useEffect, useState } from "react";
import { ENUMS, Helpers, Layout } from "../../utils";
import { TestData } from "./TestData";
import { Desktop, Mobile } from "./Layouts";

const WebFont = require('webfontloader');

// Main Vinfo Hooks
export const useVinfo = ({ type, token, params }: APP.Location): VINFO.Data => {
	const isLead = type === ENUMS.VinfoType.lead;

	if (isLead) console.log("use lead GQL", `uuid: ${token}`);
	else console.log("use vin GQL", `vin: ${token}, store_code: ${params.store_code}`);

	// wire our GQL here
	const data = useVinfoData(TestData);
	useTheme(data.theme);

	return { loading: false, error: null, data };
};

const useVinfoData = (data: any): VINFO.Detail => {
	// shaping our data more elegantly, maybe our new GQL service for this will send it this way???
	return {
		share: data?.vehicle_share,
		inventory: data?.vehicle_share?.inventory_item,
		documents: data?.vehicle_documents,
		settings: data?.store_settings,
		theme: useThemeData(data?.vehicle_share?.inventory_item)
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

export const useLayout = (layout: VINFO.Layout) => {
	const isDesktop = layout.page.viewType === ENUMS.AppViewType.desktop;
	return <>{isDesktop ? <Desktop {...layout} /> : <Mobile {...layout} />}</>
}

// Vinfo Theme
const useThemeData = (share: VINFO.Inventory): VINFO.Theme => {
	// share.store.theme - maybe??

	const defaultTheme: VINFO.Theme = {
		font_type: "google",
		font: "Open Sans",
		font_family: "sans-serif",
		bold_font: "Akshar",
		bold_font_family: "sans-serif",
		primary_color: "#ae72af",
		secondary_color: "#1dafec",
		tertiary_color: "#5260ff",
		dark_mode: null,
		display_docs: 3
	}

	return defaultTheme;
}

const useTheme = (theme: VINFO.Theme) => {
	const prefersDark = useDarkModeSetting();
	useEffect(() => {

		// dark/light
		const darkmode = theme.dark_mode !== null ? (theme.dark_mode ? "dark" : "light") : (prefersDark ? "dark" : "light");
		document.documentElement.setAttribute("vinfo-theme", darkmode);

		// fonts
		if (theme.font) {
			// configure different font types here
			const fontObject = { families: [theme.font, theme.bold_font] };
			WebFont.load({ [theme.font_type]: fontObject });
			// set font
			document.documentElement.style.setProperty("--theme-font", `${theme.font}, ${theme.font_family}`);
			document.documentElement.style.setProperty("--theme-bold-font", `${theme.bold_font}, ${theme.bold_font_family}`);
		}

		// colors
		if (theme.primary_color) {
			document.documentElement.style.setProperty("--ion-color-primary", theme.primary_color);
			document.documentElement.style.setProperty("--ion-color-primary-rgb", `${Helpers.hexToRgb(theme.primary_color)}`);
			document.documentElement.style.setProperty("--ion-color-primary-tint", `${Helpers.shadeColor(theme.primary_color, 5)}`);
			document.documentElement.style.setProperty("--ion-color-primary-shade", `${Helpers.shadeColor(theme.primary_color, 10)}`);
		}
		if (theme.secondary_color) {
			document.documentElement.style.setProperty("--ion-color-secondary", theme.secondary_color);
			document.documentElement.style.setProperty("--ion-color-secondary-rgb", `${Helpers.hexToRgb(theme.secondary_color)}`);
			document.documentElement.style.setProperty("--ion-color-secondary-tint", `${Helpers.shadeColor(theme.secondary_color, 5)}`);
			document.documentElement.style.setProperty("--ion-color-secondary-shade", `${Helpers.shadeColor(theme.secondary_color, 10)}`);
		}
		if (theme.tertiary_color) {
			document.documentElement.style.setProperty("--ion-color-tertiary", theme.tertiary_color);
			document.documentElement.style.setProperty("--ion-color-tertiary-rgb", `${Helpers.hexToRgb(theme.tertiary_color)}`);
			document.documentElement.style.setProperty("--ion-color-tertiary-tint", `${Helpers.shadeColor(theme.tertiary_color, 5)}`);
			document.documentElement.style.setProperty("--ion-color-tertiary-shade", `${Helpers.shadeColor(theme.tertiary_color, 10)}`);
		}

	}, [theme, prefersDark])
}

// Section hooks for the menu
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
