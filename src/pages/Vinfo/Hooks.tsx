import { Enums, Helpers, Layout } from "../../utils";
import { TestData } from "./TestData";
import { Inventory, Documents, Salesperson, Dealership } from "./components";
import { Desktop, Mobile } from "./Layouts";
import { useSectionPositions } from "./components/Menu/hooks";

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

export const useSections = (layout: VINFO.Layout) => {
	const positions = useSectionPositions(layout.section);
	const sections = Helpers.arrayFromEnum(Enums.VinfoSection);
	const getSlideAttrs = (section: Enums.VinfoSection) => ({ id: `section-${section}`, className: Layout.VinfoBlock(layout.page.viewType, `grow slide ${positions[sections.indexOf(section)]}`) })
	return (
		<div id="SlideContainer" className={Layout.VinfoBlock(layout.page.viewType, "slideContainer")}>
			<div {...getSlideAttrs(Enums.VinfoSection.salesperson)}>
				<Salesperson {...layout.page} />
			</div>
			<div {...getSlideAttrs(Enums.VinfoSection.inventory)}>
				<Inventory {...layout.page} />
				<Documents {...layout.page} />
			</div>
			<div {...getSlideAttrs(Enums.VinfoSection.dealership)}>
				<Dealership {...layout.page} />
			</div>
		</div>
	)
}
