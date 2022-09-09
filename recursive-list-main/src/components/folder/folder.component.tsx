import { Box, Link, Paper, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { FolderProps } from "./folder.interfaces";
import { useFolderStyles } from "./folder.styles";

const Folder = ({ folder }: FolderProps) => {
  const classes = useFolderStyles();

  return (
    /* Checks if it is a file or folder and renders accordingly */
    <div className={classes.folderContainer}>
      {folder.isFolder ? (
        <Link underline="none" component={RouterLink} to={folder.name}>
          <Paper className={classes.paper}>
            <Typography variant="h6">{folder.name}</Typography>
          </Paper>
        </Link>
      ) : (
        <Box className={classes.file}>
          {folder.path ? (
            <Link
              className={classes.fileLink}
              component={RouterLink}
              to={folder.name}
            >
              <Typography>{folder.name}</Typography>
            </Link>
          ) : (
            <Typography>{folder.name}</Typography>
          )}
        </Box>
      )}
    </div>
  );
};

export default Folder;
