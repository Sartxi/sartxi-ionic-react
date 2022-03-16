import { Helpers } from "../../../../utils";

export const Menu = ({ viewType, vinfo }: VINFO.Page) => {
	return (
		<div id="Menu" className={Helpers.vinfoBlock(viewType)}>
			Menu
		</div>
	);
};
