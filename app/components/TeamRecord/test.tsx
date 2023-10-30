import { render, screen } from "@testing-library/react";
import { TeamRecord } from "./index";

describe("TeamRecord", () => {
  describe("with a record", () => {
    beforeEach(() => {
      render(<TeamRecord record="5-0-1" />);
    });

    it("renders correctly", () => {
      expect(screen.getByText("5-0-1")).toBeInTheDocument();
    });
  });

  describe("without a record", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(<TeamRecord />).container;
    });

    it("renders empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });
});
