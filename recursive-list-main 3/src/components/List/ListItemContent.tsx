import FolderContent from "./FolderContent";
import FileContent from "./FileContent";

interface IListItemContent {
  type: "folder" | "file";
  onClick: () => void;
  isOpen: boolean;
  title: string;
}
const ListItemContent = ({
  type,
  onClick,
  isOpen,
  title,
}: IListItemContent) => {
  if (type === "folder")
    return <FolderContent onClick={onClick} isOpen={isOpen} title={title} />;

  return <FileContent title={title} />;
};

export default ListItemContent;
