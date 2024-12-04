import { ArrowLeft } from "lucide-react";

export default function ThreadView({ question, onClose }) {
  const messages = [
    {
      id: 1,
      text: "I recommend starting with the official React documentation.",
      author: "ReactPro",
    },
    {
      id: 2,
      text: "Codecademy has a great interactive course on React basics.",
      author: "CodeLearner",
    },
    {
      id: 3,
      text: "Building small projects is the best way to learn. Try creating a todo app!",
      author: "PracticalDev",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        onClick={onClose}
        className="mb-4 flex items-center text-gray-600 hover:text-red-600"
      >
        <ArrowLeft className="mr-2" />
        Back to Feed
      </button>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{question.text}</h2>
      <p className="text-gray-600 mb-4">Posted by {question.author}</p>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border-t pt-4">
            <p className="text-gray-800 mb-2">{message.text}</p>
            <p className="text-gray-600 text-sm">Reply by {message.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
