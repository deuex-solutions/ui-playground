import folderData from "assets/data/folder-data.json";
import { FunctionComponent, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(
    () => import("../../pages/home-page/home-page.component")
);

const DataList = lazy(
    () => import("../../components/data-list/data-list.component")
);
const AppRouter: FunctionComponent = () => {
    return (
        <Suspense fallback={<h4>Loading...</h4>}>
            <Routes>
                <Route element={<HomePage />}>
                    <Route element={<DataList list={folderData} />} path="/*" />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
