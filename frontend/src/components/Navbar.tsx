import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Q&A Platform
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          <Link
            to="/profile"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full"
          >
            <User className="inline-block mr-2" />
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}
