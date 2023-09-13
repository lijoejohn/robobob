import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-test-renderer";
import { axe, toHaveNoViolations } from "jest-axe";
import { QuestionsProvider } from "../global-state/QuestionsContext";
import { SideBar } from "../components/layout";
import { Question } from "../types";
import { TEST_IDS } from "../constants/dataTestids";
import { LABELS } from "../constants/language";
const mockQuestionsContext: Question[] = [
  { question: "test", questionKey: "test" },
];

window.HTMLElement.prototype.scrollTo = function () {};
const mockFunc = jest.fn();
describe("Test Side Bar", function () {
  const setup = () => {
    const utils = render(
      <QuestionsProvider value={mockQuestionsContext}>
        <SideBar setRecentQuestion={mockFunc} />
      </QuestionsProvider>
    );
    return utils;
  };

  it("Should render with Standard Accessibility", async () => {
    const utils = setup();
    expect.extend(toHaveNoViolations);
    expect(await axe(utils.container)).toHaveNoViolations();
  });
  it("Should render with correct headings", async () => {
    setup();
    expect(screen.getByTestId(`${TEST_IDS.APP_NAME}`)).toHaveTextContent(
      LABELS.APP_NAME
    );
    expect(
      screen.getByTestId(`${TEST_IDS.RECENT_QUESTIONS}`)
    ).toHaveTextContent(LABELS.RECENT_QUESTIONS);
  });
  it("Should render with one recent question", async () => {
    setup();
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
  it("Should call the callback function on recent question click", async () => {
    setup();
    act(() => {
      fireEvent.click(screen.getByRole("button"));
      expect(mockFunc).toHaveBeenCalledWith("test");
    });
  });

  it("Should not renderrecent question if context is empty", async () => {
    render(
      <QuestionsProvider value={[]}>
        <SideBar setRecentQuestion={mockFunc} />
      </QuestionsProvider>
    );
    const button = screen.queryByText("test");
    expect(button).toBeNull();
  });
});
