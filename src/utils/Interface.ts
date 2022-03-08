import { Enums } from "./Enums";
export { };
declare global {
	namespace APP {
		interface App {
			routes: Route[];
		}
		interface Route {
			id: string;
			name: string;
			path: string;
			view: any;
			viewType?: Enums.AppViewType;
		}
		interface Page {
			viewType: Enums.AppViewType;
			setTitle: (title: string) => void;
		}
		interface Routes {
			routes: Route[];
		}
		interface Location {
			type: Enums.VinfoType;
			token: string;
			params: any;
		}
		interface Header {
			title: string;
			viewType: Enums.AppViewType;
		}
		interface Footer {
			viewType: Enums.AppViewType;
		}
	}
	namespace VINFO {
		interface Detail {
			settings: any;
			inventory: InventoryItem;
			documents: any;
			share: Lead;
		}
		interface Lead {
			customer_email: string;
			customer_name: string;
			customer_phone: string;
			customer_message: string;
		}
		interface Photo {
			position?: number;
			url: string;
		}
		interface StorePhoto {
			id: number;
			full_url: string;
			relative_url: string;
			sort_order: number;
		}
		interface InventoryItem {
			body_door_count: number;
			body_style: string;
			condition: string;
			created_at: string;
			date_added_to_inventory: string;
			decode_options: string;
			description: string;
			engine_cylinders: number;
			engine_description: string;
			engine_displacement: string;
			exterior_color_description: string;
			city_miles_per_gallon: string;
			highway_miles_per_gallon: string;
			city_liters_per_100_km: string;
			highway_liters_per_100_km: string;
			i_lot_id: number;
			i_lot_name: string;
			id: number;
			interior_color_description: string;
			internet_price: number;
			inventory_id: string;
			inventory_item_photos: Photo[];
			is_active: boolean;
			make: string;
			miles: number;
			model: string;
			model_number: string;
			passenger_capacity: number;
			selling_price: number;
			stock_number: string;
			store: {
				name: string;
				store_type_id: number;
				logo_url: string;
				email: string;
				phone: number;
				address1: string;
				address2: string;
				city: string;
				state: string;
				zip: string;
				organization_id: number;
				store_photos: StorePhoto[];
				paywall_setting?: string;
				country_code: string;
			};
			store_id: number;
			stored_image_filename: string;
			transmission_description: string;
			transmission_drive_type: string;
			transmission_name: string;
			trim: string;
			vehicle_reviewed: boolean;
			vin: string;
			year: number;
		}
		interface Document { }
	}
}
