export const useTestData = (location: APP.Location) => {
	console.log(location);
	return { loading: false, data: ["hello", "world"] };
};
