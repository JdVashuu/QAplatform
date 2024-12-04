import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export default function FloatingTextArea() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { questionId } = useParams(); // For thread view

  const handleSubmit = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      if (location.pathname === "/questions") {
        // Create a new question
        await axios.post("/api/questions", {
          content: content,
        });
      } else if (questionId) {
        // Create a reply to the question
        await axios.post(`/api/questions/${questionId}/replies`, {
          content: content,
        });
      }

      setContent("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[300px] bg-white rounded-lg shadow-lg p-4">
          <textarea
            className="w-full h-32 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={
              questionId ? "Write your reply..." : "Ask a question..."
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                setContent("");
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading || !content.trim()}
            >
              {isLoading ? "Submitting..." : questionId ? "Reply" : "Ask"}
            </button>
          </div>
        </div>
      )}

      <button
        className="w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600
                   transition-colors duration-200 flex items-center justify-center text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          )}
        </svg>
      </button>
    </div>
  );
}
