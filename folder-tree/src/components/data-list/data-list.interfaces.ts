export interface List {
    isFolder: boolean;
    name: string;
    children?: List[];
}

export interface DataListProps {
    list: List[];
    onChange: (item: List[]) => void;
}
