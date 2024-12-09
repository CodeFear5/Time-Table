import React from "react";

const Home = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to MyApp!
        </h1>
        <p className="text-lg text-white mt-4 drop-shadow-sm">
          Discover amazing features and tools.
        </p>
      </div>
    </div>
  );
};

export default Home;
