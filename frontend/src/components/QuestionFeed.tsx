import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  _id: string;
  question: string;
  name: string;
}

interface QuestionFeedProps {
  onQuestionClick: (question: Question) => void;
}

// Mock data for development
const mockQuestions: Question[] = [
  {
    _id: "1",
    question: "What are the best resources to learn React?",
    name: "John Doe",
  },
  {
    _id: "2",
    question: "How do I implement authentication in Node.js?",
    name: "Jane Smith",
  },
  {
    _id: "3",
    question: "What's the difference between SQL and NoSQL databases?",
    name: "Bob Johnson",
  },
];

const QuestionFeed = ({ onQuestionClick }: QuestionFeedProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // axios
    //   .get("/loadQuestion")
    //   .then((response) => {
    //     setQuestions(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching questions:", error);
    //   });

    setQuestions(mockQuestions);
  }, []);

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question._id} className="bg-white rounded-lg shadow-md p-4">
          <h3
            className="text-xl font-semibold mb-2 text-gray-800 cursor-pointer hover:text-red-600"
            onClick={() => onQuestionClick(question)}
          >
            {question.question}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Posted by {question.name}</span>
            <button className="text-gray-500 hover:text-red-600">
              <Bookmark />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionFeed;
