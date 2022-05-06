import { IonModal } from "@ionic/react";
import { useState } from "react";
import { Carousel } from "../../../../components";
import { ENUMS, Layout } from "../../../../utils";
import { useVinfoModal } from "../../../../utils/Hooks";

import "./Documents.scss";

export const Documents = ({ viewType, vinfo }: VINFO.Page) => {
	const [isOpen, setIsOpen] = useState(false);

	const modalType = viewType === ENUMS.AppViewType.desktop ? ENUMS.VinfoModal.default : ENUMS.VinfoModal.sheet;
	const modalProps = useVinfoModal(modalType, viewType === ENUMS.AppViewType.desktop ? { cssClass: "large" } : undefined);

	const listProps: (ln: string) => VINFO.DocList = listName => ({
		listName,
		docs: vinfo.documents,
		viewType
	});

	return (
		<div id="Documents" className={Layout.VinfoBlock(viewType, "space")}>
			<IonModal {...modalProps} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
				<DocumentList {...listProps("DocOptions")} />
			</IonModal>
			<DocumentList {...listProps("DocButtons")} limit={viewType === ENUMS.AppViewType.desktop ? 6 : vinfo.theme.display_docs} />
			<div className="view-more">
				<span onClick={() => setIsOpen(true)}>View All Documents &amp; Research</span>
			</div>
		</div>
	);
};

const DocumentList = ({ docs, listName, viewType, limit = null }: VINFO.DocList) => {
	const [viewDoc, setViewDoc] = useState<VINFO.Document | null>(null);

	const docList = limit ? docs.slice(0, limit) : docs;
	const docViewMap = (is_external: boolean) => (docs.filter(i => i.is_external === is_external))
	const docView: VINFO.DocView = { external: docViewMap(true), maxView: docViewMap(false) };

	const openDoc = (doc: VINFO.Document) => {
		if (doc.is_external) window.open(doc.full_url);
		else setViewDoc(doc);
	}

	return (
		<div id={listName}>
			{viewDoc && <Carousel items={docView.maxView} onClose={() => setViewDoc(null)} type={ENUMS.VinfoCarousel.max} defaultIndex={docs.findIndex(i => i.id === viewDoc?.id)} />}
			<div className={`flexblock wrap stretch three-col ${viewType === ENUMS.AppViewType.desktop ? "gap-thirty" : "gap-ten"}`}>
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
