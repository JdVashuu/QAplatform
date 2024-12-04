import { Bookmark } from "lucide-react";

export default function QuestionFeed({ onQuestionClick }) {
  const questions = [
    {
      id: 1,
      text: "What's the best way to learn React?",
      author: "ReactNewbie",
    },
    { id: 2, text: "How does quantum computing work?", author: "ScienceGeek" },
    {
      id: 3,
      text: "What are the implications of AI in healthcare?",
      author: "FutureMD",
    },
  ];

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="bg-white rounded-lg shadow-md p-4">
          <h3
            className="text-xl font-semibold mb-2 text-gray-800 cursor-pointer hover:text-red-600"
            onClick={() => onQuestionClick(question)}
          >
            {question.text}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Posted by {question.author}</span>
            <button className="text-gray-500 hover:text-red-600">
              <Bookmark />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
