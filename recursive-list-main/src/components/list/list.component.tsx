import { Grid } from "@material-ui/core";
import { File, Folder } from "components";
import { FunctionComponent, useCallback } from "react";
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

const ListData: FunctionComponent<ListDataProps> = ({ list, parent }) => {
  const classes = useListStyles();

  const { pathname } = useLocation();

  const param = getParamFromPathname(pathname);

  const renderChildList = useCallback((item: List) => {
    if (item.path) {
      return (
        <Route
          element={<File name={item.name} path={item.path} />}
          key={item.name}
          path={item.name}
        />
      );
    }

    if (item.children) {
      return (
        <Route
          element={<ListData list={item.children} parent={item.name} />}
          key={item.name}
          path={`${item.name}/*`}
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
            <Grid item key={item.name} md={4} sm={6} xs={12}>
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
