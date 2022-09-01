import { Grid } from "@material-ui/core";
import { FileReader, FolderCard } from "components";
import { FunctionComponent, useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { getParamFromPathname } from "utils/params/params.util";
import { DataListProps, List } from "./data-list.interfaces";
import { useDataListStyles } from "./data-list.styles";

const DataList: FunctionComponent<DataListProps> = ({ list, parent }) => {
    const classes = useDataListStyles();

    const { pathname } = useLocation();

    const param = getParamFromPathname(pathname);

    const renderChildList = useCallback((item: List) => {
        if (item.path) {
            return (
                item.path && (
                    <Route
                        element={
                            <FileReader name={item.name} path={item.path} />
                        }
                        key={item.name}
                        path={item.name}
                    />
                )
            );
        }

        if (item.children) {
            return (
                <Route
                    element={
                        <DataList list={item.children} parent={item.name} />
                    }
                    key={item.name}
                    path={`${item.name}/*`}
                />
            );
        }

        return null;
    }, []);

    return (
        <div className={classes.dataListContainer}>
            {parent === param && (
                <Grid container spacing={2}>
                    {list.map((item) => (
                        <Grid item key={item.name} md={4} sm={6} xs={12}>
                            <FolderCard folder={item} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <Routes>{list.map((item) => renderChildList(item))}</Routes>
        </div>
    );
};

DataList.defaultProps = {
    parent: "",
};

export default DataList;
