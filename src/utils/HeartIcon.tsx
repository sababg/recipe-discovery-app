import React from "react";

type HeartIconProps = {
  isFilled?: boolean;
  size?: number;
  className?: string;
};

export const HeartIcon: React.FC<HeartIconProps> = ({
  isFilled = false,
  size = 20,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`transition-all duration-200 ${className}`}
      fill={isFilled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61c-1.54-1.43-4.04-1.43-5.58 0L12 7.87l-3.26-3.26c-1.54-1.43-4.04-1.43-5.58 0-1.64 1.53-1.64 4.01 0 5.54L12 21l8.84-10.85c1.64-1.53 1.64-4.01 0-5.54z"
      />
    </svg>
  );
};
