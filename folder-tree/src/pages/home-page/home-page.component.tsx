import { Breadcrumbs } from "components";
import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { useHomePageStyles } from "./home-page.styles";

const HomePage: FunctionComponent = () => {
    const classes = useHomePageStyles();

    return (
        <div className={classes.root}>
            <Breadcrumbs />
            <Outlet />
        </div>
    );
};

export default HomePage;
