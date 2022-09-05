import { render, screen } from "@testing-library/react";
import { DataList } from "components";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppRouter from "./app.router";

jest.mock("pages/home-page/home-page.component", () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue("testHomePage"),
}));

jest.mock("components/data-list/data-list.component", () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue("testDataListComponent"),
}));

describe("App Router", () => {
    it("should render loading indicator at initial loading", async () => {
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        expect(screen.findByText("Loading...")).resolves.toBeInTheDocument();
    });

    it("should render home page at base path", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route element={<AppRouter />} path="/*" />
                </Routes>
            </MemoryRouter>
        );

        await expect(
            screen.findByText("testHomePage")
        ).resolves.toBeInTheDocument();
    });

    it("should render data list component at other paths", async () => {
        render(
            <MemoryRouter initialEntries={["/src"]}>
                <Routes>
                    <Route element={<DataList list={[]} />} path="/*" />
                </Routes>
            </MemoryRouter>
        );

        await expect(
            screen.findByText("testDataListComponent")
        ).resolves.toBeInTheDocument();
    });

    it("should render home page by default", async () => {
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        await expect(
            screen.findByText("testHomePage")
        ).resolves.toBeInTheDocument();
    });
});
