import { Box, Link, Paper, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { useFolderStyles } from "./folder.styles";

import { List } from "components/list/list.component";

export interface FolderProps {
  folder: List;
}

const Folder = ({ folder }: FolderProps) => {
  const classes = useFolderStyles();

  return (
    /* Checks if it is a file or folder and renders accordingly */
    <div className={classes.folderContainer}>
      {folder.isFolder ? (
        <Link
          style={{ textDecoration: "none" }}
          component={RouterLink}
          to={folder.name}
        >
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
