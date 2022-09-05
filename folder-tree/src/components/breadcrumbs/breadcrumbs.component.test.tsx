import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "components";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as Record<string, unknown>),
    useLocation: jest.fn().mockImplementation(() => ({ pathname: "/src" })),
}));

describe("Breadcrumbs", () => {
    it("should render home breadcrumbs links by default", () => {
        render(
            <MemoryRouter>
                <Breadcrumbs />
            </MemoryRouter>
        );

        expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    });

    it("should render breadcrumbs links based on links from getBreadcrumbList", () => {
        render(
            <MemoryRouter>
                <Breadcrumbs />
            </MemoryRouter>
        );

        expect(screen.getByText("src")).toHaveAttribute("href", "/src");
    });
});
