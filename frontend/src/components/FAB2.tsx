import React, { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import axios from "axios";

interface ReplyFABProps {
  questionId: string;
  onNewReply: (newReply: {
    replyid: string;
    reply: string;
    name: string;
    time: string;
  }) => void;
}

export default function FloatingReplyArea({
  questionId,
  onNewReply,
}: ReplyFABProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const token = sessionStorage.getItem("token");
  console.log("Retrieved token from sessionStorage:", token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reply Form Submitted!");
    if (!content.trim()) return;

    if (!token) {
      console.error("No token found in sessionStorage.");
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/questions/${questionId}/replies`,
        {
          reply: content,
          time: new Date().toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        },
      );
      console.log("Response received from backend:", response.data);

      onNewReply(response.data);
      setContent("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting reply:", error);
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
            className="w-full h-32 resize-none border rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your reply..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => {
                setIsOpen(false);
                setContent("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!content.trim()}
            >
              Reply
            </button>
          </div>
        </form>
      )}

      <button
        className="w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close reply form" : "Open reply form"}
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
