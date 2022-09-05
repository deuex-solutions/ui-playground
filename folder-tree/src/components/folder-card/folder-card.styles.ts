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
            left: 0,
        },
    },

    file: {
        height: "12rem",
        backgroundColor: "#bdbdbd",
        width: "100%",
        padding: theme.spacing(2),
        borderRadius: "4px",
        position: "relative",
        borderBottomLeftRadius: "4px",

        "&::before": {
            content: "''",
            position: "absolute",
            top: 0,
            right: 0,
            borderBottomLeftRadius: "4px",
            borderWidth: "16px",
            borderStyle: "solid",
            borderColor:
                "#fff #fff rgba(255,255,255,.35) rgba(255,255,255,.35)",
        },
    },
    fileLink: {
        display: "block",
        height: "100%",
        cursor: "pointer",
    },
}));
