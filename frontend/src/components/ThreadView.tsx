//import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import FloatingReplyArea from "./FAb2";

interface Reply {
  replyid: string;
  reply: string;
  name: string;
  time: string;
}

interface Question {
  questionid: string;
  question: string;
  name: string;
  time: string;
  branch: string;
}

interface ThreadViewProps {
  questionId: string;
}

export default function ThreadView({ questionId }: ThreadViewProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchThreadData = async () => {
      try {
        const [questionResponse, repliesResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:5000/loadReply`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`http://127.0.0.1:5000/replies`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setQuestion(questionResponse.data);
        setReplies(repliesResponse.data);
      } catch (err) {
        setError("Failed to load thread data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreadData();
  }, [questionId, token]);

  const handleNewReply = (newReply: Reply) => {
    setReplies((prevReplies) => [...prevReplies, newReply]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!question) return <div>Question not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Question Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-xl font-semibold">{question.question}</h1>
          <span className="text-sm text-gray-500">
            {new Date(question.time).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>Posted by {question.name}</span>
          <span className="mx-2">•</span>
          <span>{question.branch}</span>
        </div>
      </div>

      {/* Replies Section */}
      <div className="space-y-4">
        {replies.map((reply) => (
          <div
            key={reply.replyid}
            className="bg-white rounded-lg shadow p-4 ml-8 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">{reply.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(reply.time).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{reply.reply}</p>
          </div>
        ))}
      </div>

      {/* Reply Input */}
      <FloatingReplyArea questionId={questionId} onNewReply={handleNewReply} />
    </div>
  );
}
