import { render, screen } from "@testing-library/react";
import { DataList } from "components";
import { List } from "components/data-list/data-list.interfaces";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home-page.component";

jest.mock("components/breadcrumbs/breadcrumbs.component", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => (
        <div>
            <a href="/">Home</a>
            <a href="/src">src</a>
        </div>
    )),
}));

jest.mock("components/data-list/data-list.component", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((props) => (
        <div>
            {props.list.map((item: List) => (
                <p key={item.name}>{item.name}</p>
            ))}
        </div>
    )),
}));

describe("Home Page", () => {
    it("should render breadcrumbs component and set breadcrumb links", async () => {
        render(<HomePage />);

        expect(screen.getByText("Home")).toHaveAttribute("href", "/");
        expect(screen.getByText("src")).toHaveAttribute("href", "/src");
    });

    it("should render data list component in place of Outlet at base route", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route
                        element={
                            <DataList
                                list={[{ name: "app.test", isFolder: false }]}
                            />
                        }
                        path="/*"
                    />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText("app.test")).toBeInTheDocument();
    });
});
