import { List } from "components/data-list/data-list.interfaces";

export type GetFilteredList = {
    (items: List[], pathname: string): List[];
};
