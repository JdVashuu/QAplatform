"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import QuestionFeed from "./components/QuestionFeed";
import ThreadView from "./components/ThreadView";

export default function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          {selectedQuestion ? (
            <ThreadView
              question={selectedQuestion}
              onClose={() => setSelectedQuestion(null)}
            />
          ) : (
            <QuestionFeed onQuestionClick={setSelectedQuestion} />
          )}
        </main>
      </div>
    </div>
  );
}
