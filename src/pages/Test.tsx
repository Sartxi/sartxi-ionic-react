import { AppRoute, usePageTitle } from "../AppHooks";
import { useTestData } from "./Hooks";

export const TestView = (page: AppRoute) => {
	usePageTitle(page, "Testing");
	const { loading, data } = useTestData();
	console.log(loading, data);

	return (
		<div id="test">
			{data.map(i => (
				<span key={i}>{i} </span>
			))}
		</div>
	);
};
