import { render, screen } from "@testing-library/react";
import { TeamRecord } from "./index";

describe("TeamRecord", () => {
  beforeEach(() => {
    render(<TeamRecord wins={5} losses={0} otWins={1} />);
  });

  it("renders correctly", () => {
    expect(screen.getByText("5-0-1")).toBeInTheDocument();
  });
});
