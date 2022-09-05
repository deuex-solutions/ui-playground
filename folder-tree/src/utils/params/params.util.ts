export const getParamFromPathname = (pathname: string): string => {
    let param = "";
    const pathnameArray = pathname.split("/");
    const lastIndex = pathnameArray.length - 1;

    param = pathnameArray[lastIndex].replace("/", "");

    return param;
};
