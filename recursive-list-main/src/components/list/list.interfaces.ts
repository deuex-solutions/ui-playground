export interface List {
  isFolder: boolean;
  name: string;
  children?: List[];
  path?: string;
}

export interface ListDataProps {
  list: List[];
  parent?: string;
}
