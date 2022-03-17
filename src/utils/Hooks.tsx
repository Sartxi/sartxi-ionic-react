import { useEffect, useState } from "react";

export const useWindowResize = (callback: () => void) => {
    return useEffect(() => {
        window.addEventListener("resize", callback);
        return () => window.removeEventListener("resize", callback);
    }, [callback]);
}

export const useDarkModeSetting = () => {
    const watch = window.matchMedia('(prefers-color-scheme: dark)')
    const [prefersDark, setPrefersDark] = useState(watch.matches);
    useEffect(() => {
        const callback = (dark: any) => setPrefersDark(dark.matches);
        watch.addEventListener("change", callback);
        return () => watch.removeEventListener("change", callback);;
    }, []);
    return prefersDark;
}