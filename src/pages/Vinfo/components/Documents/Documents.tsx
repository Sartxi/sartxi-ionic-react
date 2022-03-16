import { Helpers } from "../../../../utils";
import "./Documents.scss";

export const Documents = ({ viewType, vinfo }: VINFO.Page) => {
	const open = (document: VINFO.Document) => console.log("clicked", document);
	return (
		<div id="Documents" className={Helpers.vinfoBlock(viewType)}>
			<div className="flexblock wrap stretch three-col gap-ten">
				{vinfo.documents.map(document => {
					return (
						<div className="block rounded shaded simple">
							<span className="doc-name" onClick={() => open(document)}>{document.document_type_name}</span>
						</div>
					)
				})}
			</div>
		</div>
	);
};
