import { IonModal } from "@ionic/react";
import { useState } from "react";
import { Enums, Layout } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";
import "./Documents.scss";

export const Documents = ({ viewType, vinfo }: VINFO.Page) => {
	const [isOpen, setIsOpen] = useState(false);
	const modalProps = useVinfoModal(Enums.VinfoModal.sheet);
	const listProps: (ln: string) => DocList = listName => ({
		listName,
		docs: vinfo.documents,
		openDoc: doc => console.log(doc)
	});
	return (
		<div id="Documents" className={Layout.VinfoBlock(viewType)}>
			<IonModal {...modalProps} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
				<DocumentList {...listProps("DocOptions")} />
			</IonModal>
			<DocumentList {...listProps("DocButtons")} />
			<div className="view-more">
				<span onClick={() => setIsOpen(true)}>View More Documents &amp; Research</span>
			</div>
		</div>
	);
};

interface DocList { docs: VINFO.Document[], listName: string, openDoc: (document: VINFO.Document) => void };
const DocumentList = ({ docs, listName, openDoc }: DocList) => {
	return (
		<div id={listName} className="flexblock wrap stretch three-col gap-ten">
			{docs.map(doc => {
				return (
					<div key={doc.id} className="block rounded shaded simple btn">
						<span className="doc-name" onClick={() => openDoc(doc)}>{doc.document_type_name}</span>
					</div>
				)
			})}
		</div>
	)
}
