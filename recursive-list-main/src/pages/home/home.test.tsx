import { render, screen } from "@testing-library/react";
import { ListData } from "components";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home.component";

describe("Home Page", () => {
  it("Home Page is rendered properly", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("home_svg")).toHaveAttribute("href", "/");
  });
});

it("List data component is rendered properly", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          element={
            <ListData list={[{ name: "index.html", isFolder: false }]} />
          }
          path="/*"
        />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText("index.html")).toBeInTheDocument();
});
