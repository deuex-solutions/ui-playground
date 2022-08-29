import folderList from "assets/data/folder-data.json";
import { Breadcrumbs, DataList } from "components";
import { List } from "components/data-list/data-list.interfaces";
import { FunctionComponent, useCallback } from "react";
import { useParams } from "react-router-dom";
import { GetFilteredList } from "./home-page.interfaces";

const HomePage: FunctionComponent = () => {
    const { slug: name = "" } = useParams();

    const getFilteredList: GetFilteredList = useCallback(
        (arr: List[], pathname: string) => {
            const result: List[] = [];
            let subList = false;

            if (pathname) {
                arr.forEach((item) => {
                    if (item.name === pathname && item.isFolder) {
                        result.push(...(item?.children || []));
                        subList = true;
                    }
                    if (!subList && item.name !== pathname && item.children) {
                        const subItems = getFilteredList(
                            item.children,
                            pathname
                        );
                        result.push(...subItems);
                    }
                });

                return result;
            }

            return folderList;
        },
        []
    );

    const list = getFilteredList(folderList, name);

    return (
        <div>
            <Breadcrumbs />
            <DataList list={list} onChange={() => console.log()} />
        </div>
    );
};

export default HomePage;
