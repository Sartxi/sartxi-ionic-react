import { useEffect } from "react";
import { usePage } from "../../AppConfig";

export const SampleStaticView = (page: APP.Route) => {
	const { setTitle } = usePage(page);

	useEffect(() => {
		setTitle("Funky cole medina");
	}, [setTitle]);

	return <div id="Sample">Static</div>;
};
