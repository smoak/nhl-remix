import { render, screen } from "@testing-library/react";

import { Footer } from "./index";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("should render correctly", () => {
    expect(
      screen.getByRole("link", { name: "Sasha Moak" }),
    ).toBeInTheDocument();
  });
});
