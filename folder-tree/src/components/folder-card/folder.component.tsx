import { Paper } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FolderCardProps } from "./folder-card.interfaces";
import { useFolderCardStyles } from "./folder-card.styles";

const Folder: FunctionComponent<FolderCardProps> = ({
    folder,
    ...otherProps
}) => {
    const classes = useFolderCardStyles();

    return (
        <div className={classes.root} {...otherProps}>
            <Link to={`/${folder.name}`}>
                <Paper className={classes.paper}>{folder.name}</Paper>
            </Link>
        </div>
    );
};

export default Folder;
