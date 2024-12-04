"use client";

import { useState } from "react";
import QuestionFeed from "./components/QuestionFeed";
import ThreadView from "./components/ThreadView";

interface Question {
  _id: string;
  question: string;
  name: string;
}

export default function Home() {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null,
  );

  return (
    <>
      {selectedQuestion ? (
        <ThreadView
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      ) : (
        <QuestionFeed onQuestionClick={setSelectedQuestion} />
      )}
    </>
  );

  /* return (
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
  ); */
}
