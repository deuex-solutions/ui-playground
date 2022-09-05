import folderData from "assets/data/data.json";
import { FunctionComponent, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/home/home.component"));

const List = lazy(() => import("../../components/list/list.component"));

const AppRouter: FunctionComponent = () => {
  return (
    <Suspense fallback={<h4>Loading...</h4>}>
      <Routes>
        <Route element={<HomePage />}>
          <Route element={<List list={folderData} />} path="/*" />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
