export interface List {
    isFolder: boolean;
    name: string;
    children?: List[];
    path?: string;
}

export interface DataListProps {
    list: List[];
    parent?: string;
}
