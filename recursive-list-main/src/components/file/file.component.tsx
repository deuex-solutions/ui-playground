import { FunctionComponent } from "react";
import { LazyLog, ScrollFollow } from "react-lazylog";
import { useFileStyles } from "./file.styles";

export interface FileProps {
  path: string;
  name: string;
}

const File: FunctionComponent<FileProps> = ({ path }) => {
  const classes = useFileStyles();

  return (
    <div className={classes.fileRoot}>
      <ScrollFollow startFollowing render={() => <LazyLog url={path} />} />
    </div>
  );
};

export default File;
