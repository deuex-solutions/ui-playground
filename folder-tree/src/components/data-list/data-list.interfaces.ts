export interface List {
    isFolder: boolean;
    name: string;
    children?: List[];
}

export interface DataListProps {
    list: List[];
    parent?: string;
}
