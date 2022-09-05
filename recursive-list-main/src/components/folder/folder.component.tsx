import { Box, Link, Paper, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFolderStyles } from "./folder.styles";

import { List } from "components/list/list.component";

export interface FolderProps {
  folder: List;
}

const Folder: FunctionComponent<FolderProps> = ({ folder, ...otherProps }) => {
  const classes = useFolderStyles();

  return (
    <div className={classes.folderContainer} {...otherProps}>
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
