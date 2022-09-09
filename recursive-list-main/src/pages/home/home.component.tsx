import { Breadcrumbs } from "components";
import { Outlet } from "react-router-dom";
import { useHomePageStyles } from "./home.styles";

const HomePage = () => {
  const classes = useHomePageStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs />
      <Outlet />
    </div>
  );
};

export default HomePage;
