import { Breadcrumbs as MuiBreadcrumbs, Link } from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useBreadcrumbsStyles } from "./breadcrumbs.styles";
import { ReactComponent as SvgHome } from "../../assets/icon/home.svg";
import { Breadcrumb, GetBreadcrumbList } from "./breadcrumbs.interfaces";

const Breadcrumbs = () => {
  const classes = useBreadcrumbsStyles();
  const { pathname } = useLocation();

  const getBreadcrumbList: GetBreadcrumbList = () => {
    let basePath = "";

    /**
     * Returns an array of the breadcrumb list containing
     * @param {string} item
     * @param {string} path
     * @return {array} pathnames
     */

    const pathnames: Breadcrumb[] = pathname
      .split("/")
      .filter((item) => item !== "")
      .map((item) => {
        basePath = basePath ? `${basePath}/${item}` : item;
        return { name: item, path: basePath };
      });
    console.log(typeof pathnames);

    return pathnames;
  };
  const breadcrumbList = getBreadcrumbList();

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      className={classes.crumbContainer}
      maxItems={2}
    >
      <Link
        color="inherit"
        component={RouterLink}
        to="/"
        data-testid="home-svg"
      >
        <SvgHome />
      </Link>

      {/* generate breadcrumb list */}
      {breadcrumbList.map((crumbItem: Breadcrumb) => (
        <Link component={RouterLink} key={crumbItem.name} to={crumbItem.path}>
          {crumbItem.name}
        </Link>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
