import { FunctionComponent } from "react";
import { LazyLog, ScrollFollow } from "react-lazylog";
import { FileReaderProps } from "./file-reader.interfaces";
import { useFileReaderStyles } from "./file-reader.styles";

const FileReader: FunctionComponent<FileReaderProps> = ({ path }) => {
    const classes = useFileReaderStyles();

    return (
        <div className={classes.fileReaderRoot}>
            <ScrollFollow
                startFollowing
                render={() => <LazyLog url={path} />}
            />
        </div>
    );
};

export default FileReader;
