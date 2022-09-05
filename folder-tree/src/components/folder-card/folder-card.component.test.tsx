import { render, screen } from "@testing-library/react";
import { List } from "components/data-list/data-list.interfaces";
import { MemoryRouter } from "react-router-dom";
import FolderCard from "./folder-card.component";

describe("FolderCard", () => {
    it("should render folder link when `isFolder` is true", () => {
        render(
            <MemoryRouter>
                <FolderCard folder={folder} />
            </MemoryRouter>
        );

        expect(screen.getByText("components").closest("a")).toHaveAttribute(
            "href",
            "/components"
        );
    });

    it("should render path link when `path` has value", () => {
        folder = {
            path: "/random/data.log",
            name: "data.log",
            isFolder: false,
        };
        render(
            <MemoryRouter>
                <FolderCard folder={folder} />
            </MemoryRouter>
        );

        expect(screen.getByText("data.log").closest("a")).toHaveAttribute(
            "href",
            "/data.log"
        );
    });

    it("should render folder name when `path` and `isFolder` are not true", () => {
        folder = { name: "abc.txt", isFolder: false };
        render(
            <MemoryRouter>
                <FolderCard folder={folder} />
            </MemoryRouter>
        );

        expect(screen.getByText("abc.txt")).toBeInTheDocument();
    });
});
let folder: List = { isFolder: true, name: "components" };
