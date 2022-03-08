import { Enums } from "../../utils";
import { TestData } from "./TestData";

const useVinfoData = (data: any): VINFO.Detail => {
	return {
		share: data?.vehicle_share,
		inventory: data?.vehicle_share?.inventory_item,
		documents: data?.vehicle_documents,
		settings: data?.store_settings
	};
};

interface VinfoData {
	loading: boolean;
	error: any;
	data: VINFO.Detail;
}

export const useVinfo = ({ type, token, params }: APP.Location): VinfoData => {
	const isLead = type === Enums.VinfoType.lead;
	if (isLead) console.log("use lead GQL", `uuid: ${token}`);
	else console.log("use vin GQL", `vin: ${token}, store_code: ${params.store_code}`);

	return { loading: false, error: null, data: useVinfoData(TestData) };
};
