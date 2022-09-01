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
    <div
      className={styles.unorderedList}
      style={{ display: "inline-flex", columnGap: "50px" }}
    >
      {items.map(
        ({
          type,
          name,
          children,
          id,
        }: (IFile | IFolder) & { children?: (IFile | IFolder)[] }) => {
          return (
            <div key={`Type:${type} Name:${name}`} className={styles.listItem}>
              <ListItemContent
                type={type}
                isOpen={!!openFolderRecord[id]}
                name={name}
                onClick={() => handleFolderClick(id)}
              />
              {openFolderRecord[id] && !!children?.length && (
                <List
                  items={children}
                  openFolderRecord={openFolderRecord}
                  handleFolderClick={handleFolderClick}
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default List;
