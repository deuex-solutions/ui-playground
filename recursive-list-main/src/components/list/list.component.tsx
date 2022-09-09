import { Grid } from "@material-ui/core";
import { File, Folder } from "components";
import { useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { getParamFromPathname } from "utils/params/params.util";
import { useListStyles } from "./list.styles";

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

const ListData = ({ list, parent }: ListDataProps) => {
  const classes = useListStyles();

  const { pathname } = useLocation();

  const param = getParamFromPathname(pathname);

  /* returns List of files and routes them accordingly */
  const renderChildList = useCallback((ListItem: List) => {
    if (ListItem.path) {
      return (
        <Route
          element={<File name={ListItem.name} path={ListItem.path} />}
          key={ListItem.name}
          path={ListItem.name}
        />
      );
    }

    /* checks if children exists */

    if (ListItem.children) {
      return (
        <Route
          element={<ListData list={ListItem.children} parent={ListItem.name} />}
          key={ListItem.name}
          path={`${ListItem.name}/*`}
        />
      );
    }

    return null;
  }, []);

  return (
    <div className={classes.ListContainer} data-testid="list-container">
      {parent === param && (
        <Grid container spacing={2}>
          {list.map((item) => (
            <Grid item key={item.name} md={4}>
              <Folder folder={item} />
            </Grid>
          ))}
        </Grid>
      )}
      <Routes>{list.map((item) => renderChildList(item))}</Routes>
    </div>
  );
};

ListData.defaultProps = {
  parent: "",
};

export default ListData;
