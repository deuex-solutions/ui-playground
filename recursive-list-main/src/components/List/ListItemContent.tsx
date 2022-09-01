import FolderContent from "./FolderContent";
import FileContent from "./FileContent";

interface IListItemContent {
  type: "folder" | "file";
  onClick: () => void;
  isOpen: boolean;
  name: string;
}
const ListItemContent = ({ type, onClick, isOpen, name }: IListItemContent) => {
  if (type === "folder")
    return <FolderContent onClick={onClick} isOpen={isOpen} name={name} />;

  return <FileContent name={name} />;
};

export default ListItemContent;
