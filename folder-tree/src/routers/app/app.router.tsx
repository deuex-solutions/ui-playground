import folderData from "assets/data/folder-data.json";
import { DataList } from "components";
import { HomePage } from "pages";
import { FunctionComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter: FunctionComponent = () => {
    return (
        <Suspense>
            <Routes>
                <Route element={<HomePage />}>
                    <Route element={<DataList list={folderData} />} path="/*" />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
