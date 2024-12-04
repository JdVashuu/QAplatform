import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Reply {
  _id: string;
  reply: string;
  name: string;
}

interface Question {
  _id: string;
  question: string;
  name: string;
}

interface ThreadViewProps {
  question: Question;
  onClose: () => void;
}

export default function ThreadView({ question, onClose }: ThreadViewProps) {
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    axios
      .get(`/loadReply/${question._id}`)
      .then((response) => {
        setReplies(response.data);
      })
      .catch((error) => {
        console.log("Error fetching replies: ", error);
      });
  }, [question._id]);

  // const messages = [
  //   {
  //     _id: 1,
  //     text: "I recommend starting with the official React documentation.",
  //     author: "ReactPro",
  //   },
  //   {
  //     id: 2,
  //     text: "Codecademy has a great interactive course on React basics.",
  //     author: "CodeLearner",
  //   },
  //   {
  //     id: 3,
  //     text: "Building small projects is the best way to learn. Try creating a todo app!",
  //     author: "PracticalDev",
  //   },
  // ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        onClick={onClose}
        className="mb-4 flex items-center text-gray-600 hover:text-red-600"
      >
        <ArrowLeft className="mr-2" />
        Back to Feed
      </button>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {question.question}
      </h2>
      <p className="text-gray-600 mb-4">Posted by {question.name}</p>
      <div className="space-y-4">
        {replies.map((reply) => (
          <div key={reply._id} className="border-t pt-4">
            <p className="text-gray-800 mb-2">{reply.reply}</p>
            <p className="text-gray-600 text-sm">Reply by {reply.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
