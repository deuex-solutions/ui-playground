import { render, screen } from "@testing-library/react";
import File from "components/file/file.component";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ListData } from "../index";
import { List } from "./list.component";

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
  //Currently not working

  // it("Display file with path", () => {
  //   const abc = render(
  //     <MemoryRouter initialEntries={["/Content/Index/home.log"]}>
  //       <ListData
  //         list={[
  //           {
  //             name: "home.log",
  //             isFolder: false,
  //             path: "/Content/Index/home.log",
  //           },
  //         ]}
  //       />
  //       <Routes>
  //         <Route
  //           element={<File name="home.log" path="/Content/Index/home.log" />}
  //           path="/Content/Index/home.log"
  //         />
  //       </Routes>
  //     </MemoryRouter>
  //   );
  //   expect(abc.getByText("/Content/Index/home.log")).toBeInTheDocument();
  // });

  it("Display list items when list has data", () => {
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

  it("display data list component when item has children", () => {
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
