import { makeStyles } from "@material-ui/core";

export const useFolderCardStyles = makeStyles((theme) => ({
    root: {
        height: "12rem",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
        background: "pink",
    },
}));
