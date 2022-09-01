interface IItem {
  title: string;
  id: string;
}
export interface IFile extends IItem {
  type: "file";
}
export interface IFolder extends IItem {
  type: "folder";
  children: (IFolder | IFile)[];
}
