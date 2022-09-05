import { render, screen } from "@testing-library/react";
import FileReader from "components/file-reader/file-reader.component";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DataList from "./data-list.component";
import { List } from "./data-list.interfaces";

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as Record<string, unknown>),
    useLocation: jest.fn().mockImplementation(() => mockLocation),
}));

jest.mock("../folder-card/folder-card.component", () => ({
    __esModule: true,
    default: jest
        .fn()
        .mockImplementation((props) => <div>{props.folder.name}</div>),
}));

jest.mock("../file-reader/file-reader.component", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((props) => <div>{props.path}</div>),
}));

jest.mock("utils/params/params.util", () => ({
    getParamFromPathname: jest.fn().mockReturnValue("app"),
}));

describe("DataList", () => {
    it("should render list items when list has data and parent and param are same", () => {
        render(
            <MemoryRouter>
                <DataList
                    list={[{ name: "app.css", isFolder: false }]}
                    parent="app"
                />
            </MemoryRouter>
        );

        expect(screen.getByText("app.css")).toBeInTheDocument();
    });

    it("should render file reader component when item has path", () => {
        render(
            <MemoryRouter initialEntries={["/assets/random/abc.log"]}>
                <DataList
                    list={[
                        {
                            name: "app.log",
                            isFolder: false,
                            path: "/assets/random/abc.log",
                        },
                    ]}
                />
                <Routes>
                    <Route
                        element={
                            <FileReader
                                name="app.log"
                                path="/assets/random/abc.log"
                            />
                        }
                        path="/assets/random/abc.log"
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("/assets/random/abc.log")).toBeInTheDocument();
    });

    it("should re-render data list component when item has children", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <DataList list={mockDataList} />
                <Routes>
                    <Route
                        element={
                            <DataList
                                list={[
                                    {
                                        name: "file.txt",
                                        isFolder: false,
                                    },
                                ]}
                                parent="app"
                            />
                        }
                        path="/*"
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("file.txt")).toBeInTheDocument();
    });
});
const mockLocation = jest.fn();
const mockDataList: List[] = [
    {
        name: "app",
        isFolder: true,
        children: [
            {
                name: "file.txt",
                isFolder: false,
            },
        ],
    },
];
