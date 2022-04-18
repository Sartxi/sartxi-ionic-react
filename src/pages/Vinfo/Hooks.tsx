import { Enums, Helpers, Layout } from "../../utils";
import { TestData } from "./TestData";
import { ContactUs, Inventory, Documents, Salesperson, Dealership } from "./components";
import { Desktop, Mobile } from "./Layouts";

const useVinfoData = (data: any): VINFO.Detail => {
	return {
		share: data?.vehicle_share,
		inventory: data?.vehicle_share?.inventory_item,
		documents: data?.vehicle_documents,
		settings: data?.store_settings
	};
};

export const useVinfo = ({ type, token, params }: APP.Location): VINFO.Data => {
	const isLead = type === Enums.VinfoType.lead;

	if (isLead) console.log("use lead GQL", `uuid: ${token}`);
	else console.log("use vin GQL", `vin: ${token}, store_code: ${params.store_code}`);

	return { loading: false, error: null, data: useVinfoData(TestData) };
};

export const useLayout = (layout: VINFO.Layout) => {
	const isDesktop = layout.page.viewType === Enums.AppViewType.desktop;
	return <>{isDesktop ? <Desktop {...layout} /> : <Mobile {...layout} />}</>
}

export const useSectionPositions = (section: Enums.VinfoSection): Enums.VinfoMenuPosition[] => {
	const pos = Helpers.arrayFromEnum(Enums.VinfoMenuPosition);
	let positions: any[] = pos;
	switch (section) {
		case Enums.VinfoSection.salesperson:
			positions = [pos[1], pos[2], pos[0]];
			break;
		case Enums.VinfoSection.dealership:
			positions = [pos[2], pos[0], pos[1]];
			break;
		default:
			break;
	}
	return positions;
}

export const useSections = (layout: VINFO.Layout) => {
	const positions = useSectionPositions(layout.section);
	const sections = Helpers.arrayFromEnum(Enums.VinfoSection);
	const animation = layout.page.viewType !== Enums.AppViewType.desktop ? "slide" : "fade";
	const slideAttr = (section: Enums.VinfoSection) => ({ className: Layout.VinfoBlock(layout.page.viewType, `grow ${animation} ${positions[sections.indexOf(section)]}`) })
	return (
		<div className={Layout.VinfoBlock(layout.page.viewType, "animated")}>
			<div {...slideAttr(Enums.VinfoSection.salesperson)}>
				<Salesperson {...layout.page} />
			</div>
			<div {...slideAttr(Enums.VinfoSection.vehicle)}>
				<Inventory {...layout.page} />
				<Documents {...layout.page} />
				<ContactUs {...layout.page} />
			</div>
			<div {...slideAttr(Enums.VinfoSection.dealership)}>
				<Dealership {...layout.page} />
			</div>
		</div>
	)
}
