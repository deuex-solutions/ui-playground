import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import File from "./file.component";

describe("File", () => {
  it("Display file if it contains content", () => {
    render(
      <MemoryRouter>
        <File
          name="home.log"
          path="https://gist.githubusercontent.com/helfi92/96d4444aa0ed46c5f9060a789d316100/raw/ba0d30a9877ea5cc23c7afcd44505dbc2bab1538/typical-live_backing.log"
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId("log")).toBeInTheDocument();
  });
});
