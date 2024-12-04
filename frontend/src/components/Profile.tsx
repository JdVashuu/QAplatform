const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#2B3441] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src="/placeholder.svg?height=128&width=128"
            alt="Profile Picture"
            width={128}
            height={128}
            className="rounded-full border-4 border-[#A73121]"
          />
          <h1 className="mt-4 text-2xl font-bold text-[#2B3441]">John Doe</h1>
          <p className="mt-2 text-gray-600">USN: 1MS20CS001</p>
          <p className="text-gray-600">Course: B.E. Computer Science</p>
          <p className="text-gray-600">Semester: 6</p>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-2 bg-[#A73121] text-white rounded-full hover:bg-[#8a2819] transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
