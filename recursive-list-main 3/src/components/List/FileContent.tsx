import styles from "./index.module.scss";
import FileIcon from "../Icons/File";
import { useRef } from "react";
import ContextMenu from "../Menus/ContextMenu";

interface IFileContentProps {
  title: string;
}

const contextMenuOptions = [
  { label: "Rename", action: () => alert("Rename") },
  { label: "Delete", action: () => alert("Delete") },
];

const FileContent = ({ title }: IFileContentProps) => {
  const fileRef = useRef<HTMLSpanElement>(null);
  return (
    <>
      <span className={styles.fileLineContent} ref={fileRef}>
        <FileIcon />
        {title}{" "}
      </span>
      <ContextMenu options={contextMenuOptions} parentRef={fileRef} />
    </>
  );
};

export default FileContent;
