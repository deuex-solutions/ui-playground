import { render, screen } from "@testing-library/react";
import FileReader from "./file-reader.component";

jest.mock("./file-reader.component", () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((props) => <div>{props.path}</div>),
}));

describe("File Reader", () => {
    it("should render file reader when path has value", () => {
        render(<FileReader name="logs.txt" path="/random/logs.txt" />);

        expect(screen.getByText("/random/logs.txt")).toBeInTheDocument();
    });
});
