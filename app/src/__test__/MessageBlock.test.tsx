import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MessageBlock } from "../components/";

const mockFunc = jest.fn();
window.HTMLElement.prototype.scrollTo = mockFunc;
describe("Test MessageBlock", function () {
  const setup = () => {
    const utils = render(
      <MessageBlock
        isQuestion={true}
        thread="Test Thread"
        threadKey="testkey"
      />
    );
    return utils;
  };

  it("Should render question block", async () => {
    const utils = setup();
    const checkContent = screen.getByTestId("testkey");
    expect(checkContent).toHaveTextContent("Test Thread");
    expect(utils.container.firstChild).toHaveClass("flex-row-reverse");
  });
  it("Should render answer block", async () => {
    const utils = render(
      <MessageBlock
        isQuestion={false}
        thread="Test Thread"
        threadKey="testkey"
      />
    );
    const checkContent = screen.getByTestId("testkey");
    expect(checkContent).toHaveTextContent("Test Thread");
    expect(utils.container.firstChild).toHaveClass("bg-gray-500");
  });
});
