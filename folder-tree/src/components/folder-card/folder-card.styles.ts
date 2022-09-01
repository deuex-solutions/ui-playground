import { makeStyles } from "@material-ui/core";

export const useFolderCardStyles = makeStyles((theme) => ({
    folderCardContainer: {
        height: "12rem",
        marginTop: "10px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: "100%",
        backgroundColor: "pink",
        position: "relative",
        borderRadius: "0 6px 6px 6px",
        boxShadow: "4px 4px 7px rgba(0, 0, 0, 0.59)",
        "&::before": {
            content: "''",
            width: "50%",
            height: "12px",
            borderRadius: "0 20px 0 0",
            backgroundColor: "pink",
            position: "absolute",
            top: "-12px",
            left: "0",
        },
    },

    file: {
        height: "12rem",
        border: "1px solid #bdbdbd",
        width: "100%",
        padding: theme.spacing(2),
        borderRadius: "4px",
    },
}));
