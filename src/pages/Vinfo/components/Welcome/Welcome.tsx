import { Layout } from "../../../../utils";
import "./Welcome.scss";

export const Welcome = ({ vinfo, viewType }: VINFO.Page) => {
	return (
		<div id="Welcome" className={Layout.VinfoBlock(viewType, "space")}>
			<h1 className="welcome">Good Day, <strong>{vinfo.share.customer_name}</strong></h1>
		</div>
	);
};
