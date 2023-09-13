import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import { SideBar } from "./components/layout/";
import { ErrorBoundary } from "./components";
import { QuestionsProvider } from "./global-state/QuestionsContext";
import { ThreadsProvider } from "./global-state/ThreadsContext";

function App() {
  const [recentQuestion, setRecentQuestion] = useState<string>("");
  return (
    <ErrorBoundary>
      {/* Recent questions context provider */}
      <QuestionsProvider>
        <SideBar setRecentQuestion={setRecentQuestion} />
        <div className="h-screen p-4 sm:ml-64 w-content">
          <div className="h-full p-4 border-2 border-gray-700 border-solid rounded-lg">
            {/* Chat conversation thread provider */}
            <ThreadsProvider>
              <ChatPage recentQuestion={recentQuestion} />
            </ThreadsProvider>
          </div>
        </div>
      </QuestionsProvider>
    </ErrorBoundary>
  );
}

export default App;
