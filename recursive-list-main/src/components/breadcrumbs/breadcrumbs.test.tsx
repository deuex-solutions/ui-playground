import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "components";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Breadcrumbs", () => {
  it("display home breadcrumb by default", () => {
    render(
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
  });
});
