import { makeStyles } from "@material-ui/core";

export const useFolderCardStyles = makeStyles((theme) => ({
    folderCardContainer: {
        height: "12rem",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
        background: "pink",
    },

    file: {
        height: "12rem",
        border: "1px solid #bdbdbd",
        width: "100%",
        padding: theme.spacing(2),
        borderRadius: "4px",
    },
}));
