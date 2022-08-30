import { Grid } from "@material-ui/core";
import { FolderCard } from "components";
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
        return (
            item.children && (
                <Routes key={item.name}>
                    <Route
                        element={
                            <DataList list={item.children} parent={item.name} />
                        }
                        path=":slug/*"
                    />
                </Routes>
            )
        );
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

            {list.map((item) => item.children && renderChildList(item))}
        </div>
    );
};

DataList.defaultProps = {
    parent: "",
};

export default DataList;
