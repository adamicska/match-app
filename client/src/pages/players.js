const players = [
  {
    id: 1,
    name: "@sarasa",
    age: "25",
    level: "4.5",
  },
  {
    id: 2,
    name: "@romina",
    age: "28",
    level: "4",
  },
];

export default function Players() {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {players.map((player) => (
            <div key={player.id} className="group relative">
              <div className="w-full flex justify-center items-center">
                <div className="container mx-auto max-w-xs rounded-lg overflow-hidden shadow-lg my-2 bg-white">
                  <div className="relative mb-2">
                    <img
                      className="w-full"
                      src="https://source.unsplash.com/6D2Lmtv_X8A"
                      alt="Profile"
                    />
                    <div className="text-center absolute w-full">
                      <div className="my-5">
                        <p className="text-yellow-400 text-sm">{player.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-10 px-6 text-center tracking-wide grid grid-cols-3 gap-6">
                    <div className="posts">
                      <p className="text-lg">Age</p>
                      <p className="text-gray-400 text-sm">{player.age}</p>
                    </div>
                    <div className="followers">
                      <p className="text-lg">Level</p>
                      <p className="text-gray-400 text-sm">{player.level}</p>
                    </div>
                    {/* <div className="following">
                      <p className="text-lg">8-20hrs</p>
                      <p className="text-gray-400 text-sm">Available</p>
                    </div> */}
                  </div>
                  <button
                    href="#"
                    className="mx-auto mb-2 flex items-center justify-center px-6 py-1 border border-transparent text-base font-small rounded-md text-white bg-yellow-600 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10"
                  >
                    Add Friend
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
