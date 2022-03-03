import { AppRoute, usePageTitle } from "../AppHooks";

export const TestView = (page: AppRoute) => {
	usePageTitle(page, "Testing");
	return <div id="test">Test</div>;
};
