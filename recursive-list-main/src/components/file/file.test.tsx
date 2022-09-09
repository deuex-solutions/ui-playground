import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import File from "./file.component";

describe("File", () => {
  it("Should display file if it contains content", () => {
    render(
      <MemoryRouter>
        <File name="home.log" path="/content/home.log" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("log")).toBeInTheDocument();
  });
});
