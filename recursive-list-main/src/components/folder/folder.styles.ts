import { makeStyles } from "@material-ui/core";

export const useFolderStyles = makeStyles(() => ({
  folderContainer: {
    height: "12rem",
    marginTop: "10px",
  },
  paper: {
    padding: "20px",
    height: "5rem",
    textAlign: "center",
    color: "white",
    width: "30%",
    backgroundColor: "#282c34",
    position: "relative",
    borderRadius: "0 6px 6px 6px",
    boxShadow: "4px 4px 7px rgba(0, 0, 0, 0.59)",
    "&::before": {
      content: "''",
      width: "50%",
      height: "12px",
      borderRadius: "0 20px 0 0",
      backgroundColor: "#282c34",
      position: "absolute",
      top: "-12px",
      left: 0,
    },
  },

  file: {
    height: "5rem",
    backgroundColor: "#92a8d1",
    padding: "20px",
    borderRadius: "4px",
    position: "relative",
    width: "30%",

    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      right: 0,
      borderBottomLeftRadius: "6px",
      borderWidth: "16px",
      backgroundColor: "#2b9bc",
      borderStyle: "solid",
      borderColor:
        "#a2b9bc #a2b9bc rgba(255,255,255,.35) rgba(255,255,255,.35)",
    },
  },
  fileLink: {
    display: "block",
    height: "100%",
    cursor: "pointer",
  },
}));
