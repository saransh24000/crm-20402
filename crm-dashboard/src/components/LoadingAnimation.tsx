import React from "react";

const bars = [0, 1, 2, 3, 4, 5];

export default function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-[250px]">
      <div className="relative w-[220px] h-[220px]">
        {bars.map((_, i) => (
          <div
            key={i}
            className={`absolute w-[60px] h-[140px] bg-gradient-to-b from-[#dff1ff] to-[#4aa8ff] rounded-full shadow-md origin-bottom animate-pulse-bar`}
            style={{
              transform: `rotate(${i * 30 - 75}deg) translateY(-20px)`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}


