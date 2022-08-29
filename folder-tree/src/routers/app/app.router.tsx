import { HomePage } from "pages";
import { FunctionComponent, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter: FunctionComponent = () => {
    return (
        <Suspense>
            <Routes>
                <Route element={<HomePage />} path="/:slug" />
                <Route element={<HomePage />} path="/" />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
