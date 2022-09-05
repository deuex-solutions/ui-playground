import { Box, Link, Paper, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCommonStyles } from "utils/material-ui/common.styles";
import { FolderCardProps } from "./folder-card.interfaces";
import { useFolderCardStyles } from "./folder-card.styles";

const FolderCard: FunctionComponent<FolderCardProps> = ({
    folder,
    ...otherProps
}) => {
    const classes = useFolderCardStyles();
    const commonClasses = useCommonStyles();

    return (
        <div className={classes.folderCardContainer} {...otherProps}>
            {folder.isFolder ? (
                <Link component={RouterLink} to={folder.name}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6">{folder.name}</Typography>
                        <Box>
                            <Typography className={commonClasses.largeText}>
                                {folder.children?.length}
                            </Typography>
                        </Box>
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

export default FolderCard;
