import { IonImg } from "@ionic/react";
import { useState } from "react";
import { Carousel, Modal } from "../../../../components";
import { ENUMS, Helpers, Layout } from "../../../../utils";
import { useFancyGrad, useVinfoModal } from "../../../../utils/Hooks";
import { useDarkMode } from "../../Hooks";

import "./Documents.scss";

export const Documents = ({ viewType, vinfo, refetch }: VINFO.Page) => {
	const [isOpen, setIsOpen] = useState(false);
	const [viewDoc, setViewDoc] = useState<VINFO.Document | null>(null);

	const modalType = viewType === ENUMS.AppViewType.desktop ? ENUMS.VinfoModal.default : ENUMS.VinfoModal.sheet;
	const modalProps = useVinfoModal(modalType, viewType === ENUMS.AppViewType.desktop ? { cssClass: "large" } : undefined);

	const listProps: (mode: ENUMS.DocViewMode) => VINFO.DocList = viewMode => ({
		vinfo,
		viewMode,
		viewType,
		theme: vinfo.theme,
		docs: vinfo.documents,
		setViewDoc: doc => {
			if (isOpen) setIsOpen(false);
			setViewDoc(doc);
		}
	});

	return (
		<div id="Documents" className={Layout.VinfoBlock(viewType, "space")}>
			<Modal id="DocumentViewModal" isOpen={isOpen} modalProps={modalProps} onClose={() => setIsOpen(false)} useCloseBtn={viewType === ENUMS.AppViewType.desktop}>
				<div id="DocModal" className={ENUMS.AppViewType[viewType]}>
					<h2 className="doc-title">All Vehicle Documents</h2>
					<DocumentView {...listProps(ENUMS.DocViewMode.list)} />
				</div>
			</Modal>
			<DocumentCarousel viewDoc={viewDoc} setViewDoc={setViewDoc} viewType={viewType} vinfo={vinfo} />
			<DocumentView {...listProps(ENUMS.DocViewMode.grid)} limit={viewType === ENUMS.AppViewType.desktop ? 6 : vinfo.theme.display_docs} />
			<div className="view-more">
				<span onClick={() => {
					setIsOpen(true);
					refetch?.();
				}}>View All Documents &amp; Research</span>
			</div>
		</div>
	);
};

const DocumentView = ({ docs, viewMode, viewType, limit = null, theme, setViewDoc }: VINFO.DocList) => {
	const prefersDark = useDarkMode(theme);
	const docList = limit ? docs.slice(0, limit) : docs;

	const openDoc = (doc: VINFO.Document) => {
		if (doc.is_external) window.open(doc.full_url);
		else setViewDoc(doc);
	}

	const viewClass = `documents-view ${viewMode === ENUMS.DocViewMode.list ? "list" : ""} ${ENUMS.AppViewType[viewType]}`
	const gridDeco = `wrap center three-col ${viewType === ENUMS.AppViewType.desktop ? "gap-thirty" : "gap-ten"}`;
	const listDeco = `cols stretch center gap-ten doc-list`;
	const decorations = viewMode === ENUMS.DocViewMode.grid ? gridDeco : listDeco;
	const mode = viewType === ENUMS.AppViewType.mobile ? ENUMS.DocViewMode.grid : viewMode;
	const showIcon = viewType === ENUMS.AppViewType.desktop || viewMode === ENUMS.DocViewMode.list;

	return (
		<div id="DocView" className={viewClass}>
			<div className={`flexblock ${decorations}`}>
				{docList.map(doc => (
					<DocumentItem key={Helpers.uuid()} mode={mode} preference={prefersDark ? "dark" : "light"} showIcon={showIcon} doc={doc} callback={openDoc} />
				))}
			</div>
		</div>
	);
}

const DocumentCarousel = ({ viewDoc, setViewDoc, vinfo, viewType }: { viewDoc: any, setViewDoc: any, vinfo: VINFO.Detail, viewType: ENUMS.AppViewType }) => {
	const modalProps = useVinfoModal(ENUMS.VinfoModal.default);

	const docViewMap = (is_external: boolean) => (vinfo.documents.filter(i => i.is_external === is_external))
	const docView: VINFO.DocView = { external: docViewMap(true), maxView: docViewMap(false) };
	const prefersDark = useDarkMode(vinfo.theme);
	const isDesktop = viewType === ENUMS.AppViewType.desktop;
	const type = isDesktop ? ENUMS.VinfoCarousel.max : ENUMS.VinfoCarousel.swipe;
	const isOpen = viewDoc ? true : false;

	const carousel = () => {
		if (isOpen) return (
			<Carousel
				type={type}
				items={docView.maxView}
				altkey={["name", "document_type_description"]}
				onClose={() => setViewDoc(null)}
				preference={prefersDark ? "dark" : "light"}
				defaultIndex={docView.maxView.findIndex(i => i.id === viewDoc?.id)} />
		)
		else return <span />;
	}

	if (isDesktop) return carousel();
	else return (
		<Modal id="MobileDocList" isOpen={isOpen} modalProps={modalProps} onClose={() => setViewDoc(null)}>
			<div className="flexblock fill center">{carousel()}</div>
		</Modal>
	);
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

export const DocumentBtn = ({ showIcon, doc, callback, preference, btnstate = "", btnkey = Helpers.uuid() }: VINFO.DocBtn) => {
	const icon = useDocumentIcon(doc, preference);
	useFancyGrad([btnkey]);

	return (
		<div key={btnkey} id={btnkey} className={`block rounded shaded btn grad-btn ${btnstate}`} onClick={() => callback(doc)}>
			{showIcon && <div className="doc-icon">{icon}</div>}
			<span className="doc-name">{doc.document_type_name}</span>
		</div>
	)
}

interface DocItem extends VINFO.DocBtn { mode: ENUMS.DocViewMode };
export const DocumentItem = (props: DocItem) => {
	const { mode, doc, preference, btnkey, callback } = props;
	const icon = useDocumentIcon(doc, preference);
	const is_external = doc.is_external;
	if (mode === ENUMS.DocViewMode.grid) return <DocumentBtn {...props} />;
	else return (
		<div key={btnkey} id={btnkey} className={`block rounded shaded`}>
			<div className="doc-data flexblock">
				<div className="doc-icon">{icon}</div>
				<span className="doc-name">
					{doc.name ? doc.name : doc.document_type_name}
					{doc.name && <span className="sub">{doc.document_type_name}</span>}
				</span>
			</div>
			<div className="doc-cta flexblock cols">
				<div className={`block rounded shaded btn ${is_external ? "single" : ""}`} onClick={() => callback(doc)}>
					{is_external ? "Open" : "Preview"}
				</div>
				{!is_external && (
					<div className="block rounded shaded btn" onClick={() => callback(doc)}>
						Download
					</div>
				)}
			</div>
		</div>
	)
}
