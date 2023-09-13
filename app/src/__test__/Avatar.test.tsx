import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Avatar } from "../components/";
import { LABELS } from "../constants/language";

const mockFunc = jest.fn();
window.HTMLElement.prototype.scrollTo = mockFunc;
describe("Test Avatar", function () {
  const setup = () => {
    return render(<Avatar isQuestion={true} />);
  };

  it("Should render question block", async () => {
    const utils = setup();
    expect(utils.container.firstChild).toHaveTextContent(LABELS.YOU);
    expect(utils.container.firstChild).toHaveClass("bg-white");
    expect(utils.container.firstChild).toHaveClass("text-black");
  });
  it("Should render answer block", async () => {
    const utils = render(<Avatar isQuestion={false} />);
    expect(utils.container.firstChild).toHaveTextContent(LABELS.BOB);
    expect(utils.container.firstChild).toHaveClass("bg-red-900");
    expect(utils.container.firstChild).toHaveClass("text-white");
  });
});
