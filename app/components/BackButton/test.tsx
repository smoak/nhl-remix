import { createRemixStub } from "@remix-run/testing";
import { render, screen } from "@testing-library/react";
import { BackButton } from ".";

const RemixStub = createRemixStub([
  {
    path: "/",
    Component: BackButton,
  },
]);

describe("BackButton", () => {
  describe("when rendered", () => {
    beforeEach(() => {
      render(<RemixStub />);
    });

    it("it should render a button", () => {
      expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    });
  });
});
