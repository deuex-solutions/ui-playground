import styles from "./index.module.scss";
import ClosedFolderIcon from "../Icons/ClosedFolder";
import OpenFolderIcon from "../Icons/OpenFolder";
import { useRef } from "react";

interface IFolderContentProps {
  onClick: () => void;
  isOpen: boolean;
  name: string;
}

const FolderContent = ({ onClick, isOpen, name }: IFolderContentProps) => {
  const folderRef = useRef<HTMLSpanElement>(null);

  return (
    <>
      <span
        className={styles.folderLineContent}
        onClick={onClick}
        ref={folderRef}
      >
        {isOpen ? (
          <>
            <OpenFolderIcon />
          </>
        ) : (
          <>
            <ClosedFolderIcon />
          </>
        )}
        {name}{" "}
      </span>
    </>
  );
};

export default FolderContent;
