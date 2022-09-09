import { makeStyles } from "@material-ui/core";

export const useFolderStyles = makeStyles(() => ({
  folderContainer: {
    height: "12rem",
    marginTop: "10px",
  },
  paper: {
    backgroundColor: "#282c34",
    borderRadius: "0 4px 4px 4px",
    boxShadow: "4px 4px 7px rgba(0, 0, 0, 0.59)",
    color: "white",
    height: "5rem",
    padding: "20px",
    position: "relative",
    textAlign: "center",
    width: "30%",
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
    backgroundColor: "#92a8d1",
    borderRadius: "4px",
    height: "5rem",
    padding: "20px",
    position: "relative",
    width: "30%",

    "&::before": {
      backgroundColor: "#2b9bc",
      borderStyle: "solid",
      borderColor:
        "#a2b9bc #a2b9bc rgba(255,255,255,.35) rgba(255,255,255,.35)",
      borderBottomLeftRadius: "6px",
      borderWidth: "16px",
      content: "''",
      position: "absolute",
      top: 0,
      right: 0,
    },
  },
  fileLink: {
    display: "block",
    height: "100%",
    cursor: "pointer",
  },
}));
