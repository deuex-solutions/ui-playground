import { makeStyles } from "@material-ui/core";

export const useCommonStyles = makeStyles(() => ({
    centerItems: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    largeText: {
        fontSize: "1.5rem",
        fontWeight: "bold",
    },
}));
