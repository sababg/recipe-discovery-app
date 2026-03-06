import * as React from "react";

const sizeClasses: Record<number, string> = {
  4: "w-4 h-4",
  6: "w-6 h-6",
  8: "w-8 h-8",
  10: "w-10 h-10",
  12: "w-12 h-12",
};

const Loading: React.FC<{ size?: 4 | 6 | 8 | 10 | 12 }> = ({ size = 10 }) => {
  return (
    <div
      className={`${sizeClasses[size]} border-4 border-t-blue-500 border-b-gray-200 rounded-full animate-spin`}
    ></div>
  );
};

export default Loading;
