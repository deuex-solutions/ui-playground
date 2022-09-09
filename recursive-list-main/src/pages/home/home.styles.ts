import { makeStyles } from "@material-ui/core";

export const useHomePageStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "80%",
      padding: theme.spacing(2),
    },
  },
}));
