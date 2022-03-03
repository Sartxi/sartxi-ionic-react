import { AppViewType } from "./Enums";

export const getViewType = () => {
	const res = window.innerWidth;
	let type = AppViewType.mobile;
	if (res <= 768) type = AppViewType.mobile;
	else if (res >= 990) type = AppViewType.desktop;
	else type = AppViewType.tablet;
	return type;
};
