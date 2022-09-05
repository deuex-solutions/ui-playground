import { Breadcrumbs as MuiBreadcrumbs, Link } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Breadcrumb, GetBreadcrumbList } from "./breadcrumbs.interfaces";
import { useBreadcrumbsStyles } from "./breadcrumbs.styles";

const Breadcrumbs: FunctionComponent = () => {
    const classes = useBreadcrumbsStyles();
    const { pathname } = useLocation();

    const getBreadcrumbList: GetBreadcrumbList = () => {
        let basePath = "";

        const pathnames: Breadcrumb[] = pathname
            .split("/")
            .filter((item) => item !== "")
            .map((item) => {
                basePath = basePath ? `${basePath}/${item}` : item;

                return { name: item, path: basePath };
            });

        return pathnames;
    };
    const breadcrumbList = getBreadcrumbList();

    return (
        <MuiBreadcrumbs
            aria-label="breadcrumb"
            className={classes.crumbContainer}
            maxItems={2}
        >
            <Link color="inherit" component={RouterLink} to="/">
                Home
            </Link>

            {breadcrumbList.map((crumb: Breadcrumb) => (
                <Link
                    color="inherit"
                    component={RouterLink}
                    key={crumb.name}
                    to={crumb.path}
                >
                    {crumb.name}
                </Link>
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
