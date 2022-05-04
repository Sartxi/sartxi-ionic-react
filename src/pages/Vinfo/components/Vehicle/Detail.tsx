import { Helpers, Layout } from "../../../../utils";
import "./Vehicle.scss";

export const VehDetail = (page: VINFO.Page) => {
	const inventory: VINFO.Inventory = page?.vinfo?.inventory ?? null;
	if (!inventory) return <span />;
	else return (
		<div className={Layout.VinfoBlock(page.viewType, "shaded rounded transparent vehicle-detail")}>
			<div className="flexblock stretch gap-ten">
				<h1 className="specs">
					<span className="sub">{inventory.condition} {inventory.year} {inventory.make}</span>
					{inventory.model} {inventory.trim}
				</h1>
				<span className="spec">{inventory.miles} mi</span>
			</div>
			<div className="flexblock stretch gap-ten aln-btm">
				<span className="spec">
					{inventory.vin}<br />
					{inventory.stock_number}
				</span>
				<h4 className="price">
					<strong>{Helpers.formatDollar(inventory.selling_price)}</strong>
					<span className="sub">+applicable fees &amp; taxes</span>
				</h4>
			</div>
		</div>
	);
};
