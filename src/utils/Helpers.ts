export namespace Helpers {
    export const vinfo = "Vinfo®";
    export const fetchParams = (location: any) => JSON.parse('{"' + decodeURI(location.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};