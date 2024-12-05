import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import FloatingTextArea from "./FAB";

interface Question {
  _id: string;
  question: string;
  name: string;
  time?: string;
}

interface QuestionFeedProps {
  onQuestionClick: (question: Question) => void;
}

const QuestionFeed = ({ onQuestionClick }: QuestionFeedProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Fetch initial questions
    const fetchQuestions = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:5000/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleNewQuestion = (newQuestion: {
    questionid: string;
    question: string;
    name: string;
    time: string;
  }) => {
    // Convert the received question format to match your Question interface
    const formattedQuestion: Question = {
      _id: newQuestion.questionid,
      question: newQuestion.question,
      name: newQuestion.name,
      time: newQuestion.time,
    };

    // Add the new question to the existing questions array
    setQuestions((prevQuestions) => [formattedQuestion, ...prevQuestions]);
  };

  return (
    <>
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
              <div className="flex flex-col text-sm">
                <span className="text-gray-600">Posted by {question.name}</span>
                {question.time && (
                  <span className="text-gray-500">
                    {new Date(question.time).toLocaleDateString()}
                  </span>
                )}
              </div>
              <button className="text-gray-500 hover:text-red-600">
                <Bookmark />
              </button>
            </div>
          </div>
        ))}
      </div>
      <FloatingTextArea onNewQuestion={handleNewQuestion} />
    </>
  );
};

export default QuestionFeed;
