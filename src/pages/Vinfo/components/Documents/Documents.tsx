import { IonImg, IonModal } from "@ionic/react";
import { useState } from "react";
import { Carousel } from "../../../../components";
import { ENUMS, Helpers, Layout } from "../../../../utils";
import { useFancyGrad, useVinfoModal } from "../../../../utils/Hooks";
import { useDarkMode } from "../../Hooks";

import "./Documents.scss";

export const Documents = ({ viewType, vinfo, refetch }: VINFO.Page) => {
	const [isOpen, setIsOpen] = useState(false);
	const [viewDoc, setViewDoc] = useState<VINFO.Document | null>(null);

	const modalType = viewType === ENUMS.AppViewType.desktop ? ENUMS.VinfoModal.default : ENUMS.VinfoModal.sheet;
	const modalProps = useVinfoModal(modalType, viewType === ENUMS.AppViewType.desktop ? { cssClass: "large" } : undefined);

	const listProps: (ln: string) => VINFO.DocList = listName => ({
		vinfo,
		listName,
		docs: vinfo.documents,
		viewType,
		showIcon: viewType === ENUMS.AppViewType.desktop,
		theme: vinfo.theme,
		setViewDoc: doc => setViewDoc(doc)
	});

	const docViewMap = (is_external: boolean) => (vinfo.documents.filter(i => i.is_external === is_external))
	const docView: VINFO.DocView = { external: docViewMap(true), maxView: docViewMap(false) };
	const prefersDark = useDarkMode(vinfo.theme);

	return (
		<div id="Documents" className={Layout.VinfoBlock(viewType, "space")}>
			<IonModal {...modalProps} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
				<DocumentList {...listProps("DocOptions")} />
			</IonModal>
			{viewDoc && <Carousel items={docView.maxView} onClose={() => setViewDoc(null)} type={ENUMS.VinfoCarousel.max} preference={prefersDark ? "dark" : "light"} defaultIndex={vinfo.documents.filter(i => !i.is_external).findIndex(i => i.id === viewDoc?.id)} />}
			<DocumentList {...listProps("DocButtons")} limit={viewType === ENUMS.AppViewType.desktop ? 6 : vinfo.theme.display_docs} />
			<div className="view-more">
				<span onClick={() => {
					setIsOpen(true);
					refetch?.();
				}}>View All Documents &amp; Research</span>
			</div>
		</div>
	);
};

const DocumentList = ({ docs, listName, viewType, limit = null, showIcon, theme, setViewDoc }: VINFO.DocList) => {
	const docList = limit ? docs.slice(0, limit) : docs;

	const openDoc = (doc: VINFO.Document) => {
		if (doc.is_external) window.open(doc.full_url);
		else setViewDoc(doc);
	}

	const prefersDark = useDarkMode(theme);

	return (
		<div id={listName}>
			<div className={`flexblock wrap center three-col ${viewType === ENUMS.AppViewType.desktop ? "gap-thirty" : "gap-ten"}`}>
				{docList.map(doc => <DocumentBtn key={doc.id} preference={prefersDark ? "dark" : "light"} showIcon={showIcon} doc={doc} callback={openDoc} />)}
			</div>
		</div>
	)
}

const useDocumentIcon = (doc: VINFO.Document, preference: string) => {
	let docIcon = ENUMS.DocIcon.other;
	const search = doc.full_url?.indexOf("carfax") ?? -1;
	const urlHasCarFox = search > -1;

	switch (doc.vehicle_document_type_id) {
		case ENUMS.DocType.VehicleHistoryReport:
		case ENUMS.DocType.BuildSheet:
		case ENUMS.DocType.CpoChecklist:
			if (urlHasCarFox) docIcon = ENUMS.DocIcon.carfax;
			else docIcon = ENUMS.DocIcon.inspection;
			break;
		case ENUMS.DocType.WindowSticker:
		case ENUMS.DocType.SupplementalManual:
			docIcon = ENUMS.DocIcon.brochure;
			break;
		case ENUMS.DocType.WhyBuy:
			docIcon = ENUMS.DocIcon.clipboard;
			break;
		default:
			break;
	}

	return <IonImg src={`/assets/images/icon_${docIcon}_${preference}.svg`} className={urlHasCarFox ? "carfax" : ""} />;
}

export const DocumentBtn = ({ showIcon, doc, callback, preference, btnstate = "" }: VINFO.DocBtn) => {
	const icon = useDocumentIcon(doc, preference);
	const key = Helpers.uuid();
	useFancyGrad([key]);

	console.log(doc);
	

	return (
		<div key={key} id={key} className={`block rounded shaded btn grad-btn ${btnstate}`} onClick={() => callback(doc)}>
			{showIcon && <div className="doc-icon">{icon}</div>}
			<span className="doc-name">{doc.document_type_name}</span>
		</div>
	)
}
