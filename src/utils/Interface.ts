import { ENUMS } from "./";

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
		}
		interface Page {
			viewType: ENUMS.AppViewType;
			settitle: (title: string) => void;
		}
		interface Routes {
			routes: Route[];
		}
		interface Location {
			type: ENUMS.VinfoType;
			token: string;
			params: any;
		}
		interface Header {
			title: string;
			viewType: ENUMS.AppViewType;
		}
		interface Footer {
			viewType: ENUMS.AppViewType;
		}
		interface Modal {
			id: string;
			isOpen: boolean;
			children?: React.ReactElement,
			useCloseBtn?: boolean;
			modalProps: any;
			onClose: () => void;
		}
		interface ModalContentProps {
			settitle?: (title: string) => void;
		}
		interface Carousel {
			preference: string;
			defaultIndex?: number;
			items: VINFO.Photo[] | VINFO.Document[],
			type?: ENUMS.VinfoCarousel;
			onClose?: () => void;
		}
		interface CarouselCtrl extends Carousel {
			preference: string;
			active: number;
			setActive: (index: number) => void;
			max: boolean;
			setMax: (active: boolean) => void;
			onClose?: () => void;
		}
		interface Divider {
			text?: string;
			size?: string;
		}
		interface Popup {
			children?: React.ReactNode
			text: string;
			trigger?: ENUMS.PopTrig;
			position?: ENUMS.PopPos;
		}
	}
	namespace VINFO {
		interface Data {
			loading: boolean;
			error: any;
			data: VINFO.Detail | null;
			refetch?: () => void;
		}
		interface Page {
			vinfo: Detail;
			viewType: ENUMS.AppViewType;
			className?: string;
			refetch?: () => void;
		}
		interface Theme {
			font_type: string;
			font: string;
			font_family: string;
			bold_font: string;
			bold_font_family: string;
			primary_color: string;
			secondary_color: string;
			tertiary_color: string;
			dark_mode?: boolean | null;
			display_docs?: number;
			content_width?: string;
		}
		interface Layout {
			page: Page;
			sections?: ENUMS.VinfoSection[];
			section: ENUMS.VinfoSection;
			setSection: (section: ENUMS.VinfoSection) => void;
			prefersDark: boolean;
			itemText?: any;
		}
		interface Detail {
			settings: Settings;
			inventory: Inventory;
			documents: Document[];
			share: Lead;
			theme: Theme;
		}
		interface Lead {
			customer_email: string;
			customer_name: string;
			customer_phone: string;
			customer_message: string;
			background_image: string;
			id: number;
			inventory_item: Inventory;
			number_of_views: number;
			salesperson: Salesperson;
			show_salesperson: boolean;
			theme: number;
		}
		interface Salesperson {
			bio: string;
			bio_text: string;
			email: string;
			has_sms: boolean;
			job_title_name: string;
			name: string;
			phone: string;
			photo_relative_url: string;
			photo_url: string;
			sales_type_id: number;
			sms_phone: string;
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
			full_url?: string;
			is_active: boolean;
			is_approved: boolean;
			is_external: boolean;
			relative_url: string;
			store_can_modify: boolean;
			vehicle_document_type_id: number;
			view_count: number;
		}
		interface DocList {
			docs: VINFO.Document[];
			listName: string;
			viewType: any;
			limit?: number | null;
			showIcon: boolean;
			theme: VINFO.Theme;
			setViewDoc: (doc: Document) => void | null;
		}
		interface DocView {
			external: Document[];
			maxView: Document[];
		}
		interface DocBtn {
			btnstate?: string;
			showIcon: boolean;
			preference: string;
			doc: VINFO.Document;
			callback: (doc: VINFO.Document) => void;
		}
		interface Photo extends StorePhoto {
			position?: number;
			url?: string;
		}
		interface Store {
			id: number;
			name: string;
			store_type_id: number;
			logo_url: string;
			sales_email: string;
			sales_phone: number;
			address1: string;
			address2: string;
			city: string;
			state: string;
			zip: string;
			organization_id: number;
			store_photos: StorePhoto[];
			paywall_setting?: string;
			country_code: string;
			primary_photo_url: string;
			hours: StoreHours;
		}
		interface StorePhoto {
			id?: number;
			full_url?: string;
			relative_url?: string;
			sort_order?: number;
		}
		interface StoreHours {
			days: StoreHourDays[];
			open_now: boolean;
			open_now_calc: boolean;
			timezone: string;
		}
		interface StoreHourDays {
			day: number;
			open_time: string;
			close_time: string;
			day_text: string;
			open: boolean;
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
