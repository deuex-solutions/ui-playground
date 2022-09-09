export const getParamFromPathname = (pathname: string): string => {
  /* returns the current pathname*/

  const pathnameArray = pathname.split("/");
  const lastIndex = pathnameArray.length - 1;
  const param = pathnameArray[lastIndex].replace("/", "");
  return param;
};
