import { render, screen } from "@testing-library/react";
import { NHL } from "./NHL";

describe("NHL", () => {
  beforeEach(() => {
    render(<NHL size={96} />);
  });

  it("should render an svg", () => {
    expect(
      screen.getByRole("presentation", { hidden: true })
    ).toBeInTheDocument();
  });
});
