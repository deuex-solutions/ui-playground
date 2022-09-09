/**
 * Returns current pathname
 * @param {string} pathname
 * @return {string} param
 */

export const getParamFromPathname = (pathname: string): string => {
  const pathnameArray = pathname.split("/");
  const lastIndex = pathnameArray.length - 1;
  const param = pathnameArray[lastIndex].replace("/", "");
  return param;
};
