import { LazyLog, ScrollFollow } from "react-lazylog";
import { FileProps } from "./file.interfaces";
import { useFileStyles } from "./file.styles";

const File = ({ path }: FileProps) => {
  const classes = useFileStyles();
  return (
    /* displays the content of log file
    @param {url} path Path to the file */

    <div className={classes.fileRoot} data-testid="log">
      <ScrollFollow
        startFollowing
        render={() => <LazyLog extraLines={1} enableSearch stream url={path} />}
      />
    </div>
  );
};

export default File;
