import styles from "./index.module.scss";
import ExpandArrowIcon from "../Icons/ExpandArrow";
import ExpandedArrowIcon from "../Icons/ExpandedArrow";
import ClosedFolderIcon from "../Icons/ClosedFolder";
import OpenFolderIcon from "../Icons/OpenFolder";
import { useRef } from "react";
import ContextMenu from "../Menus/ContextMenu";

interface IFolderContentProps {
  onClick: () => void;
  isOpen: boolean;
  title: string;
}

const contextMenuOptions = [
  { label: "New File", action: () => alert("New File") },
  { label: "New Folder", action: () => alert("New Folder") },
  { label: "Rename", action: () => alert("Rename") },
  { label: "Delete", action: () => alert("Delete") },
];

const FolderContent = ({ onClick, isOpen, title }: IFolderContentProps) => {
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
            <ExpandedArrowIcon />
            <OpenFolderIcon />
          </>
        ) : (
          <>
            <ExpandArrowIcon />
            <ClosedFolderIcon />
          </>
        )}
        {title}{" "}
      </span>
      <ContextMenu options={contextMenuOptions} parentRef={folderRef} />
    </>
  );
};

export default FolderContent;
