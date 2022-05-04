import { IonModal } from "@ionic/react";
import { useState } from "react";
import { Enums, Layout } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";

import "./Documents.scss";

export const Documents = ({ viewType, vinfo }: VINFO.Page) => {
	const [isOpen, setIsOpen] = useState(false);

	const modalType = viewType === Enums.AppViewType.desktop ? Enums.VinfoModal.default : Enums.VinfoModal.sheet;
	const modalProps = useVinfoModal(modalType, viewType === Enums.AppViewType.desktop ? { cssClass: "large" } : undefined);

	const listProps: (ln: string) => DocList = listName => ({
		listName,
		docs: vinfo.documents,
		viewType,
		openDoc: doc => console.log(doc)
	});

	return (
		<div id="Documents" className={Layout.VinfoBlock(viewType, "space")}>
			<IonModal {...modalProps} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
				<DocumentList {...listProps("DocOptions")} />
			</IonModal>
			<DocumentList {...listProps("DocButtons")} limit={viewType === Enums.AppViewType.desktop ? 6 : vinfo.theme.display_docs} />
			<div className="view-more">
				<span onClick={() => setIsOpen(true)}>View All Documents &amp; Research</span>
			</div>
		</div>
	);
};

interface DocList { docs: VINFO.Document[], listName: string, viewType: any, openDoc: (document: VINFO.Document) => void, limit?: number | null };
const DocumentList = ({ docs, listName, openDoc, viewType, limit = null }: DocList) => {
	const docList = limit ? docs.slice(0, limit) : docs;
	return (
		<div id={listName}>
			<div className={`flexblock wrap stretch three-col ${viewType === Enums.AppViewType.desktop ? "gap-thirty" : "gap-ten"}`}>
				{docList.map(doc => {
					return (
						<div key={doc.id} className="block rounded shaded simple btn">
							<span className="doc-name" onClick={() => openDoc(doc)}>{doc.document_type_name}</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}
