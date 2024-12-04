import { Flame, Star, Tag } from "lucide-react";

export default function Sidebar() {
  const categories = ["CSE", "ECE", "MECH", "CIVIL", "CHEM"];

  return (
    <aside className="bg-white w-64 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Departments</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <a
              href="#"
              className="flex items-center text-gray-600 hover:text-red-600"
            >
              <Tag className="mr-2" />
              {category}
            </a>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800">Trending</h2>
      <ul className="space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-red-600"
          >
            <Flame className="mr-2" />
            Imp questions
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center text-gray-600 hover:text-red-600"
          >
            <Star className="mr-2" />
            Popular This Week
          </a>
        </li>
      </ul>
    </aside>
  );
}
