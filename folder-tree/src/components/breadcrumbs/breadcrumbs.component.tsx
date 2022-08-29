import { Breadcrumbs as MuiBreadcrumbs, Link } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { GetBreadcrumbList } from "./breadcrumbs.interfaces";

const Breadcrumbs: FunctionComponent = () => {
    const { pathname } = useLocation();

    const getBreadcrumbList: GetBreadcrumbList = () =>
        pathname.split("/").filter((item) => item !== "");

    return (
        <MuiBreadcrumbs aria-label="breadcrumb" maxItems={2}>
            <Link color="inherit" component={RouterLink} to="/">
                Home
            </Link>

            {getBreadcrumbList().map((item: string) => (
                <Link
                    color="inherit"
                    component={RouterLink}
                    key={item}
                    to={`/${item}`}
                >
                    {item}
                </Link>
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;
