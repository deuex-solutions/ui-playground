import { IFile, IFolder } from "../../types/global";
import styles from "./index.module.scss";
import ListItemContent from "./ListItemContent";

interface IListProps {
  items: (IFolder | IFile)[];
  openFolderRecord: Record<string, boolean>;
  handleFolderClick: (id: string) => void;
}

const List = ({ items, openFolderRecord, handleFolderClick }: IListProps) => {
  return (
    <ul className={styles.unorderedList}>
      {items.map(
        ({
          type,
          title,
          children,
          id,
        }: (IFile | IFolder) & { children?: (IFile | IFolder)[] }) => {
          return (
            <li key={`Type:${type} Title:${title}`} className={styles.listItem}>
              <ListItemContent
                type={type}
                isOpen={!!openFolderRecord[id]}
                title={title}
                onClick={() => handleFolderClick(id)}
              />
              {openFolderRecord[id] && !!children?.length && (
                <List
                  items={children}
                  openFolderRecord={openFolderRecord}
                  handleFolderClick={handleFolderClick}
                />
              )}
            </li>
          );
        }
      )}
    </ul>
  );
};

export default List;
