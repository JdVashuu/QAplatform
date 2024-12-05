import React, { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import axios from "axios";
import { useCookies } from "react-cookie";

interface FABProps {
  onNewQuestion: (newQuestion: {
    questionid: string;
    question: string;
    name: string;
    time: string;
  }) => void;
}

export default function FloatingTextArea({ onNewQuestion }: FABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("CSE");

  const token = sessionStorage.getItem("token");
  console.log("Retrieved token from sessionStorage:", token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted!");
    if (!content.trim()) return;

    if (!token) {
      console.error("No token found in sessionStorage.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/questions",
        {
          question: content,
          branch: selectedBranch,
          time: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token, // Send token in Authorization header
          },
          withCredentials: true, // Required to send cookies (optional)
        },
      );
      console.log("Response received from backend:", response.data);

      onNewQuestion(response.data);
      setContent("");
      setSelectedBranch("main");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end">
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 w-[500px] bg-white rounded-lg shadow-lg p-4"
        >
          <textarea
            className="w-full h-64 resize-none border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask a question..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cse">CSE</option>
              <option value="eee">EEE</option>
              <option value="mec">MECH</option>
              <option value="civ">CIV</option>
              <option value="chem">CHEM</option>
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => {
                  setIsOpen(false);
                  setContent("");
                  setSelectedBranch("main");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!content.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}

      <button
        className="w-14 h-14 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close form" : "Open form"}
      >
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <PlusIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
