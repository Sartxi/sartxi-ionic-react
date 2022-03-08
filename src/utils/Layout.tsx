import { Enums } from "./Enums";

export const getViewType = () => {
	const res = window.innerWidth;
	let type = Enums.AppViewType.mobile;
	if (res <= 768) type = Enums.AppViewType.mobile;
	else if (res >= 990) type = Enums.AppViewType.desktop;
	else type = Enums.AppViewType.tablet;
	return type;
};
