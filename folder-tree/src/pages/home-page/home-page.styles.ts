import { makeStyles } from "@material-ui/core";

export const useHomePageStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        margin: "0 auto",
        padding: theme.spacing(1),
        minHeight: "100vh",
        [theme.breakpoints.up("sm")]: {
            maxWidth: "70%",
            padding: theme.spacing(3),
        },
    },
}));
