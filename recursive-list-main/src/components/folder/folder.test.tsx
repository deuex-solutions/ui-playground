import { render, screen } from "@testing-library/react";
import { List } from "components/list/list.component";
import { MemoryRouter } from "react-router-dom";
import Folder from "./folder.component";

let folder: List = { isFolder: true, name: "src" };

describe("Folder", () => {
  it("should open folder if it is a folder", () => {
    render(
      <MemoryRouter>
        <Folder folder={folder} />
      </MemoryRouter>
    );

    expect(screen.getByText("src").closest("a")).toHaveAttribute(
      "href",
      "/src"
    );
  });

  it("should render path link when `path` has value", () => {
    folder = {
      path: "https://gist.githubusercontent.com/helfi92/96d4444aa0ed46c5f9060a789d316100/raw/ba0d30a9877ea5cc23c7afcd44505dbc2bab1538/typical-live_backing.log",
      name: "home.log",
      isFolder: false,
    };
    render(
      <MemoryRouter>
        <Folder folder={folder} />
      </MemoryRouter>
    );

    expect(screen.getByText("home.log").closest("a")).toHaveAttribute(
      "href",
      "/home.log"
    );
  });
});
