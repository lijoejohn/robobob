import { Dispatch, SetStateAction } from "react";
import { SecondaryButton } from "../Buttons";
import { useQuestionsState } from "../../global-state/QuestionsContext";
import { DomPurify } from "../../helpers";
import { Header } from "./Header";
import { LABELS } from "../../constants/language";
import { TEST_IDS } from "../../constants/dataTestids";

export const SideBar = ({
  setRecentQuestion,
}: {
  setRecentQuestion: Dispatch<SetStateAction<string>>;
}): React.ReactElement => {
  const { questionsState } = useQuestionsState();

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-brandPrimary">
        <div className="mt-6">
          <Header />
          <hr className="border-t-0.5" />
        </div>
        {questionsState.length ? (
          <div className="flex flex-col justify-center mt-6">
            <header
              className="p-0 m-0 mb-5"
              data-testid={TEST_IDS.RECENT_QUESTIONS}
            >
              {LABELS.RECENT_QUESTIONS}
            </header>
            <div className="clear-both mb-2">
              {questionsState
                .slice(0)
                .reverse()
                .map(({ question, questionKey }) => {
                  return (
                    <SecondaryButton
                      key={questionKey}
                      onClick={() => setRecentQuestion(question)}
                    >
                      {DomPurify(question)}
                    </SecondaryButton>
                  );
                })}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
};
