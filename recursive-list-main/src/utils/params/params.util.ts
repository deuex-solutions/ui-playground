export const getParamFromPathname = (pathname: string): string => {
  /* returns the current pathname*/

  let param = "";
  const pathnameArray = pathname.split("/");
  const lastIndex = pathnameArray.length - 1;
  param = pathnameArray[lastIndex].replace("/", "");
  return param;
};
