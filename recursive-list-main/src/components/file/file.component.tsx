import { FunctionComponent } from "react";
import { LazyLog, ScrollFollow } from "react-lazylog";
import { useFileStyles } from "./file.styles";

export interface FileProps {
  path: string;
  name: string;
}

const File: FunctionComponent<FileProps> = ({ path }) => {
  const classes = useFileStyles();
  console.log(path);

  return (
    <div className={classes.fileRoot}>
      <ScrollFollow
        startFollowing
        render={() => <LazyLog extraLines={1} enableSearch stream url={path} />}
      />
    </div>
  );
};

export default File;
