import { Grid } from "@material-ui/core";
import { FolderCard } from "components";
import { FunctionComponent } from "react";
import { DataListProps } from "./data-list.interfaces";

const DataList: FunctionComponent<DataListProps> = ({ list, onChange }) => {
    return (
        <div>
            <Grid container spacing={3}>
                {list.map((item) => (
                    <Grid item key={item.name} xs={4}>
                        {item.isFolder ? (
                            <FolderCard
                                folder={item}
                                onClick={() => {
                                    if (item.children) {
                                        onChange(item.children);
                                    }
                                }}
                            />
                        ) : (
                            <h4>{item.name}</h4>
                        )}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default DataList;
