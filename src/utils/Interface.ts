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
			view?: any;
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
		interface Page {
			vinfo: Detail;
			viewType?: Enums.AppViewType;
		}
		interface Detail {
			settings: Settings;
			inventory: Inventory;
			documents: Document[];
			share: Lead;
		}
		interface Lead {
			customer_email: string;
			customer_name: string;
			customer_phone: string;
			customer_message: string;
		}
		interface Settings {
			id: number;
			name: string;
			value: string;
			store_setting_type: {
				label: string;
				setting_name: string;
				is_notification_type: boolean;
			}
		}
		interface Document {
			id: number;
			customer_can_view: boolean;
			default_image_filename: string;
			default_image_url: string;
			display_name: string;
			document_sort_order: number;
			document_type_description: string;
			document_type_name: string;
			full_url: string;
			is_active: boolean;
			is_approved: boolean;
			is_external: boolean;
			relative_url: string;
			store_can_modify: boolean;
			vehicle_document_type_id: number;
			view_count: number;
		}
		interface Photo {
			position?: number;
			url: string;
		}
		interface Store {
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
		}
		interface StorePhoto {
			id: number;
			full_url: string;
			relative_url: string;
			sort_order: number;
		}
		interface Inventory {
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
			store: Store;
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
	}
}
