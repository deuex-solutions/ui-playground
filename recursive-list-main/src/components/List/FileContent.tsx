import styles from "./index.module.scss";
import FileIcon from "../Icons/File";
import { useRef } from "react";

interface IFileContentProps {
  name: string;
}

const FileContent = ({ name }: IFileContentProps) => {
  const fileRef = useRef<HTMLSpanElement>(null);
  return (
    <>
      <span className={styles.fileLineContent} ref={fileRef}>
        <FileIcon />
        {name}{" "}
      </span>
    </>
  );
};

export default FileContent;
