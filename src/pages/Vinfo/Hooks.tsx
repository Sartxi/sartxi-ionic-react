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
	useTheme(data?.theme);

	return { loading: false, error: null, data, refetch: () => console.log("refetch") };
};

const useVinfoUrl = ({ token, params, type }: APP.Location) => {
	const reservedRefs = process.env.REACT_APP_RESERVED_REFERRERS?.split(',');
	const reservedReft = reservedRefs?.includes(window.location.host);

	const baseUrl = process.env.REACT_APP_API_URL;
	const typeQuery = `${type ? 'type=' + type : ''}`;
	const reservedReferrerQuery = `${reservedReft ? 'is_counting=false' : 'is_counting=true'}`;
	const store_code = params.lot_code ? params.lot_code : params.store_code;
	const src = params.src;

	let query = !type ? reservedReferrerQuery : `${typeQuery}&${reservedReferrerQuery}`;
	if (store_code) query += `&store_code=${store_code}`;
	if (src) query += `&src=${src}`;
	const url = `${baseUrl}/reports/vehicle-shares/${token}?${query}`;
	return url ?? null;
}

export const useVinfoRest = (location: APP.Location): VINFO.Data => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState<any>(null);
	const [refetch, setRefetch] = useState(false);
	const url = useVinfoUrl(location);
	useEffect(() => {
		const fetchData = async () => {
			if (!loading) setLoading(true);
			try {
				const res = await fetch(url);
				const json: any = await res.json();
				if (json["vehicle-share"]) {
					console.log(json);

					setData(json);
					setLoading(false);
				} else setError(json.message);
			} catch (error: any) {
				console.error(error)
				setError("There was a problem");
			}
		}
		fetchData();
	}, [refetch]);

	const vinfoData = useVinfoData(data);
	useTheme(vinfoData?.theme);

	return { loading, data: vinfoData, error, refetch: () => setRefetch(true) };
}

const useVinfoData = (data: any): VINFO.Detail | null => {
	const theme = useThemeData();
	// shaping our data more elegantly, maybe a new GQL service could send it this way???
	if (!data) return null;
	return {
		theme,
		share: data?.["vehicle-share"],
		inventory: data?.["vehicle-share"]?.inventory_item,
		documents: data?.["vehicle-documents"],
		settings: data?.store_settings,
	};
};

export const useDarkModeSetting = (override = false) => {
	const watch = window.matchMedia('(prefers-color-scheme: dark)');
	const [prefersDark, setPrefersDark] = useState(watch.matches);
	useEffect(() => {
		const callback = (dark: any) => setPrefersDark(dark.matches);
		if (!override) watch.addEventListener("change", callback);
		return () => watch.removeEventListener("change", callback);
	}, [watch]);

	return override ? null : prefersDark;
}

export const useLayout = (layout: VINFO.Layout) => {
	const isDesktop = layout.page.viewType === ENUMS.AppViewType.desktop;
	return <>{isDesktop ? <Desktop {...layout} /> : <Mobile {...layout} />}</>
}

// Vinfo Theme
const useThemeData = (): VINFO.Theme => {
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
		dark_mode: true,
		display_docs: 3,
		content_width: "1440px"
	}

	return defaultTheme;
}

const useTheme = (theme: VINFO.Theme | undefined) => {
	const prefersDark = useDarkModeSetting();
	useEffect(() => {
		if (!theme) return;

		// desktop gutters width
		if (theme.content_width) document.documentElement.style.setProperty("--theme-content-width", theme.content_width);

		// dark/light
		const darkmode = theme.dark_mode !== null ? (theme.dark_mode ? "dark" : "light") : (prefersDark ? "dark" : "light");
		document.documentElement.setAttribute("vinfo-theme", darkmode);
		document.getElementById("Vinfo")?.setAttribute("vinfo-theme", darkmode);

		// fonts
		if (theme.font) {
			// TODO: configure different font types here
			const fontObject = { families: [theme.font, theme.bold_font] };
			WebFont.load({ [theme.font_type]: fontObject });
			// set font
			document.documentElement.style.setProperty("--theme-font", `${theme.font}, ${theme.font_family}`);
			document.documentElement.style.setProperty("--theme-bold-font", `${theme.bold_font}, ${theme.bold_font_family}`);
		}


		// colors
		const setColor = (key: string, val: any) => {
			document.documentElement.style.setProperty(key, val);
			document.documentElement.style.setProperty(`${key}-rgb`, `${Helpers.hexToRgb(val)}`);
			document.documentElement.style.setProperty(`${key}-tint`, `${Helpers.shadeColor(val, 5)}`);
			document.documentElement.style.setProperty(`${key}-shade`, `${Helpers.shadeColor(val, 10)}`);
		}
		// ----- check for colors or skip to use defaults
		if (theme.primary_color) setColor("--ion-color-primary", theme.primary_color);
		if (theme.secondary_color) setColor("--ion-color-secondary", theme.secondary_color);
		if (theme.tertiary_color) setColor("--ion-color-tertiary", theme.tertiary_color);

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
