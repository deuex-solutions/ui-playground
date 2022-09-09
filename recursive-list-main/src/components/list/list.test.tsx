import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ListData } from "../index";
import { List } from "./list.interfaces";

jest.mock("../folder/folder.component", () => ({
  default: jest
    .fn()
    .mockImplementation((props) => <div>{props.folder.name}</div>),
}));

jest.mock("../file/file.component", () => ({
  default: jest.fn().mockImplementation((props) => <div>{props.path}</div>),
}));

jest.mock("utils/params/params.util", () => ({
  getParamFromPathname: jest.fn().mockReturnValue("public"),
}));

const mockList: List[] = [
  {
    name: "public",
    isFolder: true,
    children: [
      {
        name: "example.txt",
        isFolder: false,
      },
    ],
  },
];
describe("ListData", () => {
  it("Should display file with a given path", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/Content/Index/home.log"]}>
        <ListData
          list={[
            {
              name: "home.log",
              isFolder: false,
              path: "/Content/Index/home.log",
            },
          ]}
        />
        <Routes>
          <Route element={<div>home.log</div>} path="/Content/Index/home.log" />
        </Routes>
      </MemoryRouter>
    );
    expect(getByText("home.log")).toBeInTheDocument();
  });

  it("Should display list items when list has data", () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <ListData
          list={[{ name: "test.css", isFolder: false }]}
          parent="test"
        />
      </MemoryRouter>
    );

    expect(getAllByTestId("list-container")[0]).toBeInTheDocument();
  });

  it("Should display data list component when item has children", () => {
    const { getAllByTestId } = render(
      <MemoryRouter initialEntries={["/"]}>
        <ListData list={mockList} />
        <Routes>
          <Route
            element={
              <ListData
                list={[
                  {
                    name: "example.txt",
                    isFolder: false,
                  },
                ]}
                parent="public"
              />
            }
            path="/*"
          />
        </Routes>
      </MemoryRouter>
    );

    expect(getAllByTestId("list-container")[0]).toBeInTheDocument();
  });
});
