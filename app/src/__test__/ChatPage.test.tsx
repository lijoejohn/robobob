import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { QuestionsProvider } from "../global-state/QuestionsContext";
import { ThreadsProvider } from "../global-state/ThreadsContext";
import ChatPage from "../pages/ChatPage";
import { Thread, ThreadType, Question } from "../types";
import { TEST_IDS } from "../constants/dataTestids";

const mockQuestionsContext: Question[] = [
  { question: "test", questionKey: "test" },
];
const mockThreadsContext: Thread[] = [
  { thread: "test", threadKey: "test", threadType: ThreadType.Question },
  { thread: "test1", threadKey: "test1", threadType: ThreadType.Answer },
];
const mockFunc = jest.fn();
window.HTMLElement.prototype.scrollTo = mockFunc;
describe("Test ChatPage", function () {
  const setup = () => {
    const utils = render(
      <QuestionsProvider value={mockQuestionsContext}>
        <ThreadsProvider value={mockThreadsContext}>
          <ChatPage recentQuestion="" />
        </ThreadsProvider>
      </QuestionsProvider>
    );
    return utils;
  };

  it("Should render with Standard Accessibility", async () => {
    expect.extend(toHaveNoViolations);
    const utils = setup();
    expect(await axe(utils.container)).toHaveNoViolations();
  });

  it("Should scroll on page load to input box", async () => {
    setup();
    expect(mockFunc).toHaveBeenCalled();
  });

  it("Send message button should be disabled", async () => {
    setup();
    expect(screen.getByTestId(`${TEST_IDS.SEND_BUTTON}`)).toHaveProperty(
      "disabled",
      true
    );
  });
  it("Should render thread block", async () => {
    setup();
    expect(screen.getByTestId("test")).toBeInTheDocument();
    expect(screen.getByTestId("test1")).toBeInTheDocument();
  });
  it("Send message button should be enabled on type", async () => {
    setup();
    fireEvent.change(screen.getByTestId("send-message"), {
      target: {
        value: "message",
      },
    });
    expect(screen.getByTestId(`${TEST_IDS.SEND_BUTTON}`)).toHaveProperty(
      "disabled",
      false
    );
    act(() => {
      fireEvent.click(screen.getByTestId(`${TEST_IDS.SEND_BUTTON}`));
    });
  });
  it("Send message button should be enabled on type for maths question", async () => {
    setup();
    fireEvent.change(screen.getByTestId("send-message"), {
      target: {
        value: "1+1",
      },
    });
    expect(screen.getByTestId(`${TEST_IDS.SEND_BUTTON}`)).toHaveProperty(
      "disabled",
      false
    );
    act(() => {
      fireEvent.click(screen.getByTestId(`${TEST_IDS.SEND_BUTTON}`));
    });
  });
});
