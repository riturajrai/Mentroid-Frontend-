"use client";
import { useState } from "react";

export default function FlashcardItem({ front, back, color }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-56 cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] 
        ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl shadow-xl text-white font-semibold p-4 
          [backface-visibility:hidden] ${color}`}
        >
          <h3 className="text-lg sm:text-xl text-center break-words">{front}</h3>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl shadow-xl bg-white text-gray-800 p-4 
          [transform:rotateY(180deg)] [backface-visibility:hidden]"
        >
          <p className="text-base text-center break-words">{back}</p>
        </div>
      </div>
    </div>
  );
}
