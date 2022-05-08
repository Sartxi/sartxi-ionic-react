export namespace ENUMS {
    export enum AppViewType {
        mobile = "mobile",
        tablet = "tablet",
        desktop = "desktop"
    }
    export enum VinfoType {
        inv = "inv",
        vin = "vin",
        lead = "lead",
        pwlead = "paywall-lead"
    }
    export enum VinfoSection {
        salesperson = "salesperson",
        vehicle = "vehicle",
        dealership = "dealership"
    }
    export enum VinfoMenuPosition {
        left = "left",
        center = "center",
        right = "right"
    }
    export enum VinfoModal {
        default = "default",
        card = "card",
        sheet = "sheet"
    }
    export enum VinfoCarousel {
        standard = 1,
        swipe = 2,
        max = 3
    }
    export enum ArrowCtrlKeys {
        top = 38,
        bottom = 40,
        left = 37,
        right = 39
    }
    export enum DocType {
        VehicleHistoryReport = 2,
        WindowSticker = 5,
        BuildSheet = 7,
        Other = 67,
        CpoChecklist = 93,
        WhyBuy = 13,
        SupplementalManual = 74
    }
    export enum DocIcon {
        inspection = "inspection",
        vehicle = "vehicle",
        brochure = "brochure",
        carfax = "carfax",
        clipboard = "clipboard",
        video = "video",
        other = "other"
    }
}